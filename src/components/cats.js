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

  const handleAddToCart = (cat) => {
    props.addItemToCart({
      id: cat.id,
      name: cat.name,
      price: cat.adoptionFee,
      quantity: 1,

      image: cat.imageURL

    });
  };

  return (
    <div>
      <h1 id="catHeader">Adoptable Cats</h1>
      <input className="searchbar" type="text" value={search} onChange={handleSearchChange} />
      {cats.length > 0 && cats.map(cat => (
        <div key={cat.id}>
          <div id="catProfile">
            <h2>{cat.name}</h2>
            <img id="catImage" src={cat.imageURL}></img>
            <p>{cat.name}'s Breed: {cat.breed}</p>
            <p>Adoption Fee: ${cat.adoptionFee}</p>
            <Link id="SingleProductsLink" to={`/cats/${cat.id}`}>View {cat.name}'s details</Link>
            <Link id="cartLink" to="/cart" onClick={() => handleAddToCart(cat)}>Add to Cart</Link>
          </div>
        </div>
      ))}
      {cats.length === 0 && <p>No cats found</p>}
    </div>
  );
};

export default Cats;


