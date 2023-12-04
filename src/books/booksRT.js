import { Router } from "express";
import { BookCt } from "./booksCt.js";
import { uploadFile } from "../utils/handleStorage.js";
import { isAuth } from "../../middlewares/auth.js";

export const router = Router();

router.get("/", BookCt.getAll);

router.get("/:id", BookCt.getById);

router.get("/:author", BookCt.getByQuery);

//Controlador de autentificación para quienes tengan usuario

router.delete("/:id", isAuth, BookCt.deleteOne);

router.post("/", uploadFile.single("posterName"), BookCt.addOne);

router.patch("/:id", BookCt.updateOne);

