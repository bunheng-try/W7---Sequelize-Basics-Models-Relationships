import express from "express";
import {
  markAttendance,
  getAttendance,
  listClassAttendance,
  getStudentSummary,
} from "../controllers/attendanceController.js";

const router = express.Router();  // <<--- THIS WAS MISSING

router.post("/attendance", async (req, res) => {
  console.log("req.body:", req.body); // debug body
  try {
    const { studentId, classId, date, status } = req.body;
    if (!studentId || !classId || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const record = await markAttendance(studentId, classId, date, status);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance", error: error.message });
  }
});

router.get("/attendance", async (req, res) => {
  const { studentId, date } = req.query;

  if (!studentId || !date) {
    return res.status(400).json({ error: "studentId and date are required." });
  }

  try {
    const record = await getAttendance(studentId, date);
    if (!record) {
      return res.status(404).json({ message: "No attendance record found." });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/classes/:id/attendance", async (req, res) => {
  const classId = req.params.id;

  try {
    const records = await listClassAttendance(classId);
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/students/:id/attendance", async (req, res) => {
  const studentId = req.params.id;

  try {
    const summary = await getStudentSummary(studentId);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
