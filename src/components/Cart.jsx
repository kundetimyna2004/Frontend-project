// import { useEffect, useState } from "react";
// import {
//   getCart,
//   removeFromCart,
//   updateQuantity,
// } from "../utils/cart";
// import "./Cart.css";

// const Cart = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     setItems(getCart());
//   }, []);

//   const refresh = () => {
//     setItems(getCart());
//   };

//   const total = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//   <div className="cart-container">
//     <h2 className="cart-title">My Cart 🛒</h2>

//     {items.length === 0 ? (
//       <p className="empty-cart">Cart is empty</p>
//     ) : (
//       <>
//         {items.map((item) => (
//           <div key={item._id} className="cart-card">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="cart-image"
//             />

//             <div className="cart-details">
//               <h4>{item.name}</h4>
//               <p className="price">₹ {item.price}</p>

//               <div className="quantity-box">
//                 <button
//                   className="qty-btn"
//                   onClick={() => {
//                     updateQuantity(item._id, "dec");
//                     refresh();
//                   }}
//                 >
//                   -
//                 </button>

//                 <span>{item.quantity}</span>

//                 <button
//                   className="qty-btn"
//                   onClick={() => {
//                     updateQuantity(item._id, "inc");
//                     refresh();
//                   }}
//                 >
//                   +
//                 </button>
//               </div>

//               <button
//                 className="remove-btn"
//                 onClick={() => {
//                   removeFromCart(item._id);
//                   refresh();
//                 }}
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}

//         <h3 className="cart-total">Total: ₹ {total}</h3>
//       </>
//     )}
//   </div>
// );

    
// };

// export default Cart;
import { useEffect, useState } from "react";
import axios from "axios";
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

  // 🔥 PAYMENT FUNCTION ADDED
  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/create-order",
        { amount: total }
      );

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // replace with your key
        amount: data.amount,
        currency: data.currency,
        name: "My Store",
        description: "Order Payment",
        order_id: data.id,
        handler: function (response) {
          alert("Payment Successful ✅");
          console.log(response);
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
      alert("Payment Failed ❌");
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

          {/* 🔥 PAY NOW BUTTON ADDED */}
          <button
            className="pay-btn"
            onClick={handlePayment}
            style={{
              padding: "10px 20px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Pay Now
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;