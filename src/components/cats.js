import React, { useState, useEffect } from 'react';

const BASE_URL = `http://localhost:1337/api`;

const Cats = (props) => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cats`);
        const result = await response.json();
        setCats(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 id="catHeader">Adoptable Cats</h1>
      {cats.length > 0 && cats.map(cat => (
        <div key={cat.id}>
          <div id="catProfile">
            <h2>Cat: {cat.name}</h2>
          </div>
        </div>
      ))}
      {cats.length === 0 && <p>No cats found</p>}
    </div>
  );
};

export default Cats; 
