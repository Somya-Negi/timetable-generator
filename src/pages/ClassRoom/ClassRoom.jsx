import "./Classroom.css";
import { useState, useEffect } from "react";
import { addClassroom, getClassrooms, deleteClassroom } from "../../utils/DataService";

const Classroom = () => {

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    setClassrooms(getClassrooms());
  }, []);

  const handleSubmit = () => {
    if (!name || !capacity) {
      alert("Please fill all fields");
      return;
    }

    const newRoom = {
      id: Date.now(),
      name,
      capacity: Number(capacity)
    };

    addClassroom(newRoom);
    setClassrooms(getClassrooms());

    setName("");
    setCapacity("");
  };

  const handleDelete = (id) => {
    deleteClassroom(id);
    setClassrooms(getClassrooms());
  };

  return (
    <div className="classrooms-container">

      <h1 className="classrooms-heading">Add New Classroom</h1>

      <div className="classrooms-card">

        <div className="form-group">
          <label>Classroom Name</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter classroom name" 
          />
        </div>

        <div className="form-group">
          <label>Capacity</label>
          <input 
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="Enter capacity" 
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Save Classroom
        </button>

        {/* Display Classrooms */}
        <h2 style={{ marginTop: "30px" }}>Saved Classrooms</h2>

        <ul>
          {classrooms.length === 0 && <p>No classrooms added yet.</p>}

          {classrooms.map((room) => (
            <li key={room.id} className="classroom-item">
              {room.name} — Capacity: {room.capacity}

              <button 
                className="delete-btn"
                onClick={() => handleDelete(room.id)}
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

export default Classroom;
