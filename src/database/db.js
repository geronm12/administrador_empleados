import mongoose from "mongoose";

mongoose.set("strictQuery");

function connect() {
  mongoose
    .connect(
      "mongodb+srv://gerolpz01:5RMzWS0hWR2DsAiw@cluster0.8ycb5f6.mongodb.net/ProyectoA"
    )
    .then((res) => console.log("Conectado correctamente a la bd."))
    .catch((err) => console.log(err));
}

export default connect;
