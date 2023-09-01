import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Room from "./pages/rooms/room_checked";
import Main from "./pages/rooms/room";
import Edit_room from "./pages/rooms/edit_room";
import Add_room from "./pages/rooms/add_room";
import Booking from "./pages/bookings/booking_add";
import BookingHistory from "./pages/bookings/booking_history";
import BookingEdit from "./pages/bookings/booking_edit";
import Dashboard from "./pages/dashboard";

// import "./styles.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/room" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit_room/:id" element={<Edit_room />} />
        <Route path="/add_room" element={<Add_room />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/booking_history" element={<BookingHistory />} />
        <Route path="/booking_edit/:id" element={<BookingEdit />} />
      </Routes>
    </Router>
  );
}
