import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    nome: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Usuário ou Senha inválidos.");
    }

    const pwdMatch = await compare(password, user.password);
    if (!pwdMatch) {
      throw new AppError("Usuário ou Senha inválidos.");
    }

    const token = sign({}, "123456789", {
      subject: user.id,
      expiresIn: "1d",
    });

    const LoginReturn: IResponse = {
      user: {
        nome: user.nome,
        email: user.email,
      },
      token,
    };

    return LoginReturn;
  }
}

export { AuthUserUseCase };
