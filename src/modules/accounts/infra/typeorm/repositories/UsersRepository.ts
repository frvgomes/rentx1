import { getRepository, Repository } from "typeorm";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUSerDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { User } from "../entities/Users";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async create({
    id,
    nome,
    email,
    password,
    avatar,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      id,
      nome,
      email,
      password,
      avatar,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
