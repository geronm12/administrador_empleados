import mongoose from "mongoose";

mongoose.set("strictQuery");
//connection string -> cadena de conexión
function connect() {
  mongoose
    .connect(process.env.DB_CONNECTION)
    .then((res) => console.log("Conectado correctamente a la bd."))
    .catch((err) => console.log(err));
}

export default connect;
