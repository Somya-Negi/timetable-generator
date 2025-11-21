import { useState, useEffect } from "react";
import { addTeacher, getTeachers, deleteTeacher } from "../../utils/DataService";
import "./Teachers.css";

const Teachers = () => {

  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [subjects, setSubjects] = useState("");
  const [availability, setAvailability] = useState("");

  const [teachersList, setTeachersList] = useState([]);

  useEffect(() => {
    setTeachersList(getTeachers());
  }, []);

  const handleSubmit = () => {
    if (!name || !teacherId || !subjects || !availability) {
      alert("Please fill all fields");
      return;
    }
  
  const newTeacher = {
      id: Date.now(),
      name,
      teacherId,
      subjects: subjects.split(",").map((s) => s.trim()),
      availability
    };

    addTeacher(newTeacher);
    setTeachersList(getTeachers());

    setName("");
    setTeacherId("");
    setSubjects("");
    setAvailability("");
  };

  const handleDelete = (id) => {
    deleteTeacher(id);
    setTeachersList(getTeachers());
  };

  return (
    <div className="teachers-container">

      <h1 className="teachers-heading">Add New Teacher</h1>

      <div className="teachers-card">

        <div className="form-group">
          <label>Teacher Name</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter teacher name"
          />
        </div>

        <div className="form-group">
          <label>Teacher ID</label>
          <input 
            type="text"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            placeholder="Enter teacher ID"
          />
        </div>

        <div className="form-group">
          <label>Subjects Assigned</label>
          <input 
            type="text"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            placeholder="Enter subjects (comma separated)"
          />
        </div>

        <div className="form-group">
          <label>Available Slots</label>
          <input 
            type="text"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            placeholder="e.g. 9AM - 12PM"
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Save Teacher
        </button>

        {/* Display Teachers */}
        <h2 style={{ marginTop: "30px" }}>Saved Teachers</h2>

        <ul>
          {teachersList.length === 0 && <p>No teachers added yet.</p>}

          {teachersList.map((t) => (
            <li key={t.id} className="teacher-item">
              <strong>{t.name}</strong> (ID: {t.teacherId})  
              <br />
              Subjects: {t.subjects.join(", ")}
              <br />
              Availability: {t.availability}

              <button 
                className="delete-btn"
                onClick={() => handleDelete(t.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
};

export default Teachers;
