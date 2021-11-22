interface ICreateRentalDTO {
  id?: string;
  car_id: string;
  user_id: string;
  start_date?: string;
  end_date?: Date;
  expected_return_date?: Date;
  total?: number;
  updated_at?: Date;
}
export { ICreateRentalDTO };
