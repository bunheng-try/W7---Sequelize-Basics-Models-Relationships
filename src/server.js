import sequelize from "./db/database.js"; 
import "./models/tables.js"; // Import the tables module
// 👈 this line is critical
import "./controllers/attendanceController.js"

try {
  // TODO - Call sequelize.sync()
 await sequelize.sync();
  // TODO -  Print the result of the sync on console
 console.log("Database connected successfully!");

} catch (error) {
  console.error("Unable to connect to the database:", error);
}
