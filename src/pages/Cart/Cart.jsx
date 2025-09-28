import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
export default function Cart() {

  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext);

 const navigate=useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-tittle cart-items-item">
          <p>Items</p>
          <p>Title</p>
          <p>price</p>
          <p>contity</p>
          <p>total</p>
          <p>remove</p>

        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
           if(cartItems[item._id]>0){
            return (
             <>
              <div className="cart-items-item" >
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>$ {item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price*cartItems[item._id]}</p>
                <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
              </div>
              <hr />
             </>

            )
           }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="card-total-details">
              <p>subTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>Delevery fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <b>Total</b>
              <b>${ getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
            <button onClick={()=>navigate('/order')}>Procced to checkOut</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promocode inter here</p>
            <div className="cart-procode-inp">
              <input type="text" placeholder='promocode' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
