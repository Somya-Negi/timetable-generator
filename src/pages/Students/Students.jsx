import "./Students.css";
import { useState, useEffect } from "react";
import { addStudent, getStudents, deleteStudent } from "../../utils/DataService";

const Students = ()=> {

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [subjects, setSubjects] = useState("");

  const [studentsList, setStudentsList] = useState([]);

  useEffect(() => {
    setStudentsList(getStudents());
  }, []);

  const handleSubmit = () => {
    if (!name || !studentId || !subjects) {
      alert("Please fill all fields");
      return;
    }

  const newStudent = {
      id: Date.now(),
      name,
      studentId,
      subjects: subjects.split(",").map((s) => s.trim())
    };

    addStudent(newStudent);
    setStudentsList(getStudents());

    setName("");
    setStudentId("");
    setSubjects("");
  };

  const handleDelete = (id) => {
    deleteStudent(id);
    setStudentsList(getStudents());
  };

  return (
    <div className="students-container">

      <h1 className="students-heading">Add New Student</h1>

      <div className="students-card">

      <div className="form-group">
          <label>Student Name</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
          />
        </div>

        <div className="form-group">
          <label>Student ID</label>
          <input 
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter student ID"
          />
        </div>

        <div className="form-group">
          <label>Enrolled Subjects</label>
          <input 
            type="text"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            placeholder="Enter subjects (comma separated)"
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Save Student
        </button>

        {/* Display Saved Students */}
        <h2 style={{ marginTop: "30px" }}>Saved Students</h2>

        <ul>
          {studentsList.length === 0 && <p>No students added yet.</p>}

          {studentsList.map((s) => (
            <li key={s.id} className="student-item">
              <div>
                <strong>{s.name}</strong> (ID: {s.studentId})  
                <br />
                Subjects: {s.subjects.join(", ")}
             </div>
              

              <button 
                className="delete-btn"
                onClick={() => handleDelete(s.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
}

export default Students;
