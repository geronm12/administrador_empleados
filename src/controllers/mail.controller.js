import MailDb from "../models/mails";
import UserDb from "../models/usuario";

async function SendMail(req, res) {
  try {
    const { payload } = req;
    const { _id } = payload;
    const { asunto, cuerpo, usuarioTo } = req.body;

    const user = await UserDb.findOne({ email: usuarioTo });

    if (user) {
      const nuevoMail = await MailDb.create({
        asunto,
        cuerpo,
        usuarioFrom: _id,
        usuarioTo: user._id,
      });

      res.json({
        ok: true,
        data: nuevoMail,
      });
    }

    res.json({
      ok: false,
      error_msg: "El usuario no existe",
    });
  } catch (error) {
    console.log(error);
  }
}

async function ReadMail(req, res) {
  const { payload } = req;
  const { _id } = payload;

  const mail = await MailDb.find({ usuarioTo: _id })
    .populate("usuarioFrom")
    .populate("usuarioTo");

  return res.json({
    ok: true,
    data: mail,
  });
}

export { SendMail, ReadMail };
