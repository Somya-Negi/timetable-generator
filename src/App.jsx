import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/dashBoard/Dashboard";
import Subjects from "./pages/Subjects/Subjects";
import Teachers from "./pages/Teachers/Teachers";
import Students from "./pages/Students/Students";
import ViewTimetable from "./pages/ViewTable/ViewTable";
import GenerateTimetable from "./pages/GenerateTimetable/GenerateTimetable";
import Classroom from "./pages/ClassRoom/ClassRoom";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/subjects" element={<Subjects />} />
           <Route path="/teachers" element={<Teachers/>} />
           <Route path="/students" element={<Students />} />
           <Route path="/classrooms" element={<Classroom />} />
           <Route path="/generate" element={<GenerateTimetable />} />
           <Route path="/timetable" element={<ViewTimetable />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
