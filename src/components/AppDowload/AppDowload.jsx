import React from 'react'
import "./AppDowload.css"
import { assets } from '../../assets/assets'

export default function AppDowload() {
  return (
    <div className='app-dowload' id='app-dowload'>
      <p>
        Download the <span>EatNow</span> today! <br />
        Order food anytime, anywhere with just one tap.
      </p>
      <div className="app-dowload-platfrom">
        <img src={assets.play_store} alt="Download on Play Store" />
        <img src={assets.app_store} alt="Download on App Store" />
      </div>
    </div>
  )
}
