const express = require("express");
const app = express();
const connectDb = require("./src/connection");

const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("./src/middlewares/passport");
const PORT = 8080;

// Route Files
const authRoutes = require("./src/routes/auth.routes");
const usersRoutes = require("./src/routes/users.routes");
const mapRoutes = require("./src/routes/map.routes");

app.use(cors());
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.get("/test", async (req, res) => {
  res.json({
    message: "is alive now",
  });
});
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/maps", mapRoutes);

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log(`MongoDb connected ${new Date().toLocaleTimeString()}`);
  });
});
