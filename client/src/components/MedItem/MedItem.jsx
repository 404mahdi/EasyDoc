import React, { useContext } from "react";
import "./MedItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const MedItem = ({ id, name, price, mg, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  
  // Debug logs
  console.log("MedItem rendering for:", id, name);
  console.log("Current cartItems:", cartItems);
  console.log("Item in cart:", cartItems[id]);
  
  const handleAddToCart = () => {
    console.log("Adding to cart:", id);
    addToCart(id);
  };
  
  const handleRemoveFromCart = () => {
    console.log("Removing from cart:", id);
    removeFromCart(id);
  };
    
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={url+"/images/"+image} alt="" className="food-item-image" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={handleAddToCart}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img 
              onClick={handleRemoveFromCart} 
              src={assets.remove_icon_red} 
              alt="" 
            />
            <p>{cartItems[id]}</p>
            <img 
              onClick={handleAddToCart} 
              src={assets.add_icon_green} 
              alt="" 
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="food-item-desc">{mg}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default MedItem;
