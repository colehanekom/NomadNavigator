import React from 'react';
import InteractiveMap from '../components/Map';
import BottomBar from '../components/BottomBar';

const TravelPage = () => {
  const experiences = [
    {
      title: 'Cape Town City Center',
      description: 'Exploring the vibrant city center',
      lat: -33.918861,
      lng: 18.423300,
    },
    {
        title: 'Table Mountain Hike',
        description: 'Breathtaking views from the top of Table Mountain',
        lat: -33.9625,
        lng: 18.4039,
      },
      {
        title: 'Robben Island Tour',
        description: 'Visiting the historic Robben Island',
        lat: -33.8075,
        lng: 18.3666,
      },
      {
        title: 'Camps Bay Beach Day',
        description: 'Relaxing on the sandy beaches of Camps Bay',
        lat: -33.9518,
        lng: 18.3783,
      },
      {
        title: 'V&A Waterfront Shopping',
        description: 'Exploring shops and restaurants at the V&A Waterfront',
        lat: -33.9187,
        lng: 18.4233,
      },
  ];

  return (
    <div>
      <h1>Travel Experiences</h1>
      <InteractiveMap experiences={experiences} />

       {/* BottomBar for mobile */}
       <div className="bottom-bar-mobile">
        <BottomBar />
      </div>
    </div>
  );
};

export default TravelPage;
