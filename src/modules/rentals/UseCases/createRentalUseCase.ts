import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Rental } from "../infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "../repositories/IRentalsRepository";

interface IRequest {
  car_id: string;
  user_id: string;
  end_date: Date;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepositories: IRentalsRepository
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carro_ok = await this.rentalsRepositories.carDisponivel(car_id);

    if (carro_ok) {
      throw new AppError("Veículo não está disponível.");
    }
    const usuario_ok = await this.rentalsRepositories.userApto(user_id);

    if (usuario_ok) {
      throw new AppError("Usuário possui locação em aberto.");
    }

    const rental = await this.rentalsRepositories.create({
      car_id,
      user_id,
      expected_return_date,
    });
    return rental;
  }
}

export { CreateRentalUseCase };
