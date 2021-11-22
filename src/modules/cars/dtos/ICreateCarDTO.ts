import { Specification } from "../infra/typeorm/entities/Specifications";

interface ICreateCarsDTO {
  id?: string;
  name: string;
  descri: string;
  daily_rate: number;
  available: boolean;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id?: string;
  specifications?: Specification[];
}

export { ICreateCarsDTO };
