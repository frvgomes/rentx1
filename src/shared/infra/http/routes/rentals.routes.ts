import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/UseCases/createRentalController";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post("/", createRentalController.handle);

export { rentalsRoutes };
