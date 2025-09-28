import React, { useRef, useState, useEffect } from 'react'
import "./Header.css"
import {assets} from "../../assets/assets.js"
export default function Header() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [videoError, setVideoError] = useState(false);

    // Auto-play video on component mount
    useEffect(() => {
        const video = videoRef.current;
        
        const attemptPlay = async () => {
            try {
                await video.play();
                setIsPlaying(true);
                setVideoError(false);
            } catch (error) {
                console.log('Auto-play failed, trying muted play:', error);
                // If auto-play fails, try with muted video
                video.muted = true;
                setIsMuted(true);
                try {
                    await video.play();
                    setIsPlaying(true);
                    setVideoError(false);
                } catch (error2) {
                    console.log('Muted auto-play also failed:', error2);
                    setVideoError(true);
                }
            }
        };

        if (video) {
            video.addEventListener('loadeddata', attemptPlay);
            video.addEventListener('error', () => setVideoError(true));
            
            return () => {
                video.removeEventListener('loadeddata', attemptPlay);
                video.removeEventListener('error', () => setVideoError(true));
            };
        }
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(error => {
                    console.log('Play failed:', error);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className='header'>
            {/* Video Background - Always try to show video first */}
            <video
                ref={videoRef}
                className="header-video"
                muted={isMuted}
                loop
                playsInline
                preload="auto"
                autoPlay
            >
                <source src={assets.vedio} type="video/mp4" />
                <source src="/header-video.webm" type="video/webm" />
                {/* Fallback image only if video tag is not supported */}
                <img src="/header_img.png" alt="Restaurant Header" />
            </video>

            {/* Video Overlay */}
            <div className="header-video-overlay"></div>

            {/* Show fallback image only if video fails to load completely */}
            {videoError && (
                <div 
                    className="header-fallback"
                    style={{
                        background: 'url("/header_img.png") no-repeat center center',
                        backgroundSize: 'cover'
                    }}
                />
            )}

            {/* Video Controls */}
           

            {/* Header Content */}
            <div className="header-contents">
                <h2>Order your favourite food here</h2>
                <p>Choose from a wide variety of delicious dishes prepared with fresh ingredients and authentic flavors. Fast delivery guaranteed!</p>
                <button>View Menu</button>
            </div>
        </div>
    )
}