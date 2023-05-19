import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./database/db";
import empleadoRoute from "./routes/empleado.routes";
//babel -> Funciona para javascript moderno
//API -> Aplication Programming Interface
//Endpoint o Url
//GET, POST, PUT, DELETE -> Configuración para la comunicación
//

dotenv.config();

const app = express();
const prefix = "/api";

app.use(express.json());
app.use(cors());

app.use(prefix, empleadoRoute);

connect();

app.listen(3000, () => {
  console.log("Escuchando puerto 3000");
});

//CRUD en Node Js terminado
