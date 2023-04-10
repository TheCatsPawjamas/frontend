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
  const [editingCatId, setEditingCatId] = useState("")
  const [showForm, setShowForm] = useState(false);
  const [showAllCats, setShowAllCats] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/cats");
        if (!response.ok) {
          throw new Error("Failed to fetch cats");
        }
        const cats = await response.json();
        setCats(cats);
      } catch (error) {
        console.error(error);
      }
  };

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleAllCatButtonClick = () => {
    if (isAdmin == true){
    setShowAllCats(!showAllCats);
    } else alert("Must be an admin to see all cats")
  }

  const handleEditCat =() => {
    setShowEdit(!showEdit);
  }
  

  const createCat = async (e) => {
    e.preventDefault();
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
        // const errorData = await response.json();
        // throw new Error(errorData.message);
        setCats([...cats, newCat]);
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
      // const newCat = await response.json();
      return newCat;
    } else {
      alert ("Must be an admin to add a cat")
    }
  };

  const handleDelete = async (id) => {
    // if (isAdmin == true){
      try {
        const response = await fetch(`http://localhost:1337/api/cats/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete cat");
        }
        setCats(cats.filter((cat) => cat.id !== id));
      } catch (error) {
        console.error(error);
      }
    // }
  };

  // const handleEdit = async (id) => {
  //   const catToEdit = cats.find((cat) => cat.id === id);
   
  //   setName(catToEdit.name);
  //   setBreed(catToEdit.breed);
  //   setAge(catToEdit.age);
  //   setTemperament(catToEdit.temperament);
  //   setOutdoor(catToEdit.outdoor);
  //   setAdoptionFee(catToEdit.adoptionFee);
  //   setImageURL(catToEdit.imageURL);
  //   // updateCat(id)
  // };

  // const handleEdit = async (catId, e) => {
  //   e.preventDefault();
  //   await updateCat(
  //     catId,
  //     name,
  //     breed,
  //     age,
  //     temperament,
  //     outdoor,
  //     adoptionFee,
  //     imageURL
  //   );
  // };
  

  // async function updateCat(catId, name, breed, age, temperament, outdoor, adoptionFee, imageURL) {
  //   const response = await fetch(`http://localhost:1337/api/cats/${catId}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name,
  //       breed,
  //       age,
  //       temperament,
  //       outdoor,
  //       adoptionFee,
  //       imageURL,
  //     }),
  //   });
  
  //   const updatedCat = await response.json();
  
  //   if (Object.keys(updatedCat).length) {
  //     const updatedCats = cats.map((cat) =>
  //       cat.id === catId
  //         ? {
  //             ...cat,
  //             name,
  //             breed,
  //             age,
  //             temperament,
  //             outdoor,
  //             adoptionFee,
  //             imageURL,
  //           }
  //         : cat
  //     );
  //     setCats(updatedCats);
  //     setEditingCatId("");
  //   } else {
  //     const errorData = await response.json();
  //     throw new Error(errorData.message);
  //   }
  // }
  

  const handleEdit = (catId) => {
    // event.preventDefault();
    updateCat(catId);
  };

  // const updateCat = async (catId, e) => {
    async function updateCat(catId) {
      // event.preventDefault();
      const response = await fetch(`http://localhost:1337/api/cats/${catId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({
            name: name,
            breed: breed,
            age: age,
            temperament: temperament,
            outdoor: outdoor,
            adoptionFee: adoptionFee,
            imageURL: imageURL
          }
        ),
      });
    
      const updatedCat = await response.json();

      if (Object.keys(updatedCat).length) {
         
          const updatedCats = cats.map((cat) =>
            cat.id === catId
              ? {
                  ...cat,
                  name: name,
                  breed: breed,
                  age: age,
                  temperament: temperament,
                  outdoor: outdoor,
                  adoptionFee: adoptionFee,
                  imageURL: imageURL,
                }
              : cat
          );
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
      return updatedCat;
     
  
  };
  

  return (
    <div>
      <button className="button" onClick={handleButtonClick}>Add Cat</button>
      {showForm ? (
        <form onSubmit={createCat}>
          <div className="entry">
            <label className="labelName" htmlFor="name">Name:</label>
            <input type="text" className="entryBox" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="entry">
            <label className="labelName" htmlFor="breed">Breed:</label>
            <input type="text" className="entryBox" value={breed} onChange={(e) => setBreed(e.target.value)} required />
          </div>
          <div className="entry">
            <label className="labelName" htmlFor="age">Age:</label>
            <input type="number" className="entryBox" value={age} onChange={(e) => setAge(Number(e.target.value))} required />
          </div>
          <div className="entry">
            <label className="labelName" htmlFor="temperament">Temperament:</label>
            <input type="text" className="entryBox" value={temperament} onChange={(e) => setTemperament(e.target.value)} required />
          </div>
          <div className="entry">
            <label className="labelName" htmlFor="outdoor">Outdoor:</label>
            <input type="checkbox" className="checkbox" checked={outdoor} onChange={(e) => setOutdoor(e.target.checked)} />
          </div>
          <div className="entry">
            <label className="labelName" htmlFor="adoptionFee">Adoption Fee:</label>
            <input type="number" className="entryBox" value={adoptionFee} onChange={(e) => setAdoptionFee(Number(e.target.value))} required />
          </div>
          <div className="entry">
            <label className="labelName" htmlFor="imageURL">Image URL:</label>
            <input type="text" className="entryBox" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />
          </div>
          <button className="button" type="submit">Create Cat</button>
     </form>
        ) : null}

     {/* <button onClick={handleEditCat}>Edit Cat</button>
                      {showEdit ? (
                        <form onSubmit={updateCat}>
                          <div>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                          </div>
                          <div>
                            <label htmlFor="breed">Breed:</label>
                            <input type="text" id="breed" value={breed} onChange={(e) => setBreed(e.target.value)} required />
                          </div>
                          <div>
                            <label htmlFor="age">Age:</label>
                            <input type="number" id="age" value={age} onChange={(e) => setAge(Number(e.target.value))} required />
                          </div>
                          <div>
                            <label htmlFor="temperament">Temperament:</label>
                            <input type="text" id="temperament" value={temperament} onChange={(e) => setTemperament(e.target.value)} required />
                          </div>
                          <div>
                            <label htmlFor="outdoor">Outdoor:</label>
                            <input type="checkbox" id="outdoor" checked={outdoor} onChange={(e) => setOutdoor(e.target.checked)} />
                          </div>
                          <div>
                            <label htmlFor="adoptionFee">Adoption Fee:</label>
                            <input type="number" id="adoptionFee" value={adoptionFee} onChange={(e) => setAdoptionFee(Number(e.target.value))} required />
                          </div>
                          <div>
                            <label htmlFor="imageURL">Image URL:</label>
                            <input type="text" id="imageURL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />
                          </div>
                          <button type="submit">Edit Cat</button>
                    </form>
                        ) : null} */}

        <button className="button" onClick={handleAllCatButtonClick}>Show All Cats</button>
        {showAllCats ? (
          <div>
          <h2>All Cats</h2>
          <ul>
            {cats.map((cat) => (
              <li key={cat.id}>
                < EditForm />
                <div id="nameAndImage">
                  <img id="catImage" src={cat.imageURL} />
                  <p id="catName">{cat.name}</p>
                </div>
            
                <div>
                  
                {/* <button onClick={() => handleEdit(cat.id)}>Edit</button> */}
                <button className="button" onClick={handleEditCat}>Edit Cat</button>

                      {showEdit ? (
                        <form onSubmit={updateCat}>
                          <div className="entry">
                            <label className="labelName" htmlFor="name">Name:</label>
                            <input type="text" className="entryBox" value={name} onChange={(e) => setName(e.target.value)} required />
                          </div>
                          <div className="entry">
                            <label className="labelName" htmlFor="breed">Breed:</label>
                            <input type="text" className="entryBox" value={breed} onChange={(e) => setBreed(e.target.value)} required />
                          </div>
                          <div className="entry">
                            <label className="labelName" htmlFor="age">Age:</label>
                            <input type="number" className="entryBox" value={age} onChange={(e) => setAge(Number(e.target.value))} required />
                          </div>
                          <div className="entry">
                            <label className="labelName" htmlFor="temperament">Temperament:</label>
                            <input type="text" className="entryBox" value={temperament} onChange={(e) => setTemperament(e.target.value)} required />
                          </div>
                          <div className="entry">
                            <label className="labelName" htmlFor="outdoor">Outdoor:</label>
                            <input type="checkbox" className="checkbox" checked={outdoor} onChange={(e) => setOutdoor(e.target.checked)} />
                          </div>
                          <div className="entry">
                            <label className="labelName" htmlFor="adoptionFee">Adoption Fee:</label>
                            <input type="number" className="entryBox" value={adoptionFee} onChange={(e) => setAdoptionFee(Number(e.target.value))} required />
                          </div>
                          <div className="entry">
                            <label className="labelName" htmlFor="imageURL">Image URL:</label>
                            <input type="text" className="entryBox" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />
                          </div>
                          <button className="button" type="submit">Update Cat</button>
                    </form>
                        ) : null}
                      
                </div>

                {/* <button onClick={(event) => handleEdit(cat.id, event)}>Edit</button> */}

                <button id="deleteButton" className="button" onClick={() => handleDelete(cat.id)}>Delete</button>
              </li>
            )
            
            )}
          </ul>
          </div>
        ) : null }
    </div>
  );
}  

export default AdminCats;