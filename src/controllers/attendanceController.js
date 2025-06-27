import { Sequelize } from "sequelize";
import { AttendanceRecord , Student} from "../models/att_tables";

function markAttendace(studentId, classId, date, status = "Present"){
    try {
        return AttendanceRecord.create({
            studentId,
            classId,
            date,
            status
        });
    } catch (error){
        throw new Error("Error marking attendance:", error.message);
    }
}
function getAttendance(studentId, date){
    try {
        return AttendanceRecord.findOne({
            where: {
                studentId,
                date
            }
        });
    } catch (error) {
        throw new Error("Error marking attendance:", error.message);
    }
}
function listClassAttendance(classId){
    try {
        return AttendanceRecord.findAll({
            where:{
                classId
            },
            include:[
                Student
            ]
        });
    } catch (error){
        throw new Error("Error listing class attendace:", error.message);
    }
}
function getStudentSummary(studentId){
    try {
        return AttendanceRecord.findAll({
            where:{ studentId},
            attributes: ['status', [Sequelize.fn('count', Sequelize.col('status')), 'count']],
            group: ['status']
        });
    } catch (error) {
        throw new Error("Error getting student summary:", error.message);
    }
}