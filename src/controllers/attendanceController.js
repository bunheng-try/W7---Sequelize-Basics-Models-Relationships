import { Sequelize } from "sequelize";
import { AttendanceRecord, Student } from "../models/att_tables.js";

export async function markAttendance(studentId, classId, date, status = "Present") {
  try {
    return await AttendanceRecord.create({
      studentId,
      classId,
      date,
      status,
    });
  } catch (error) {
    throw new Error("Error marking attendance: " + error.message);
  }
}
export async function getAttendance(studentId, date) {
  try {
    return await AttendanceRecord.findOne({
      where: {
        studentId,
        date,
      },
    });
  } catch (error) {
    throw new Error("Error getting attendance: " + error.message);
  }
}
export async function listClassAttendance(classId) {
  try {
    return await AttendanceRecord.findAll({
      where: { classId },
      include: [Student],
    });
  } catch (error) {
    throw new Error("Error listing class attendance: " + error.message);
  }
}
export async function getStudentSummary(studentId) {
  try {
    return await AttendanceRecord.findAll({
      where: { studentId },
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
      ],
      group: ["status"],
    });
  } catch (error) {
    throw new Error("Error getting student summary: " + error.message);
  }
}