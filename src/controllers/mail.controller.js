import MailDb from "../models/mails";

async function SendMail(req, res) {
  try {
    const { payload } = req;
    const { _id } = payload;
    const { asunto, cuerpo, usuarioTo } = req.body;

    const nuevoMail = await MailDb.create({
      asunto,
      cuerpo,
      usuarioFrom: _id,
      usuarioTo,
    });

    res.json({
      ok: true,
      data: nuevoMail,
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
