import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  descri: string;
  daily_rate: number;
  available: boolean;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id?: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepositories: ICarsRepository
  ) {}

  async execute({
    name,
    descri,
    daily_rate,
    available,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<Car> {
    const carExiste = await this.carsRepositories.findByPlate(license_plate);

    if (carExiste) {
      throw new AppError("Placa já existe");
    }
    const car = await this.carsRepositories.create({
      name,
      descri,
      daily_rate,
      available,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
    return car;
  }
}

export { CreateCarUseCase };
