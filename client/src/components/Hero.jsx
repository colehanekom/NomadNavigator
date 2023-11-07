import React from 'react';
import Arial from '../assets/arialviewcape.png';

function Hero () {
  return (
 <div className='w-full h-[98vh]'>
<img src={Arial} alt="Image" className='w-full h-screen object-cover' />
<div className='max-w-[1140px] m-auto'>
  <div className='absolute top-[20%] w-full md:-[50%] max-w-[600px] h-100 flex flex-col text-white p-4 backdrop-blur-sm'>
    <h1 className='font-bold text-4xl mb-4'>
      Discover New Destinations and Connect with Like-Minded Travelers
    </h1>
    <p>
      The Nomad Navigator app allows you to explore unique traveling experiences and connect with a vibrant community
      of travelers all around Cape Town. Discover new destinations, share your own travel stories, and connect with
      like-minded individuals who share your passion for exploration.
    </p>
    <button className='mt-4 px-4 py-2 border bg-[#1065A1] rounded-full text-white w-52 hover:scale-105'>
      Share Your Story
    </button>
  </div>
</div>
</div> 
  );
};

export default Hero;
