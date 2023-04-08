import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./cats.css"
import ReactPaginate from 'react-paginate'; 

const PER_PAGE = 2
const BASE_URL = `http://localhost:1337/api`;

const Cats = (props) => {
const [currentPage, setCurrentPage] = useState([]);
const [cats, setCats] = useState([]);
const [search, setSearch] = useState('');


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
},[]);

const handleSearchChange = (event) => {
  setSearch(event.target.value);
};

const handleAddToCart = (cat) => {
    props.addItemToCart({
    catId: cat.id,
    name: cat.name,
    adoptionFee: cat.adoptionFee,
    imageURL: cat.imageURL
});
};

function handlePageOnClick({ selected: selectedPage }) {
  setCurrentPage(selectedPage);
}

const offset = currentPage * PER_PAGE;

const currentPageData = cats
  .slice(offset, offset + PER_PAGE)
  .map((cat) => (
    <div key={cat.id}>
      <div id="catProfile">
        <h2>{cat.name}</h2>
        <img id="catImage" src={cat.imageURL}></img>
        <p>{cat.name}'s Breed: {cat.breed}</p>
        <p>Adoption Fee: ${cat.adoptionFee}</p>

        <Link id="SingleProductsLink" to={`/cats/${cat.id}`}>
          View {cat.name}'s details
        </Link>

        <Link id="cartLink" to="/cart" onClick={() => handleAddToCart(cat)}> 
          Add to Cart 
        </Link>
      </div>  
    </div>
));

const pageCount = Math.ceil(cats.length / PER_PAGE);

return (
  <div>
    <h1 id="catHeader">Adoptable Cats</h1>
    <input className="searchbar" type="text" onChange={handleSearchChange} />
    {currentPageData}

    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      pageCount={pageCount}
      onPageChange={handlePageOnClick}
      containerClassName={"pagination"}
      previousLinkClassName={"paginationLink"}
      nextLinkClassName={"paginationLink"}
      disabledClassName={"disabledPaginationLink"}
      activeClassName={"activePaginationLink"}
    />
    {cats.length === 0 && <div> No Cats Found </div>}
  </div>
)
}



export default Cats;



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import "./cats.css"

// const BASE_URL = `http://localhost:1337/api`;

// const Cats = (props) => {
// const [cats, setCats] = useState([]);
// const [search, setSearch] = useState('');

// useEffect(() => {
// const fetchData = async () => {
// try {
// const response = await fetch(`${BASE_URL}/cats?q=${search}`);
// const result = await response.json();
// setCats(result);
// } catch (error) {
// console.error(error);
// }
// };
// fetchData();
// }, [search]);

// const handleSearchChange = (event) => {
// setSearch(event.target.value);
// };

// const handleAddCartItem = async (catId, adoptionFee) => {
// try {
// const response = await fetch('http://localhost:1337/api/users/orders/' + orderId + '/cats', {
// method: 'POST',
// headers: {
// 'Content-Type': 'application/json'
// },
// body: JSON.stringify({
// catId: catId,
// adoptionFee: adoptionFee
// })
// });
// const newItem = await response.json();
// setCartItems([...cartItems, newItem]);
// setTotalPrice(totalPrice + newItem.adoptionFee);
// } catch (error) {
// setCartError(error.message);
// }
// };


// return (
// <div>
// <h1 id="catHeader">Adoptable Cats</h1>
// <input className="searchbar" type="text" value={search} onChange={handleSearchChange} />
// {cats.length > 0 && cats.map(cat => (
// <div key={cat.id}>
// <div id="catProfile">
// <h2>{cat.name}</h2>
// <img id="catImage" src={cat.imageURL}></img>
// <p>{cat.name}'s Breed: {cat.breed}</p>
// <p>Adoption Fee: ${cat.adoptionFee}</p>
// <Link id="SingleProductsLink" to={`/cats/${cat.id}`}>View {cat.name}'s details</Link>
// <Link id="cartLink" to="/cart" onClick={() => handleAddToCart(cat)}>Add to Cart</Link>
// </div>
// </div>
// ))}
// {cats.length === 0 && <p>No cats found</p>}
// </div>
// );
// };

// export default Cats;


