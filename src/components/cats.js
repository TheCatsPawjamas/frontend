import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./cats.css"
import ReactPaginate from 'react-paginate'; 

const productOnPage = 4
// const BASE_URL = `http://localhost:1337/api`;
const BASE_URL = 'https://thecatspawjamasbackend.onrender.com/api';


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

function clickOnPage ({ selected: selectedPage }) {
  setCurrentPage(selectedPage);
}

const offset = currentPage * productOnPage;

const currentPageData = cats
  .slice(offset, offset + productOnPage)
  .map((cat) => (
    <div key={cat.id}>
      <div id="catProfile">
        <h2 id="catProfileHeader">{cat.name}</h2>
        <img id="catProfileImage" src={cat.imageURL}></img>
        <p className="catParagraph">{cat.name}'s Breed: {cat.breed}</p>
        <p className="catParagraph">Adoption Fee: ${cat.adoptionFee}</p>

        <Link id="SingleProductsLink" to={`/cats/${cat.id}`}>
          View {cat.name}'s details
        </Link>

        <Link id="cartLink" to="/cart" onClick={() => handleAddToCart(cat)}> 
          Add to Cart 
        </Link>
      </div>  
    </div>
));

const pageCount = Math.ceil(cats.length / productOnPage);

return (
  <div id="mainCatSection">
    <h1 id="catHeader">Adoptable Cats</h1>
    {currentPageData}

    <ReactPaginate id="pagination"
      previousLabel={"Previous"}
      nextLabel={"Next"}
      pageCount={pageCount}
      onPageChange={clickOnPage}
      containerClassName={"pagination-container"}
      previousLinkClassName={"previous-page"}
      nextLinkClassName={"next-page"}
      disabledClassName={"disabled-item"}
      activeClassName={"active-page"}
    />
    {cats.length === 0 && <div> No Cats Found </div>}
  </div>
)
}

export default Cats;
