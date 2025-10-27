import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LodgeDetails from "./pages/LodgeDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookings from "./pages/Bookings";
import AdminDashboard from "./pages/AdminDashboard";
import AddLodge from "./pages/AddLodge";
import Navbar from "./components/NavBar";
import LodgesPage from "./pages/Lodges";

function App() {
  return (
    <BrowserRouter>
      <div className="relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/lodges" element={<LodgesPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/lodges/:id" element={<LodgeDetails />} />
          <Route path="/admin/lodges/new" element={<AddLodge />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
