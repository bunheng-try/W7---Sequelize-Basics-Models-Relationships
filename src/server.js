import express from "express";
import sequelize from "./db/database.js";
import "./models/att_tables.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

const app = express();
app.use(express.json());

app.use("/", attendanceRoutes);

// Sync database and start server
async function startServer() {
  try {
    await sequelize.sync();
    console.log("Database synced successfully");

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err.message);
  }
}
startServer();
