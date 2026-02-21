import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateQuantity,
} from "../utils/cart";
import "./Cart.css";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const refresh = () => {
    setItems(getCart());
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
  <div className="cart-container">
    <h2 className="cart-title">My Cart 🛒</h2>

    {items.length === 0 ? (
      <p className="empty-cart">Cart is empty</p>
    ) : (
      <>
        {items.map((item) => (
          <div key={item._id} className="cart-card">
            <img
              src={item.image}
              alt={item.name}
              className="cart-image"
            />

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
      </>
    )}
  </div>
);

    
};

export default Cart;
