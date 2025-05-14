import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import Demo from "./pages/Demo";
import ViewStudent from "./pages/ViewStudent";
import ViewUser from "./pages/ViewUser";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ManageStudent from "./pages/ManageStudent";
import Users from "./components/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/viewstudent" element={<ViewStudent />} />
        <Route path="/viewuser" element={<ViewUser />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/managestudent" element={<ManageStudent />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
