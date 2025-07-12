import React from 'react';
import { demoVideo } from '../assets';

const ScrollVideo = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden z-0">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={demoVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default ScrollVideo;
