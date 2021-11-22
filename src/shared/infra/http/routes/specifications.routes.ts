import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/UseCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/UseCases/listSpecifications/ListSpecificationsController";

import { ensureAuth } from "../middlewares/ensureAuth";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post(
  "/",
  ensureAuth,
  createSpecificationController.handle
);
specificationsRoutes.get("/", ensureAuth, listSpecificationsController.handle);

export { specificationsRoutes };
