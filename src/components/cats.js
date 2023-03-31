import React, { useState, useEffect } from 'react';
// import "./cats.css"
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
    {cats.map(activity => (
      <div>
      <div id="catProfile" key={cats.id}>
        <h2>Cat: {cats.name}</h2>
      </div>
      </div>
      
    ))}
</div>
  );
};

export default Cats;