const { user } = require("../../models/users");
const bcrypt = require("bcryptjs");

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
          adresse: data.adresse,
          zipCode: data.zipCode,
          city: data.city,
          admin: data.admin,
        },
      });
    });
  if (created) {
    return userAccount;
  } else return false;
}

//------------export modules
module.exports = { newUser };
