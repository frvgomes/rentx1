import { ICreateCarsDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Cars";

interface ICarsRepository {
  create(data: ICreateCarsDTO): Promise<Car>;
  findByPlate(license_plate: string): Promise<Car>;
  listAll(): Promise<Car[]>;
  findAvailable(brand?: string, category_id?: string): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}

export { ICarsRepository };
