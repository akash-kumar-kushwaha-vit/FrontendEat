import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

export default function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("menu");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className='navbar'>
      <Link to='/'> <img src={assets.logo} alt="" className='logo' /></Link>
      <ul className="navmenu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-dowload' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
      </ul>
      <div className="nav-right">
        <img src={assets.search_icon} alt="" />
        <div className="search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          :
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Order</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }

      </div>
    </div>
  )
}
