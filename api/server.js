const express = require("express");
const app = express();
const connectDb = require("./src/connection");
const qs = require("qs");
const cors = require("cors");
const {
  passportSetup,
  authenticationMiddleware,
} = require("./src/middlewares/passport-setup");

const PORT = 8080;
require("dotenv").config();
// Route Files
const authRoutes = require("./src/routes/auth.routes");
const usersRoutes = require("./src/routes/users.routes");
const mapRoutes = require("./src/routes/map.routes");

app.use(cors());
app.use(express.json()); // for parsing application/json

// Override the default query parser
app.set("query parser", function (str) {
  return qs.parse(str, {
    allowDots: true,
    comma: true,
    depth: 10,
    allowPrototypes: false,
  });
});

// Passport middleware
app.use(passportSetup.initialize());
app.get("/test", async (req, res) => {
  res.json({
    message: "is alive now",
  });
});
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/maps", authenticationMiddleware, mapRoutes);

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
  connectDb().then(() => {
    console.log(`MongoDb connected ${new Date().toLocaleTimeString()}`);
  });
});
