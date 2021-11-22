import { getRepository, Repository } from "typeorm";

import {
  ICategoriesRepository,
  ICreateCategoriesDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

import { Category } from "../entities/Categories";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ nome, descri }: ICreateCategoriesDTO): Promise<void> {
    const category = this.repository.create({
      nome,
      descri,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(nome: string): Promise<Category> {
    const category = await this.repository.findOne({ nome });
    return category;
  }
}

export { CategoriesRepository };
