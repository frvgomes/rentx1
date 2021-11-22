import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rentals";

interface IRentalsRepository {
  create(date: ICreateRentalDTO): Promise<Rental>;
  carDisponivel(car_id: string): Promise<Rental>;
  userApto(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
