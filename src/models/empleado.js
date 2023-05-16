import mongoose, { Schema } from "mongoose";

const empleadoSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  apellido: {
    type: String,
    require: true,
  },
  dni: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Empleado", empleadoSchema);
