import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarAvailableUseCase } from "./ListCarAvailableUseCase";

class ListCarAvailableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id, brand } = request.query;

    const listCarAvailableUseCase = container.resolve(ListCarAvailableUseCase);

    const cars = await listCarAvailableUseCase.execute({
      brand: brand as string,
      category_id: category_id as string,
    });
    return response.json(cars);
  }
}
export { ListCarAvailableController };
