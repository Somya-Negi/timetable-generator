import "./Subjects.css";
import {useState, useEffect} from "react";
import {addSubject, getSubjects, deleteSubject} from "../../utils/DataService";

const Subjects = () => {

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [semester, setSemester] = useState("");

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
  setSubjects(getSubjects());
  }, []);

  const handleSubmit = () => {
    if (!name || !code || !semester) {
      alert("Please fill all fields");
      return;
    }

    const newSubject = {
      id: Date.now(),
      name,
      code,
      semester: Number(semester),
    };

    addSubject(newSubject);
    setSubjects(getSubjects());

    setName("");
    setCode("");
    setSemester("");
  };

  const handleDelete = (id) => {
  deleteSubject(id);
  setSubjects(getSubjects());
};



  return (
    <div className="subjects-container">

      <h1 className="subjects-heading">Add New Subject</h1>

      <div className="subjects-card">

        <div className="form-group">
          <label>Subject Name</label>
           <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter subject name" 
          />
        </div>

        <div className="form-group">
          <label>Subject Code</label>
          <input 
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter subject code" 
          />
        </div>

        <div className="form-group">
          <label>Semester</label>
           <input 
            type="number"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder="Enter semester" 
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>Save Subject</button>

        {/* Display Subjects */}
      <h2 style={{ marginTop: "30px" }}>Saved Subjects</h2>
      
      <ul>
        {subjects.length === 0 && <p>No subjects added yet.</p>}

        {subjects.map((sub) => (
          <li key={sub.id} className="subject-item">
            {sub.name} ({sub.code}) – Semester {sub.semester}

            <button 
                className="delete-btn"
                onClick={() => handleDelete(sub.id)}
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

export default Subjects;
