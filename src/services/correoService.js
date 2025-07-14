const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('Credenciales:', process.env.GMAIL_USER, process.env.GMAIL_PASS);


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "nustakawsay@gmail.com",
    pass: "vppjlotbozejtjul",
  },
});

async function enviarCodigoVerificacion(destinatario, codigo) {
  const mailOptions = {
    from: 'nustakawsay@gmail.com',
    to: destinatario,
    subject: 'Código de verificación - Ñusta Kawsay',
    html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f9f7fc;
      padding: 20px;
      color: #333;
    }
    .container {
      background-color: #fff;
      border: 2px solid #d9b8ff;
      border-radius: 10px;
      padding: 30px;
      max-width: 600px;
      margin: auto;
      text-align: center;
    }
    h1 {
      color: #7c3aed;
      margin-bottom: 10px;
    }
    .code {
      font-size: 32px;
      font-weight: bold;
      color: #6b21a8;
      background-color: #f3e8ff;
      padding: 15px 30px;
      border-radius: 10px;
      display: inline-block;
      margin: 20px 0;
    }
    .alert {
      background-color: #a78bfa;
      color: white;
      font-weight: bold;
      padding: 12px;
      border-radius: 8px;
      display: inline-block;
      margin: 20px 0;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #666;
    }
    .footer strong {
      color: #333;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Verificación de correo</h1>
    <p>Gracias por registrarte en <strong>Ñusta Kawsay</strong>.</p>
    <p>Tu código de verificación es:</p>
    <div class="code">${codigo}</div>
    <p>Este código es válido solo por unos minutos.</p>
    <div class="alert">Ingresar código en la app</div>
    <div class="footer">
      <p><strong>¿No solicitaste este código?</strong> Puedes ignorar este mensaje de forma segura.</p>
    </div>
  </div>
</body>
</html>
`

  };

  return transporter.sendMail(mailOptions);
}


module.exports = {
  enviarCodigoVerificacion,
};
