import React, { useState } from 'react';

function InputLocation({ onLocationSubmit }) {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLocationSubmit(location);
    setLocation(''); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city name"
      />
      <button type="submit">View Current Weather</button>
    </form>
  );
}

export default InputLocation;