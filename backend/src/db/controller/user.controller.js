const User = require("../model/User");

exports.addUser = async (email, firstName, lastName, hashedPassword, isAdmin) =>
  await User.create({
    email,
    firstName,
    lastName,
    password: hashedPassword,
    isAdmin,
  });

exports.getUserByEmail = async (email, password) =>
  await User.findOne({
    where: {
      email,
    },
  });

exports.getUserById = async (id) =>
  await User.findOne({
    where: {
      id,
    },
    attributes: [
      "id",
      "email",
      "firstName",
      "lastName",
      "isAdmin",
      "createdAt",
      "updatedAt",
    ],
  });

exports.deleteUser = async (id) => {
  return (
    (await User.destroy({
      where: {
        id,
      },
    })) === 1
  );
};
