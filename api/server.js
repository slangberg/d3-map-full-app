const express = require("express");
const app = express();
const connectDb = require("./src/connection");
const authRoutes = require("./src/routes/auth.routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 8080;
app.use(cors());
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/test", async (req, res) => {
  res.json({
    message: "is alive now",
  });
});
app.use("/auth", authRoutes);
// app.get("/users", async (req, res) => {
//   const users = await User.find();

//   res.json(users);
// });

// app.get("/user-create", async (req, res) => {
//   const user = new User({ username: "userTest" });

//   await user.save().then(() => console.log("User created"));

//   res.send("User created \n");
// });

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log(`MongoDb connected ${new Date().toDateString()}`);
  });
});
