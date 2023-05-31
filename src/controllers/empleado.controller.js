import EmpleadoDb from "../models/empleado";
import { UploadPicture } from "./clodinary.controller";
import { CreateUser } from "./usuario.controller";

async function GetEmployees(req, res) {
  try {
    const results = await EmpleadoDb.find({
      active: true,
    });
    return res.json({
      ok: true,
      data: results,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error_msg: error,
    });
  }
}

async function GetEmployeeById(req, res) {
  try {
    const { id } = req.params;

    const result = await EmpleadoDb.findById(id).populate("usuario_id");

    return res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error_msg: error,
    });
  }
}

async function AddEmployee(req, res) {
  try {
    const { nombre, apellido, dni, fotoUrl } = req.body;
    const user = await CreateUser({
      empleadoNombre: nombre,
      empleadoApellido: apellido,
    });

    const employee = await EmpleadoDb.create({
      nombre,
      apellido,
      dni,
      fotoUrl,
      usuario_id: user._id,
    });

    return res.status(200).json({
      ok: true,
      data: employee,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error_msg: error,
    });
  }
}

async function UpdateEmployee(req, res) {
  try {
    const { id } = req.params;
    const { nombre, apellido, dni } = req.body;
    const updatedEmployee = await EmpleadoDb.findByIdAndUpdate(id, {
      nombre,
      apellido,
      dni,
    });

    return res.status(201).json({
      ok: true,
      data: {
        previous: updatedEmployee,
        newOnes: { nombre, apellido, dni },
      },
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error_msg: error,
    });
  }
}

async function DeleteEmployee(req, res) {
  const { id } = req.params;
  const deletedEmployee = await EmpleadoDb.findByIdAndDelete(id);
  res.json({
    ok: true,
    data: deletedEmployee,
  });
}

async function LogicalDeleteEmployee(req, res) {
  const { id } = req.params;
  const deletedEmployee = await EmpleadoDb.findByIdAndUpdate(id, {
    active: false,
  });
  res.json({
    ok: true,
    data: deletedEmployee,
  });
}

async function ActivateEmployee(req, res) {
  const { id } = req.params;
  const activatedEmployee = await EmpleadoDb.findByIdAndUpdate(id, {
    active: true,
  });
  res.json({
    ok: true,
    data: activatedEmployee,
  });
}

async function UploadProfilePicture(req, res) {
  try {
    const { id } = req.params;
    const photo = req.files["file"][0];
    const { secure_url } = await UploadPicture(photo);
    const response = await EmpleadoDb.findByIdAndUpdate(id, {
      $set: {
        fotoUrl: secure_url,
      },
    });

    response.fotoUrl = secure_url;

    if (response) {
      return res.status(200).json({
        ok: true,
        employee: response,
      });
    }

    return res.status(400).json({
      ok: false,
      error_msg: "Ocurrió un error al subir la foto",
    });
  } catch (err) {
    console.log(err);
  }
}

export {
  GetEmployees,
  GetEmployeeById,
  AddEmployee,
  UpdateEmployee,
  DeleteEmployee,
  LogicalDeleteEmployee,
  ActivateEmployee,
  UploadPicture,
  UploadProfilePicture,
};
