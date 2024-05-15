const mongoose = require("mongoose");
// Retrieve credentials and database details from environment variables
const username = encodeURIComponent(process.env.MONGO_INITDB_ROOT_USERNAME);
const password = encodeURIComponent(process.env.MONGO_INITDB_ROOT_PASSWORD);
const dbName = encodeURIComponent(process.env.MONGO_DB_NAME); // Name of the database

// Construct the MongoDB connection string with authentication details
const connection = `mongodb://${username}:${password}@mongo:27017/${dbName}?authSource=admin`;
const maxAttempts = 3;
let currentAttempts = 0;
const connectDb = async () => {
  const connectWithRetry = () => {
    return mongoose
      .connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("Database connected"))
      .catch((err) => {
        console.error("Database connection failed", err);
        if (currentAttempts <= maxAttempts) {
          currentAttempts += 1;
          setTimeout(connectWithRetry, 5000);
        } else {
          console.error("Too many failed connection attempts");
        }
      });
  };
  return connectWithRetry();
};
module.exports = connectDb;
