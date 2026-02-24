import { useEffect, useState } from "react";
import axios from "axios";
import { getCart, removeFromCart, updateQuantity } from "../utils/cart";
import "./Cart.css";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const refresh = () => {
    setItems(getCart());
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    if (total <= 0) return;

    setLoading(true);
    try {
      const { data } = await axios.post(
  "http://localhost:5000/api/payment/create-order", // ✅ correct
  { amount: total }
);

      const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY, // ✅ correct // store your key in .env
        amount: data.amount,
        currency: data.currency,
        name: "My Store",
        description: "Order Payment",
        order_id: data.id,
        handler: function (response) {
          alert("Payment Successful ✅");
          console.log(response);
          setItems([]); // Clear cart after payment
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart 🛒</h2>

      {items.length === 0 ? (
        <p className="empty-cart">Cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item._id} className="cart-card">
              <img src={item.image} alt={item.name} className="cart-image" />

              <div className="cart-details">
                <h4>{item.name}</h4>
                <p className="price">₹ {item.price}</p>

                <div className="quantity-box">
                  <button
                    className="qty-btn"
                    onClick={() => {
                      updateQuantity(item._id, "dec");
                      refresh();
                    }}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() => {
                      updateQuantity(item._id, "inc");
                      refresh();
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => {
                    removeFromCart(item._id);
                    refresh();
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3 className="cart-total">Total: ₹ {total}</h3>

          <button
            className="pay-btn"
            onClick={handlePayment}
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: loading ? "gray" : "green",
              color: "white",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "20px",
            }}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;