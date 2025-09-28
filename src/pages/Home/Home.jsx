import React, { use, useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header.jsx';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx';
import AppDowload from '../../components/AppDowload/AppDowload.jsx';
export default function Home() {
  const [category,setCategory]=useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}/>
      <AppDowload />
    </div>
  )
}
