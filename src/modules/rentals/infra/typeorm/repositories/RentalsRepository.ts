import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rentals";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    id,
    car_id,
    user_id,
    start_date,
    end_date,
    expected_return_date,
    updated_at,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      car_id,
      user_id,
      start_date,
      end_date,
      expected_return_date,
      updated_at,
    });
    await this.repository.save(rental);
    return rental;
  }

  async carDisponivel(car_id: string): Promise<Rental> {
    const queryrental = await this.repository
      .createQueryBuilder("query")
      .where("query.car_id = :car_id", { car_id })
      .andWhere("query.end_date isnull");

    const rental = await queryrental.getOne();
    return rental;
    // Todo método poderia ser substituido por
    // return this.repository.find(
    //      (rental) => rental.car_id === car_id $$ !rental.end_date)
  }

  async userApto(user_id: string): Promise<Rental> {
    const queryrental = await this.repository
      .createQueryBuilder("query")
      .where("query.user_id = :user_id", { user_id })
      .andWhere("query.end_date isnull");

    const rental = await queryrental.getOne();
    return rental;
  }
}

export { RentalsRepository };
