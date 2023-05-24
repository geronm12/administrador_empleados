import express from "express";
import {
  GetEmployeeById,
  GetEmployees,
  AddEmployee,
  UpdateEmployee,
  DeleteEmployee,
  LogicalDeleteEmployee,
  ActivateEmployee,
} from "../controllers/empleado.controller";

const router = express.Router();

//Debería tener un usuario tipo administrador
router.get("/empleados", GetEmployees);
router.get("/empleados/:id", GetEmployeeById);
router.post("/empleados", AddEmployee);
router.put("/empleados/:id", UpdateEmployee);
router.delete("/empleados/:id", LogicalDeleteEmployee);
router.put("/empleados/activate/:id", ActivateEmployee);
//Liquidar sueldo

export default router;
