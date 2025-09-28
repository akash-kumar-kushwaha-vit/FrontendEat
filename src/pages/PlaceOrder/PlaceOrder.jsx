import React, { useContext, useEffect, useState } from 'react';
import './PlaceOder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "", lastName: "", email: "", street: "",
    city: "", state: "", zipcode: "", country: "", phone: ""
  });

  const onChangeHandler = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (getTotalCartAmount() === 0) { alert("Cart empty!"); return; }

    const orderItem = food_list.filter(item => cartItems[item._id] > 0)
                               .map(item => ({ ...item, quantity: cartItems[item._id] }));

    const orderData = {
      address: data,
      items: orderItem,
      amount: getTotalCartAmount() + 2,
      userId: localStorage.getItem('userId') || 'user123'
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

      if (!response.data.success) {
        alert("Order failed: " + (response.data.message || ""));
        return;
      }

      const scriptLoaded = await loadRazorpay();
      if (!scriptLoaded) { alert("Razorpay SDK failed to load"); return; }

      const options = {
        key: response.data.key,
        amount: response.data.amount,
        currency: response.data.currency,
        name: "Food Delivery",
        description: "Order Payment",
        order_id: response.data.order_id,
        handler: async function (razorpayResponse) {
          try {
            const verifyRes = await axios.post(url + "/api/order/verify", {
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_signature: razorpayResponse.razorpay_signature,
              orderDbId: response.data.orderDbId
            });

            if (verifyRes.data.success) {
              alert("✅ Payment successful!");
              navigate("/order-success");
            } else {
              alert("❌ Payment failed. Order deleted.");
              navigate("/cart");
            }
          } catch (err) {
            console.error(err);
            alert("Verification error, please try again.");
            navigate("/cart");
          }
        },
        prefill: {
          name: data.firstName + " " + data.lastName,
          email: data.email,
          contact: data.phone
        },
        theme: { color: "#3399cc" },
        modal: { ondismiss: () => alert("Payment cancelled") }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Error placing order: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) navigate('/cart');
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder="First name" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder="Last name" />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} placeholder="Email" />
        <input required name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={data.state} placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder="Zip code" />
          <input required name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>₹{getTotalCartAmount()*80}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery fee</p><p>₹{getTotalCartAmount()*80=== 0 ? 0 : 2*80}</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()*80+ 2*80}</b></div>
          </div>
          <button type="submit" disabled={getTotalCartAmount() === 0}>
            {getTotalCartAmount() === 0 ? 'Cart is Empty' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </form>
  );
}
