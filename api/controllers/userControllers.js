const { user } = require("../../models/users");
const { newsletter } = require("../../models/newsletter");
const { usersAdresse } = require("../../models/userAdresse");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../token/generator");
//------------------------------------******Only Admin-----------------------------
//----------------------------------------------- new user function -----------------------------------
async function newUser(data) {
  const [userAccount, created] = await bcrypt
    .hash(data.password, 10)
    .then((hash) => {
      return user.findOrCreate({
        where: {
          email: data.email,
        },
        defaults: {
          password: hash,
          firstName: data.firstName,
          lastName: data.lastName,
          avatar: data.avatar,
          admin: data.admin,
          publicAuthorisation: data.publicAuthorisation,
        },
      });
    });
  if (created) {
    newsletter.create({
      email: data.email,
      registered: data.newsletter,
      userId: userAccount.id,
    });
    usersAdresse.create({
      adressePerso: data.adressePerso,
      geoLocPerso: data.geoLocPerso,
      adressePro: data.adressePro,
      geoLocPro: data.geoLocPro,
      userId: userAccount.id,
    });
    return userAccount;
  } else return false;
}
//-----------------------------------------------find all function -----------------------------------
async function accessAllAccount() {
  return await user.findAll({
    include: [
      {
        model: newsletter,
      },
      { model: usersAdresse },
    ],
  });
}
async function destroyAccount(userId) {
  return await user.destroy({
    where: { id: userId.id },
  });
}
//------------------------------------******Only Admin-----------------------------
//----------------------------------------------- loggin function -----------------------------------
async function logginUser({ email, password }) {
  const account = await user.findOne({
    where: {
      email: email,
    },
  });
  if (!account || !bcrypt.compareSync(password, account.password)) {
    return false;
  } else {
    const accessToken = generateAccessToken({ account });
    const refreshToken = generateRefreshToken({ account });
    return { accessToken, refreshToken };
  }
}
async function accountUser(id) {
  return await user.findByPk(id);
}
//----------------------------------------------- count function -----------------------------------
async function countAllUsers() {
  const { count, raws } = await user.findAndCountAll();

  return { count };
}

//----------------------------------------------- edit function -----------------------------------
async function editUser(data, userid) {
  if (!data.password) {
    return user.update(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        adresse: data.adresse,
        zipCode: data.zipCode,
        city: data.city,
        email: data.email,
      },
      {
        where: {
          id: userid,
        },
      }
    );
  } else {
    await bcrypt.hash(data.password, 10).then((hash) => {
      return user.update(
        {
          password: hash,
          firstName: data.firstName,
          lastName: data.lastName,
          adresse: data.adresse,
          zipCode: data.zipCode,
          city: data.city,
          email: data.email,
        },
        {
          where: {
            id: userid,
          },
        }
      );
    });
  }
}
//------------export modules
module.exports = {
  newUser,
  logginUser,
  accountUser,
  countAllUsers,
  editUser,
  accessAllAccount,
  destroyAccount,
};
