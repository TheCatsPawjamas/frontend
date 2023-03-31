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
            <h2>{cat.name}</h2>
            <img id="catImage" src={cat.imageURL}></img>
            <p>Breed: {cat.breed}</p>
            <p>Adoption Fee: {cat.adoptionFee}</p>

            {/* Link to go to single cat */}
            {/* <Link to={"/cats/" + cat.id} > View details </Link>
            <SingleCat catProps={cat}/> */}
            
          </div>
        </div>
      ))}
      {cats.length === 0 && <p>No cats found</p>}
    </div>
  );
};

export default Cats;
