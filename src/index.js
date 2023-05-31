import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./database/db";
import empleadoRoute from "./routes/empleado.routes";
import userRoute from "./routes/usuario.routes";
import mailRoute from "./routes/mail.routes";

dotenv.config();

const app = express();
const prefix = "/api";

app.use(express.json());
app.use(cors());

app.use(prefix, empleadoRoute);
app.use(prefix, userRoute);
app.use(prefix, mailRoute);

connect();

app.listen(3000, () => {
  console.log("Escuchando puerto 3000");
});

//CRUD en Node Js terminado
