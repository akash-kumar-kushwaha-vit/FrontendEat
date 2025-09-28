import React, { useRef } from 'react'
import "./ExploreMenu.css";
import { menu_list } from '../../assets/assets';

export default function ExploreMenu({category, setCategory}) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
        }
    };

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes</p>
            
            <div className="explore-menu-scroll-container">
                <button 
                    className="scroll-button left" 
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    ←
                </button>
                
                <div className="explore-menu-list" ref={scrollRef}>
                    {menu_list.map((item, index) => (
                        <div 
                            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
                            key={index} 
                            className="explore-menu-list-item"
                            tabIndex={0}
                            role="button"
                            aria-pressed={category === item.menu_name}
                            onKeyPress={(e) => e.key === 'Enter' && setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                        >
                            <img 
                                className={category === item.menu_name ? "active" : ""} 
                                src={item.menu_image} 
                                alt={item.menu_name} 
                            />
                            <p>{item.menu_name}</p>
                        </div>
                    ))}
                </div>
                
                <button 
                    className="scroll-button right" 
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    →
                </button>
            </div>
            
            <hr />
        </div>
    )
}