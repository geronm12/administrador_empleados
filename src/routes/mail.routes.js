import express from "express";
import { ReadMail, SendMail } from "../controllers/mail.controller";
import { Authenticate } from "../helpers/token.helper";

const router = express.Router();

router.post("/mail/send", [Authenticate], SendMail);
router.get("/mail/read", [Authenticate], ReadMail);
//Liquidar sueldo

export default router;
