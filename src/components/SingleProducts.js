import { react } from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SingleProducts = (props) => {
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
        setProducts(result);
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        
    })
    


    //Don't know what singleProductsLink will link to yet
    return (
        <div className="singleProducts">
            
            <Link className="singleProductsLink" to="/"></Link>
            {

            }
        </div>
    )
}