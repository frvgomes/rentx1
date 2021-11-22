import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUSerDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepositories: IUsersRepository
  ) {}

  async execute({ nome, email, password }: ICreateUsersDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepositories.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("E-mail já está em uso por outro usuário.");
    }

    const pwd = await hash(password, 8);

    await this.usersRepositories.create({ nome, email, password: pwd });
  }
}

export { CreateUserUseCase };
