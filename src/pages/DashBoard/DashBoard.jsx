import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../../components/DashBoardCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const modules = [
    { label: "Subjects", path: "/subjects" },
    { label: "Teachers", path: "/teachers" },
    { label: "Classrooms", path: "/classrooms" },
    { label: "Students", path: "/students" },
    { label: "Generate Timetable", path: "/generate" },
    { label: "View Timetable", path: "/timetable" },
  ];


  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>
      <p className="dashboard-subtitle">
        Choose a module to continue.
      </p>

       <div className="dashboard-cards">
        {modules.map((item, index) => (
          <DashboardCard
            key={index}
            label={item.label}
            onClick={() => navigate(item.path)}
          />
        ))}
      

      </div>
    </div>
  );
}

export default Dashboard;
