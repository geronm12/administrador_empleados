//Loginimport express from "express";
import express from "express";
import { Login, UpdateUser } from "../controllers/usuario.controller";
import { Authenticate } from "../helpers/token.helper";

const router = express.Router();

router.post("/user/login", Login);
router.put("/user/resetpw/:id", [Authenticate], UpdateUser);

//Liquidar sueldo

export default router;
