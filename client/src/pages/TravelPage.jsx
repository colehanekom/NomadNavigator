import React from 'react';
import InteractiveMap from '../components/Map';

const TravelPage = () => {
  const experiences = [
    {
      title: 'Cape Town City Center',
      description: 'Exploring the vibrant city center',
      lat: -33.918861,
      lng: 18.423300,
    },
  ];

  return (
    <div>
      <h1>Travel Experiences</h1>
      <InteractiveMap experiences={experiences} />
    </div>
  );
};

export default TravelPage;
