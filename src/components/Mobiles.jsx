import axios from "axios";
import { useEffect, useState } from "react";
import "./Products.css";
import { addToCart } from "../utils/cart";
import { FaCartPlus } from "react-icons/fa";


const Mobiles = () => {
  const [ mobiles, setMobiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/mobiles"
        );

        setMobiles(data);
      } catch (error) {
        console.log(" Mobiles Error:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="product-container">
      { mobiles.map((item) => (
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
                _id: item._id,
                name: item.pname,
                price: item.pcost,
                image: item.pimg,
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

export default  Mobiles;
