import { Router } from "express";
export const router = Router();
import { UserCt } from "./usersCt.js";

//Privado para un admin
router.get("/", UserCt.getAll); 
router.post("/register", UserCt.register);
router.post("/login", UserCt.login);