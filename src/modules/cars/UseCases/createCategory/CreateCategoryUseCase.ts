import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  nome: string;
  descri: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepositories: ICategoriesRepository
  ) {}

  async execute({ nome, descri }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepositories.findByName(
      nome
    );

    if (categoryAlreadyExists) {
      throw new AppError("Categoria já existe.");
    }

    await this.categoriesRepositories.create({ nome, descri });
  }
}

export { CreateCategoryUseCase };
