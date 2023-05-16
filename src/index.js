import express from "express";
import cors from "cors";
import connect from "./database/db";
import EmpleadoSchema from "./models/empleado";

//babel -> Funciona para javascript moderno
//API -> Aplication Programming Interface
//Endpoint o Url
//GET, POST, PUT, DELETE -> Configuración para la comunicación
//

const app = express();

app.use(express.json());
app.use(cors());
//url base localhost:puerto/

app.get("/empleados", (req, res) => {
  EmpleadoSchema.find()
    .exec()
    .then((results) => {
      res.json({
        ok: true,
        data: results,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        ok: false,
        err,
      });
    });
});

app.get("/empleados/:id", (req, res) => {
  const { id } = req.params;

  EmpleadoSchema.findById(id)
    .exec()
    .then((result) => {
      res.json({
        ok: true,
        data: result,
      });
    });
});

app.post("/empleados", (req, res) => {
  const { nombre, apellido, dni } = req.body;
  EmpleadoSchema.create({
    nombre,
    apellido,
    dni,
  })
    .then((response) => {
      res.json({
        ok: true,
        data: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        ok: false,
        error: err,
      });
    });
});

// app.put("/empleados/:id", (req, res) => {
//   const { id } = req.params;
//   const { nombre, apellido, dni } = req.body;

//   const arrayNuevo = arrayEmpleados.filter((empleado) => empleado.id !== +id);
//   const [filter] = arrayEmpleados.filter((empleado) => empleado.id === +id);
//   filter.nombre = nombre;
//   filter.apellido = apellido;
//   filter.dni = dni;

//   arrayNuevo.push(filter);

//   arrayEmpleados = arrayNuevo;

//   res.json({
//     ok: true,
//   });
// });

// app.delete("/empleados/:id", (req, res) => {
//   const { id } = req.params;
//   const arraySinElemento = arrayEmpleados.filter(
//     (empleado) => empleado.id !== +id
//   );
//   arrayEmpleados = arraySinElemento;
//   res.json({
//     ok: true,
//   });
// });

connect();

app.listen(3000, () => {
  console.log("Escuchando puerto 3000");
});

//CRUD en Node Js terminado
