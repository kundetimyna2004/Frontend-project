import "./Products.css";

const ProductCard = ({ item }) => {
  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img
          src={`http://localhost:5000/images/${item.pimg}`}
          alt={item.pname}
          className="product-img"
        />
      </div>

      <h3 className="product-title">{item.pname}</h3>
      <p className="product-id">ID: {item._id}</p>
      <h4 className="product-price">₹ {item.price}</h4>

      <button className="add-to-cart-btn">
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
