const mongoose = require("mongoose");
const connection = "mongodb://mongo:27017/mongo-test";
const connectDb = async () => {
  const connectWithRetry = () => {
    return mongoose
      .connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("Database connected"))
      .catch((err) => {
        console.log("Database connection failed, retrying in 5 seconds");
        setTimeout(connectWithRetry, 5000);
      });
  };
  return connectWithRetry();
};
module.exports = connectDb;
