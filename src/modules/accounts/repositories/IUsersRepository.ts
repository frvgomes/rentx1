import { ICreateUsersDTO } from "../dtos/ICreateUSerDTO";
import { User } from "../entities/Users";

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
