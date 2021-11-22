import { injectable, inject } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../../infra/typeorm/entities/Cars";

interface IRequest {
  category_id?: string;
  brand?: string;
}
@injectable()
class ListCarAvailableUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ category_id, brand }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(brand, category_id);
    return cars;
  }
}
export { ListCarAvailableUseCase };
