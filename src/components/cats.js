import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./cats.css"

const BASE_URL = `http://localhost:1337/api`;

const Cats = (props) => {
  const [cats, setCats] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cats?q=${search}`);
        const result = await response.json();
        setCats(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1 id="catHeader">Adoptable Cats</h1>
      <input type="text" value={search} onChange={handleSearchChange} />
      {cats.length > 0 && cats.map(cat => (
        <div key={cat.id}>
          <div id="catProfile">
            <h2>{cat.name}</h2>
            <img id="catImage" src={cat.imageURL}></img>
            <p>Breed: {cat.breed}</p>
            <p>Adoption Fee: {cat.adoptionFee}</p>
            <Link to={`/cats/${cat.id}`}>View {cat.name}'s details</Link>
          </div>
        </div>
      ))}
      {cats.length === 0 && <p>No cats found</p>}
    </div>
  );
};

export default Cats;
