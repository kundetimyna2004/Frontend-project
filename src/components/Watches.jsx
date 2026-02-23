import axios from "axios";
import { useEffect, useState } from "react";
import "./Products.css";
import { addToCart } from "../utils/cart";
import { FaCartPlus } from "react-icons/fa";


const Watches = () => {
  const [watches, setWatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/watches"
        );
        setWatches(data);
      } catch (error) {
        console.log("Watch Error:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="product-container">
      {watches.map((item) => (
        <div className="card" key={item._id}>
          <img
            src={item.pimg}
            alt={item.pname}
            className="product-image"
          />

          <h3>{item.pname}</h3>
          <p>ID: {item.pid}</p>
          <p>₹ {item.pcost}</p>

          <button
            className="add-btn"
            onClick={() => {
              addToCart({
                id: item._id,
                name: item.pname,
                price: item.pcost,
                image: item.pimg,
                quantity: 1,
              });
              alert("Added to cart ✅");
            }}
          >
            <FaCartPlus style={{ marginRight: "6px" }} />
            Add To Cart
          </button>

          <p>Stock Available: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default Watches;
