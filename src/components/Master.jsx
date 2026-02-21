import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Laptops from "./Laptops";
import Mobiles from "./Mobiles";
import Watches from "./Watches";
import Cart from "./Cart";
import MyChatBot from "./ChatBot";   // ✅ ADD THIS LINE
import ForgotPassword from "./Forgotpassword"; // ✅ ADD THIS
import ResetPassword from "./ResetPassword";


const Master = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/reset-password/:token" element={<ResetPassword />} />


        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="laptops" element={<Laptops />} />
          <Route path="mobiles" element={<Mobiles />} />
          <Route path="watches" element={<Watches />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        
      </Routes>

      <MyChatBot />   {/* ✅ This is correct */}
    </BrowserRouter>
  );
};

export default Master;
