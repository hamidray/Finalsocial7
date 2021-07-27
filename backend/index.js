const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// routes modules
const userRouter = require("./src/routes/user.router");
const postRouter = require("./src/routes/post.router");

// database module
const db = require("./src/db");

// app instance
const app = express();

// initializing the database connection
db.initialize();

// handling request and responses as JSON
app.use(express.json());

// incoming URLs are encoded before accessing values
app.use(express.urlencoded({ extended: false }));

// setting important response headers
app.use(helmet());

// enabling CORS
app.use(cors());

// serving post images
app.use("/images", express.static("./public/images/post"));

// routes for user endpoints
app.use("/api/user", userRouter);

// routes for post endpoints
app.use("/api/post", postRouter);

// forbidding rest of the all possible endpoint calls
app.use("*", (req, res) => res.sendStatus(403).end());

// starting the server
app.listen(5555, () => console.log("Server running on port 5555"));
