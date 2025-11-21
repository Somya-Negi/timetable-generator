import "./MainLayout.css";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

function MainLayout({ children }) {
  const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "Subjects", path: "/subjects" },
  { name: "Teachers", path: "/teachers" },
  { name: "Classrooms", path: "/classrooms" },
  { name: "Students", path: "/students" },
  { name: "Generate Timetable", path: "/generate" },
  { name: "View Timetable", path: "/timetable" },
  ];

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`layout-container ${darkMode ? "dark" : "light"}`}>

      {/* Navbar */}

        <header className="navbar">
        <h2 className="navbar-title">Exam Scheduler</h2>

        <nav className="navbar-menu">
          {menuItems.map((item, idx) => (
            <Link key={idx} className="menu-item" to={item.path}>
              {item.name}
            </Link>
          ))}
        </nav>

        <button className="mode-toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>
    

      {/* Main Content */}
      <div className="main-content">

        {/* Navbar */}
        <header className="navbar">
          <h3 className="navbar-title">College Exam Timetable System</h3>
        </header>

        {/* Routed Page Content */}
        <div className="content-area">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default MainLayout;
