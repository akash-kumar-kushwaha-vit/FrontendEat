import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
export default function MyOrders() {
const {url,token}=useContext(StoreContext);
const [data,setdata]=useState([]);

const fetchorder=async()=>{
  const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}});
  setdata(response.data.data);
  

}

useEffect(()=>{
if(token){
  fetchorder();
}
},[token])

  return (
    <div className='my-order'>
      <h2>myorders</h2>

      <div className="container">
        {data.map((order,index)=>{
          return(
            <div key={index} className="my-orders-order">
                 <img src={assets.parcel_icon} alt="" />
                 <p>{order.items.map((item,index)=>{
                    if(index===order.items.length-1){
                      return item.name+" x "+item.quantity
                    }else{
                      return item.name+" x "+item.quantity+"."
                    }
                 })}</p>
                 <p>${order.amount}.00</p>
                 <p>Items:{order.items.length}</p>
                 <p><span>&#x25cf;</span><b>{order.status}</b></p>
                 <button onClick={fetchorder}>Track order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
