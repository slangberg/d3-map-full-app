const mongoose = require("mongoose");
let connection = "mongodb://mongo:27017/mongo-test";

if (process.env.NODE_ENV === "production") {
  const username = process.env.MONGO_INITDB_ROOT_USERNAME;
  const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
  // Include the username and password in the MongoDB URI
  connection = `mongodb://${username}:${password}@mongo:27017/mongo-test?authSource=admin`;
  console.log("connection", connection);
}

const maxCount = 2;
let count = 0;
const connectDb = async () => {
  const connectWithRetry = () => {
    return mongoose
      .connect(connection)
      .then(() => console.log("Database connected"))
      .catch((err) => {
        console.error("Database connection failed, retrying in 5 seconds");
        if (count <= maxCount) {
          count += 1;
          setTimeout(connectWithRetry, 5000);
        } else {
          console.error("max attempts made");
        }
      });
  };
  return connectWithRetry();
};
module.exports = connectDb;
