import "./ViewTable.css";
import { useEffect, useState } from "react";


const ViewTimetable = () => {

  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("timetable");
    if (saved) {
      setTimetable(JSON.parse(saved));
    }
  }, []);

  const clearTimetable = () => {
    localStorage.removeItem("timetable");
    setTimetable([]);
  };

  return (
    <div className="view-container">

      <h1 className="view-heading">Exam Timetable</h1>

      {/* Summary */}
      {timetable.length > 0 && (
        <div className="summary-box">
          <p><strong>Total Exams:</strong> {timetable.length}</p>
          <p><strong>Total Days:</strong> {new Set(timetable.map(t => t.date)).size}</p>
          <p><strong>Teachers Assigned:</strong> {new Set(timetable.map(t => t.teacher)).size}</p>
        </div>
      )}

      {/* Action Buttons */}
      {timetable.length > 0 && (
        <div className="action-buttons">
          <button className="print-btn" onClick={() => window.print()}>
            Print / Download PDF
          </button>

          <button className="clear-btn" onClick={clearTimetable}>
            Clear Timetable
          </button>
        </div>
      )}

      <div className="view-card">

        {timetable.length === 0 ? (
          <p>No timetable generated yet.</p>
        ) : (
          <table className="timetable-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Subject</th>
                <th>Subject Code</th>
                <th>Teacher</th>
                <th>Classroom</th>
              </tr>
            </thead>

            <tbody>
              {timetable.map((row) => (
                <tr key={row.id}>
                  <td>{row.date}</td>
                  <td>{row.time}</td>
                  <td>{row.subject}</td>
                  <td>{row.subjectCode}</td>
                  <td>{row.teacher}</td>
                  <td>{row.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>

    </div>
  );
};

export default ViewTimetable;

