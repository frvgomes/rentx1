import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCarsUseCase } from "./ListCarUseCase";

class ListCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCarsUseCase = container.resolve(ListCarsUseCase);
    const all = await listCarsUseCase.execute();

    return response.json(all);
  }
}
export { ListCarsController };
