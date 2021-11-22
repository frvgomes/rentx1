import { Specification } from "@modules/cars/infra/typeorm/entities/Specifications";

interface ICreateSpecificationDTO {
  nome: string;
  descri: string;
}

interface ISpecificationsRepository {
  create({ nome, descri }: ICreateSpecificationDTO): Promise<Specification>;
  list(): Promise<Specification[]>;
  findByName(nome: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
