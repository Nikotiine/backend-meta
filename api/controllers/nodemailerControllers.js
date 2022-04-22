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
    html: `Email de réponse : ${formulaire.email} </br> Contenu du message : ${formulaire.message}`,
  };

  return await transporter.sendMail(mailOptions);
}
async function sendOrder(order, products, user) {
  const mailOptions = {
    from: user.email,
    to: process.env.GMAIL_TEST_ADRESS,
    subject: `Commande n°${order.dataValues.id}`,
    html: `<p><strong>Commande a expedié a :</strong> ${user.firstName} ${
      user.lastName
    } <br/>
    <strong>adresse email:</strong>${user.email} <br/>
    <strong>adresse d'expediton:</strong> ${order.dataValues.shipTo} <br/>
    <strong>Listes des produits commandés:</strong> <br/>
     ${products
       .map(
         (x) =>
           "Produit : " +
           x.name +
           "<br/>" +
           " SMALLBOX : " +
           x.smallBox +
           " BIGBOX: " +
           x.bigBox
       )
       .join("<br/>")} <br/>
    
       <strong>Moyen de payement : </strong>${order.dataValues.payment} <br/>
       <strong>Total de la commande :</strong> ${
         order.dataValues.total
       } € </p>`,
  };
  return await transporter.sendMail(mailOptions);
}
module.exports = { sendContactForm, sendOrder };
