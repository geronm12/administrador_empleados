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
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const EmpleadoDb = mongoose.model("Empleado", empleadoSchema);

export default EmpleadoDb;
