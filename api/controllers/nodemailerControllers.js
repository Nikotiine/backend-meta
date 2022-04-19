require("dotenv").config();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_TEST_ADRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
});
async function sendContactForm(formulaire) {
  console.log(formulaire.email);
  const mailOptions = {
    from: formulaire.email,
    to: process.env.GMAIL_TEST_ADRESS,
    subject: `Demande de contact pour ${formulaire.sujet} de ${formulaire.lastName} ${formulaire.firstName}`,
    text: `Email de réponse : ${formulaire.email} </br> Contenu du message : ${formulaire.message}`,
  };

  return await transporter.sendMail(mailOptions);
}

module.exports = { sendContactForm };
