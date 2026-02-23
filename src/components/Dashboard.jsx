import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCartCount } from "../utils/cart";
import "./Dashboard.css";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    setCount(getCartCount());

    const updateCount = () => {
      setCount(getCartCount());
    };

    window.addEventListener("cartUpdated", updateCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  return (
    <>
      <header className="navbar">
        <h2 className="logo">MyStore</h2>

        <nav>
          <Link to="laptops">Laptops</Link>
          <Link to="mobiles">Mobiles</Link>
          <Link to="watches">Watches</Link>

          <Link to="cart" className="cart-link">
            <FaShoppingCart />
            Cart
            {count > 0 && (
              <span className="cart-badge">{count}</span>
            )}
          </Link>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Dashboard;
