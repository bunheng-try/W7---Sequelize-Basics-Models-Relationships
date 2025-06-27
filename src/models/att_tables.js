// models/models.js
import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Class = sequelize.define("Class", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  schedule: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Student = sequelize.define("Student", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  classId: {
    type: DataTypes.INTEGER,
    references: {
      model: Class,
      key: "id",
    },
  },
});

const AttendanceRecord = sequelize.define("AttendanceRecord", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Present",
  },
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: "id",
    },
  },
  classId: {
    type: DataTypes.INTEGER,
    references: {
      model: Class,
      key: "id",
    },
  },
});

Class.hasMany(Student, { foreignKey: "classId" });
Student.belongsTo(Class, { foreignKey: "classId" });

Student.hasMany(AttendanceRecord, { foreignKey: "studentId" });
AttendanceRecord.belongsTo(Student, { foreignKey: "studentId" });

Class.hasMany(AttendanceRecord, { foreignKey: "classId" });
AttendanceRecord.belongsTo(Class, { foreignKey: "classId" });

export { Class, Student, AttendanceRecord };
async function insertSampleData() {
  await sequelize.sync({ force: true }); // Recreates tables

  const class1 = await Class.create({
    name: "Web Development",
    schedule: "Mon-Wed-Fri 10:00-12:00"
  });

  const student1 = await Student.create({
    name: "HengZ",
    classId: class1.id
  });

  await AttendanceRecord.create({
    studentId: student1.id,
    classId: class1.id,
    date: "2025-06-17",
    status: "Present"
  });

  console.log("Sample data inserted successfully");
}