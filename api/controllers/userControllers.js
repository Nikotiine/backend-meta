const { user } = require("../../models/users");
const { newsletter } = require("../../models/newsletter");
const { avatar } = require("../../models/usersAvatars");
const createError = require("http-errors");

const { usersAdresse } = require("../../models/userAdresse");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../token/generator");

//------------------------------------******Only Admin-----------------------------
//----------------------------------------------- new user function -----------------------------------
async function newUser(data) {
  console.log(data.avatar);
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
  } else {
    return createError(400, "Email déja utilisé");
  }
}
async function saveAvatar(blob, id) {
  //const userAvatar = fs.readFileSync(blob);
  //console.log(userAvatar);
  console.log(id);
  avatar.create({
    avatar: blob.data,
    userId: id,
  });
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
async function getUserAvatar(id) {
  return await avatar.findOne({
    where: { userId: id },
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
  const accountUser = await user.findByPk(id, {
    include: [
      {
        model: usersAdresse,
      },
      {
        model: newsletter,
      },
      {
        model: avatar,
      },
    ],
  });
  return accountUser;
}
//----------------------------------------------- count function -----------------------------------
async function countAllUsers() {
  const { count, raws } = await user.findAndCountAll();

  return { count };
}

//----------------------------------------------- edit function -----------------------------------
async function editUser(data, userid) {
  console.log(data.password);
  if (!data.password) {
    console.log("pas de newpassword");
    await user.update(
      {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        publicAuthorisation: data.publicAuthorisation,
      },
      {
        where: {
          id: userid,
        },
      }
    );

    await usersAdresse.update(
      {
        adressePerso: data.adressePerso,
        geoLocPro: data.geoLocPro,
        adressePro: data.adressePro,
        geoLocPerso: data.geoLocPerso,
      },
      {
        where: {
          userId: userid,
        },
      }
    );
    await newsletter.update(
      {
        email: data.email,
        registered: data.newsletter,
      },
      {
        where: {
          userId: userid,
        },
      }
    );
    return true;
  } else {
    await bcrypt.hash(data.password, 10).then((hash) => {
      console.log(data.newsletter);
      user.update(
        {
          password: hash,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          publicAuthorisation: data.publicAuthorisation,
        },
        {
          where: {
            id: userid,
          },
        }
      );
      newsletter.update(
        {
          email: data.email,
          registered: data.newsletter,
        },
        {
          where: {
            userId: userid,
          },
        }
      );
      usersAdresse.update(
        {
          adressePerso: data.adressePerso,
          geoLocPro: data.geoLocPro,
          adressePro: data.adressePro,
          geoLocPerso: data.geoLocPerso,
        },
        {
          where: {
            userId: userid,
          },
        }
      );
    });
  }
  return true;
}
async function editAvatar(id, blob) {
  console.log("edit avatar");
  avatar.update(
    {
      avatar: blob.data,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return true;
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
  saveAvatar,
  getUserAvatar,
  editAvatar,
};
