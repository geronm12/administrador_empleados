import express from "express";
import multer from "multer";
import {
  GetEmployeeById,
  GetEmployees,
  AddEmployee,
  UpdateEmployee,
  DeleteEmployee,
  LogicalDeleteEmployee,
  ActivateEmployee,
  UploadProfilePicture,
} from "../controllers/empleado.controller";
import { Authenticate } from "../helpers/token.helper";

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({}),
}).fields([{ name: "file", maxCount: 1 }]);

//Debería tener un usuario tipo administrador
router.get("/empleados", GetEmployees);
router.get("/empleados/:id", GetEmployeeById);
router.post("/empleados", AddEmployee);
router.put("/empleados/:id", UpdateEmployee);
router.delete("/empleados/:id", LogicalDeleteEmployee);
router.put("/empleados/activate/:id", ActivateEmployee);
router.put(
  "/empleados/profilepicture/:id",
  [Authenticate, upload],
  UploadProfilePicture
);
//Liquidar sueldo

export default router;
