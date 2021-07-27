const { Router } = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const {
  addUser,
  getUserByEmail,
  deleteUser,
  getUserById,
} = require("../db/controller/user.controller");
const handleUserAuthorization = require("../middleware/handleUserAuthorization");

const userRouter = Router();

const createUser = async (req, res, isAdmin) => {
  const {
    body: { email, firstName, lastName, password },
  } = req;

  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({ message: "Missing required params" }).end();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await addUser(email, firstName, lastName, hashedPassword, 0);
    return res.json(user).end();
  } catch (error) {
    return res
      .status(400)
      .json({
        message: "User creation failed. Try with different email.",
        error,
      })
      .end();
  }
};

userRouter.post("/", (req, res) => {
  createUser(req, res, 0);
});

userRouter.post("/admin", (req, res) => {
  createUser(req, res, 1);
});

userRouter.post("/login", async (req, res) => {
  const {
    body: { email, password },
  } = req;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing required params" }).end();
  }

  try {
    const user = await getUserByEmail(email, password);
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 60 * 60, data: user },
        process.env.SECRET
      );
      return res.json({ token, user }).end();
    } else {
      return res.status(400).json({ message: "Password incorrect" }).end();
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Incorrect email or password", error })
      .end();
  }
});

userRouter.get("/:userId", handleUserAuthorization(), async (req, res) => {
  try {
    const {
      params: { userId },
    } = req;
    const user = await getUserById(userId);
    return res.json(user).end();
  } catch (error) {
    return res.status(400).json({ message: "Invalid request", error }).end();
  }
});

userRouter.delete("/:userId", handleUserAuthorization(), async (req, res) => {
  try {
    const {
      params: { userId },
      user: { isAdmin },
    } = req;
    if (isAdmin) {
      const deleted = await deleteUser(userId);
      return res.json({ message: "User deleted", deleted }).end();
    } else {
      return res.status(400).json({ message: "Access denied" }).end();
    }
  } catch (error) {
    return res.status(400).json({ message: "Invalid request", error }).end();
  }
});

module.exports = userRouter;
