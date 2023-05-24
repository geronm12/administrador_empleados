import mongoose, { Schema } from "mongoose";

const mailSchema = new Schema({
  asunto: "String",
  cuerpo: "String",
  usuarioFrom: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  usuarioTo: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "Usuario",
  },
});

const MailDb = mongoose.model("Mail", mailSchema);

export default MailDb;
