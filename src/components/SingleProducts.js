import { react } from "react";
import "./SingleProducts.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SingleProducts = (props) => {
    const {isLoggedIn, setIsLoggedIn} = props;
    const {id} = useParams();
    const [products, setProducts] = useState([])
    const BASE_URL = 'https://thecatspawjamasbackend.onrender.com/api';




    async function fetchData() {
        try {
        // const response = await fetch(`http://localhost:1337/api/cats/${id}`,{
        const response = await fetch(`${BASE_URL}/cats/${id}`,{
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();
        
        setProducts(result);
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

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
        <div className="singleProducts">
            
            <div>
            {
                <div id="individualCatPage">
                    <div className="allCatInfo">
                        <p id="name">{products.name}</p>
                        <p className="catInfo">Breed: {products.breed}</p>
                        <img id="image"src={products.imageURL}/>
                        <p className="catInfo">Age: {products.age}</p>
                        <p className="catInfo">Temperament: {products.temperament}</p>
                        <p className="catInfo">{products.outdoor? <p>Outdoor Cat</p>: <p>Indoor Cat</p>}</p>
                        <p className="catInfo">Adoption Fee: ${products.adoptionFee}</p>
                        <Link id="cartLinkSingleCat" to="/cart" onClick={() => handleAddToCart(products)}>Add to Cart</Link>
                    </div>
                </div>    
            }
            </div>
        </div>
    )
}
export default SingleProducts;