import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, descri } = request.body;

    const createSpecificationUSeCase = container.resolve(
      CreateSpecificationUseCase
    );
    await createSpecificationUSeCase.execute({ nome, descri });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
