import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import Amenities from "./pages/Amenities";
import Offers from "./pages/Offers";
import Reviews from "./pages/Reviews";
import Booking from "./pages/Booking";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Rates from "./pages/Rates";
import MeetingsAndEvents from "./pages/MeetingsAndEvents";
import FAQ from "./pages/FAQ";
import Restaurant from "./pages/Restaurant";
import Spa from "./pages/Spa";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBookings from "./pages/AdminBookings";
import AdminRooms from "./pages/AdminRooms";
import AdminStaff from "./pages/AdminStaff";
import AdminContacts from "./pages/AdminContacts";
import AdminSlides from "./pages/AdminSlides";
import { AdminLayout } from "./sections/AdminNav";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:id" element={<RoomDetail />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/meetings" element={<MeetingsAndEvents />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/spa" element={<Spa />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/rooms" element={<AdminRooms />} />
          <Route path="/admin/slides" element={<AdminSlides />} />
          <Route path="/admin/staff" element={<AdminStaff />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
