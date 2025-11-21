import "./GenerateTimetable.css";
import { getSubjects, getTeachers, getClassrooms, getStudents } from "../../utils/DataService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GenerateTimetable = () => {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(3);
  const navigate = useNavigate();

  // Utility: Calculate end time using duration
  const calculateEndTime = (startTime, duration) => {
    let [hour, minute] = startTime.split(":").map(Number);

    let start = new Date();
    start.setHours(hour);
    start.setMinutes(minute);

    let end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    return `${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`;
  };

  const generate = () => {
    setLoading(true);

    const subjects = getSubjects();
    const teachers = getTeachers();
    const classrooms = getClassrooms();
    const students = getStudents();

    // Track schedules
    let teacherSchedule = {};
    let roomSchedule = {};
    let studentSchedule = {};

    // Helper – Check if any student in this subject already has exam in same slot
    const hasStudentClash = (subjectStudents, day, start) => {
      const slotKey = `Day ${day} - ${start}`;

      for (let student of subjectStudents) {
        if (studentSchedule[student]?.includes(slotKey)) {
          return true;
        }
      }
      return false;
    };

    // Validate minimum data
    if (subjects.length === 0 || teachers.length === 0 || classrooms.length === 0) {
      alert("Please add subjects, teachers, and classrooms first!");
      setLoading(false);
      return;
    }

    const startTimes = ["09:00", "13:00", "16:00"];

    let timetable = [];

    subjects.forEach((sub, index) => {
      const teacher = teachers[index % teachers.length];
      const room = classrooms[index % classrooms.length];

      let day = 1;          // start scheduling from Day 1 ALWAYS
      let slotIndex = 0;
      let assigned = false;

      const subjectStudents = sub.students || []; // Safe fallback

      while (!assigned) {
        const start = startTimes[slotIndex % startTimes.length];
        const end = calculateEndTime(start, Number(duration));
        const slotKey = `Day ${day} - ${start}`;

        // Teacher clash
        if (teacherSchedule[teacher.name]?.includes(slotKey)) {
          slotIndex++;
          if (slotIndex >= startTimes.length) { slotIndex = 0; day++; }
          continue;
        }

        // Room clash
        if (roomSchedule[room.name]?.includes(slotKey)) {
          slotIndex++;
          if (slotIndex >= startTimes.length) { slotIndex = 0; day++; }
          continue;
        }

        // Student clash
        if (hasStudentClash(subjectStudents, day, start)) {
          slotIndex++;
          if (slotIndex >= startTimes.length) { slotIndex = 0; day++; }
          continue;
        }

        // Assign slot → No clashes
        timetable.push({
          id: Date.now() + index,
          subject: sub.name,
          subjectCode: sub.code,
          teacher: teacher.name,
          room: room.name,
          date: `Day ${day}`,
          time: `${start} - ${end}`
        });

        // Update teacher schedule
        teacherSchedule[teacher.name] = [
          ...(teacherSchedule[teacher.name] || []),
          slotKey
        ];

        // Update room schedule
        roomSchedule[room.name] = [
          ...(roomSchedule[room.name] || []),
          slotKey
        ];

        // Update student schedule
        subjectStudents.forEach(student => {
          studentSchedule[student] = [
            ...(studentSchedule[student] || []),
            slotKey
          ];
        });

        assigned = true;
      }
    });

    // Save timetable
    localStorage.setItem("timetable", JSON.stringify(timetable));

    setLoading(false);
    navigate("/timetable");
  };

  return (
    <div className="generate-container">
      <h1 className="generate-heading">Generate Timetable</h1>

      <div className="generate-card">
        <p className="generate-info">
          Click the button below to automatically generate the exam timetable based on all the data you have entered.
        </p>

        <div className="form-group">
          <label>Exam Duration (Hours)</label>
          <select 
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="duration-input"
          >
            <option value="1">1 Hour</option>
            <option value="2">2 Hours</option>
            <option value="3">3 Hours</option>
          </select>
        </div>

        <button 
          className="submit-btn" 
          onClick={generate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Timetable"}
        </button>
      </div>
    </div>
  );
};

export default GenerateTimetable;
