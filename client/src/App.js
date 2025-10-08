//import logo from './logo.svg';
 import './App.css';
import Login from './pages/Login';
// import Register from './pages/Register';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import ReportAnalytics from './components/ReportAnalytics';
import NotificationCard from './components/NotificationCard';
import ManageUser from './components/ManageUser';
import StatCard from './components/StatCard';
import StudentsMenu from './components/StudentsMenu';
import Teachers from './components/Teachers';
// import Classes from './components/Classes';
import AttendanceForm from './components/AttendanceForm';
import StudentAttendance from './components/StudentAttendance';
import StudentForm from './pages/StudentForm';
function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/forgetPasswordPage" element={<ForgetPasswordPage />} />
      {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
      
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route path="reports" element={<ReportAnalytics />} />
            <Route path='student' element={<StudentsMenu/>}/>
            <Route path='teacher' element={<Teachers/>}/>
            {/* <Route path='classes' element={<Classes/>}/> */}
            <Route path="notifications" element={<NotificationCard message={"New Student added"} />} />
            <Route path="manage-user" element={<ManageUser />} />
            <Route path="stats" element={<StatCard />} />
            <Route path="attendance" element={<StudentAttendance/>} />
            <Route path="/admin-dashboard/student-enrollment" element={<StudentForm/>} />
        </Route>
      {/* <AdminDashboard/> */}

    </Routes>
  );
}

export default App;
