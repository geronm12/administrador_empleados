import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const terminacionEmpresa = "@empresa.com";

const usuarioSchema = new Schema({
  email: String,
  password: String,
  debeActualizarpw: {
    type: Boolean,
    default: true,
  },
});

usuarioSchema.methods.generateAccesToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRETO);
  return token;
};

usuarioSchema.methods.generateCorpMail = function (
  nombreEmpleado,
  apellidoEmpleado
) {
  return nombreEmpleado[0] + apellidoEmpleado + terminacionEmpresa;
};

const UsuarioDb = mongoose.model("Usuario", usuarioSchema);

export default UsuarioDb;
