import jwt from "jsonwebtoken";

// `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
function Authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      ok: false,
      error_msg: "Usuario no está autorizado",
    });
  }

  jwt.verify(token, process.env.SECRETO, (err, payload) => {
    if (!err) req.payload = payload;
    next();
  });
}

export { Authenticate };
