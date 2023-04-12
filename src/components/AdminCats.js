import React, { useState, useEffect } from "react";
import {EditForm} from "./index"
import "./AdminCats.css"

const AdminCats = (props) => {
  const {isAdmin, setIsAdmin, currentUser, isLoggedIn, setIsLoggedIn} = props;
  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(0);
  const [temperament, setTemperament] = useState("");
  const [outdoor, setOutdoor] = useState(false);
  const [adoptionFee, setAdoptionFee] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showAllCats, setShowAllCats] = useState(false);
  

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/cats");
        const cats = await response.json();
        setCats(cats);
      } catch (error) {
        console.error(error);
      }
  };

  const handleButtonClick = () => {
    if (isAdmin == true){
    setShowForm(!showForm);
    } else alert ("Must be an admin to add a cat")
  };

  const handleAllCatButtonClick = () => {
    if (isAdmin == true){
    setShowAllCats(!showAllCats);
    } else alert("Must be an admin to see all cats")
  }
  
  const createCat = async (event) => {
    event.preventDefault();
    if (isAdmin == true){
      const response = await fetch("http://localhost:1337/api/cats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ 
            name: name,
            breed: breed,
            age: age,
            temperament: temperament,
            outdoor: outdoor,
            adoptionFee: adoptionFee,
            imageURL: imageURL
          }),
      });
      const newCat = await response.json();
      if (Object.keys(newCat).length) {
        // setCats([...cats, newCat]);
        setName("");
        setBreed("");
        setAge(0);
        setTemperament("");
        setOutdoor(false);
        setAdoptionFee(0);
        setImageURL("");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return newCat;
    } 
  };

  const handleDelete = async (id) => {
      try {
        const response = await fetch(`http://localhost:1337/api/cats/${id}`, {
          method: "DELETE",
        });
        setCats(cats.filter((cat) => cat.id !== id));
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div>
      <button className="button" onClick={handleButtonClick}>Add Cat</button>
      {showForm ? (
        <form onSubmit={createCat}>

          <div className="entry">
            <p className="labelName">Name:</p>
            <input type="text" className="entryBox" value={name} onChange={(event) => setName(event.target.value)} required />
          </div>

          <div className="entry">
            <p className="labelName">Breed:</p>
            <input type="text" className="entryBox" value={breed} onChange={(event) => setBreed(event.target.value)} required />
          </div>

          <div className="entry">
            <p className="labelName">Age:</p>
            <input type="number" className="entryBox" value={age} onChange={(event) => setAge(Number(event.target.value))} required />
          </div>

          <div className="entry">
            <p className="labelName">Temperament:</p>
            <input type="text" className="entryBox" value={temperament} onChange={(event) => setTemperament(event.target.value)} required />
          </div>

          <div className="entry">
            <p className="labelName">Outdoor:</p>
            <input type="checkbox" className="checkbox" checked={outdoor} onChange={(event) => setOutdoor(event.target.checked)} />
          </div>

          <div className="entry">
            <p className="labelName">Adoption Fee:</p>
            <input type="number" className="entryBox" value={adoptionFee} onChange={(event) => setAdoptionFee(Number(event.target.value))} required />
          </div>

          <div className="entry">
            <p className="labelName">Image URL:</p>
            <input type="text" className="entryBox" value={imageURL} onChange={(event) => setImageURL(event.target.value)} required />
          </div>

          <button className="button" type="submit">Create Cat</button>

     </form>
        ) : null}

        <button className="button" onClick={handleAllCatButtonClick}>Show All Cats</button>
        {showAllCats ? (

          <div>
          <h2>All Cats</h2>
          <ul>
            {cats.map((cat) => (
              <li key={cat.id}>
                <div id="nameAndImage">
                  <img id="catImage" src={cat.imageURL} />
                  <p id="catName">{cat.name}</p>
                </div>
                < EditForm cat={cat}/>
                <button className="button" onClick={() => handleDelete(cat.id)}>Delete</button>
              </li>
            ))}
          </ul>
          </div>

        ) : null }
    </div>
  );
}  

export default AdminCats;