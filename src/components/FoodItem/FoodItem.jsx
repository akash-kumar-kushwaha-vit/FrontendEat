import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

export default function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const quantity = cartItems?.[id] || 0; // ✅ safe access

  return (
    <div className='food-item'>
      <div className="food-item-container">
        <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />
        {quantity === 0 ? (
          <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add" />
        ) : (
          <div className='food-item-counter'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
            <p>{quantity}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-discription">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}
