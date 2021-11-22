import { Category } from "../entities/Categories";

interface ICreateCategoriesDTO {
  nome: string;
  descri: string;
}

interface ICategoriesRepository {
  findByName(nome: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ nome, descri }: ICreateCategoriesDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoriesDTO };
