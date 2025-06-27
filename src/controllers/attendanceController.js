import "../models/att_tables";
import { AttendanceRecord } from "../models/att_tables";

function markAttendace(studentId, classId, date, status = "Present"){
    return AttendanceRecord.create({
        studentId,
        classId,
        date,
        status
    });
}

function getAttendance(studentId, date){
    return AttendanceRecord.findOne({
        where: {
            studentId,
            date
        }
    })
}
