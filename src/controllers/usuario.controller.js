import { Compare, Encrypt } from "../helpers/password.helper";
import UsuarioDb from "../models/usuario";

const defaultPw = "123456";

async function CreateUser({ empleadoNombre, empleadoApellido }) {
  try {
    const pw = await Encrypt(defaultPw);
    //Hacer substring de las letras e ir verificando
    //si el mail existe
    //si el mail existe, agregar una letra al nombre
    //bucles (for, foreach)
    const mail = UsuarioDb.generateCorpMail(empleadoNombre, empleadoApellido);
    const usuarioCreado = await UsuarioDb.create({
      email: mail,
      password: pw,
    });

    return usuarioCreado;
  } catch (err) {
    console.log(err);
  }
}

async function UpdateUser(req, res) {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    const pw = await Encrypt(newPassword);

    const updatedUser = await UsuarioDb.findByIdAndUpdate(id, {
      password: newPassword,
      debeActualizarpw: false,
    });

    return res.status(201).json({
      ok: true,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error_msg: error,
    });
  }
}

async function Login(req, res) {
  const { email, password } = req.body;

  const userLogged = await UsuarioDb.findOne({ email });

  const passwordCheck = await Compare(password, userLogged.password);

  if (!passwordCheck)
    return res
      .status(400)
      .json({ ok: false, error: "Usuario o Contraseña incorrectos" });

  const token = userLogged.generateAccesToken();

  return res.json({
    ok: true,
    data: token,
  });
}

export { CreateUser, Login, UpdateUser };
