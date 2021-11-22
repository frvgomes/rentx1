import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  nome: string;
  descri: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ nome, descri }: IRequest): Promise<void> {
    const specificationAlreadyExistis =
      await this.specificationsRepository.findByName(nome);

    if (specificationAlreadyExistis) {
      throw new AppError("Especificação já existe.");
    }

    await this.specificationsRepository.create({
      nome,
      descri,
    });
  }
}

export { CreateSpecificationUseCase };
