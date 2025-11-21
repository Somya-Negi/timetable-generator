// ---------- Generic Helpers ----------
export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getData(key) {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

// ---------- Subjects ----------
export function addSubject(subject) {
  const subjects = getData("subjects");
  subjects.push(subject);
  saveData("subjects", subjects);
}

export function getSubjects() {
  return getData("subjects");
}

export function deleteSubject(id) {
  const subjects = getData("subjects");
  const updated = subjects.filter((sub) => sub.id !== id);
  saveData("subjects", updated);
}


// ---------- Teachers ----------
export function addTeacher(teacher) {
  const teachers = getData("teachers");
  teachers.push(teacher);
  saveData("teachers", teachers);
}

export function getTeachers() {
  return getData("teachers");
}

export function deleteTeacher(id) {
  const teachers = getData("teachers");
  const updated = teachers.filter((t) => t.id !== id);
  saveData("teachers", updated);
}


// ---------- Classrooms ----------
export function addClassroom(room) {
  const rooms = getData("classrooms");
  rooms.push(room);
  saveData("classrooms", rooms);
}

export function getClassrooms() {
  return getData("classrooms");
}

export function deleteClassroom(id) {
  const rooms = getData("classrooms");
  const updated = rooms.filter((r) => r.id !== id);
  saveData("classrooms", updated);
}


// ---------- Students ----------
export function addStudent(student) {
  const students = getData("students");
  students.push(student);
  saveData("students", students);
}

export function getStudents() {
  return getData("students");
}

export function deleteStudent(id) {
  const students = getData("students");
  const updated = students.filter((s) => s.id !== id);
  saveData("students", updated);
}

