export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const addToCart = (product) => {
  const cart = getCart();
  const existing = cart.find((item) => item._id === product._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const removeFromCart = (id) => {
  const updated = getCart().filter((item) => item._id !== id);
  localStorage.setItem("cart", JSON.stringify(updated));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const updateQuantity = (id, type) => {
  const cart = getCart();
  const item = cart.find((i) => i._id === id);

  if (item) {
    if (type === "inc") item.quantity += 1;
    if (type === "dec" && item.quantity > 1) item.quantity -= 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};
