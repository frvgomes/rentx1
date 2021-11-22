import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/UseCases/createCar/createCarController";
import { CreateCarSpecificationController } from "@modules/cars/UseCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "@modules/cars/UseCases/listCar/ListCarController";
import { ListCarAvailableController } from "@modules/cars/UseCases/listCarAvailable/ListCarAvailableController";
import { UploadCarImageController } from "@modules/cars/UseCases/uploadCarImage/UploadCarImageController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuth } from "../middlewares/ensureAuth";

const carsRoutes = Router();

const uploadImage = multer(uploadConfig.upload("./tmp/carImages"));

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listCarController = new ListCarsController();
const listCarAvailableController = new ListCarAvailableController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.post("/", ensureAuth, ensureAdmin, createCarController.handle);
carsRoutes.post("/specifications/:id", createCarSpecificationController.handle);
carsRoutes.post(
  "/images/:id",
  uploadImage.array("images"),
  uploadCarImageController.handle
);

carsRoutes.get("/", ensureAuth, listCarController.handle);
carsRoutes.get("/available", ensureAuth, listCarAvailableController.handle);

export { carsRoutes };
