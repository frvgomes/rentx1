import { getRepository, Repository } from "typeorm";

import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Cars";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    id,
    name,
    descri,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarsDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      descri,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });
    await this.repository.save(car);
    return car;
  }

  async findByPlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }

  async listAll(): Promise<Car[]> {
    const cars = await this.repository.find();
    return cars;
  }

  async findAvailable(brand?: string, category_id?: string): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("c.available =:available", { available: true });
    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }
    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }
    const cars = await carsQuery.getMany();
    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);
    return car;
  }
}

export { CarsRepository };
