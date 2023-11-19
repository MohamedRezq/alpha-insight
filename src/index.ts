import app from "./app";
import sequelize from "./config/database";
import dotenv from "dotenv";

dotenv.config();
console.log("port: ", process.env.PORT);
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
