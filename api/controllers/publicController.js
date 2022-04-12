const { user } = require("../../models/users");
const { usersAdresse } = require("../../models/userAdresse");

async function getInfoUsers() {
  return await user.findAll({
    where: { publicAuthorisation: true },
    attributes: ["firstName", "lastName"],
    include: [
      {
        model: usersAdresse,
        attributes: ["adressePro", "geoLocPro", "userId"],
      },
    ],
  });
}
async function countAllAuthorised() {
  const { count, raws } = await user.findAndCountAll({
    where: { publicAuthorisation: true },
  });

  return { count };
}
module.exports = { getInfoUsers, countAllAuthorised };
