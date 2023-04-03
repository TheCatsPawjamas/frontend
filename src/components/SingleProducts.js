import { react } from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SingleProducts = (props) => {
    const {isLoggedIn, setIsLoggedIn} = props;
    const {id} = useParams();
    const [products, setProducts] = useState([])


    async function fetchData() {
        try {
        const response = await fetch(`http://localhost:1337/api/cats/${id}`,{
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();
        console.log(result);
        setProducts(result);
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <div className="singleProducts">
            
            <div>
            {
                <div>
                    <p>Name: {products.name}</p>
                    <p>Breed: {products.breed}</p>
                    <img src={products.imageURL}/>
                    <p>Age: {products.age}</p>
                    <p>Temperament: {products.temperament}</p>
                    <p>{products.outdoor? <p>Outdoor Cat</p>: <p>Indoor Cat</p>}</p>
                    <p>Adoption Fee: ${products.adoptionFee}</p>
                    
                </div>    
            }
            </div>
        </div>
    )
}
export default SingleProducts;