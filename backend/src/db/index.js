const { Sequelize } = require("sequelize");

// configuring MySQL database
const sequelize = new Sequelize("socialmediatest", "root", "Dibraksta1$", {
  host: "localhost",
  dialect: "mysql",
});

// database connection initializer
const initialize = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Connection has been established successfully.");
    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  sequelize,
  initialize,
};
