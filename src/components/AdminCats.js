import React, { useState, useEffect } from "react";
import "./AdminCats.css"

const AdminCats = () => {
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
    setShowForm(true);
  };

  const handleAllCatButtonClick = () => {
    setShowAllCats(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name,
        breed,
        age,
        temperament,
        outdoor,
        adoptionFee,
        imageURL,
      };
      const newCat = await createCat(formData);
      console.log("newCat:", newCat);
      setCats([...cats, newCat]);
      setName("");
      setBreed("");
      setAge(0);
      setTemperament("");
      setOutdoor(false);
      setAdoptionFee(0);
      setImageURL("");
    } catch (error) {
      console.error(error);
    }
  };
  

  const createCat = async (formData) => {
    const response = await fetch("http://localhost:1337/api/cats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const newCat = await response.json();
    return newCat;
  };

  const handleDelete = async (id) => {
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
  };

  const handleEdit = async (id) => {
    const catToEdit = cats.find((cat) => cat.id === id);
    setName(catToEdit.name);
    setBreed(catToEdit.breed);
    setAge(catToEdit.age);
    setTemperament(catToEdit.temperament);
    setOutdoor(catToEdit.outdoor);
    setAdoptionFee(catToEdit.adoptionFee);
    setImageURL(catToEdit.imageURL);
  };

  const updateCat = async (catId, formData) => {
    const response = await fetch(`http://localhost:1337/api/cats/${catId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  
    const updatedCat = await response.json();
    return updatedCat;
  };

  const deleteCat = async (id) => {
    const response = await fetch(`http://localhost:1337/api/cats/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  };
  return (
    <div>
      <button onClick={handleButtonClick}>Add Cat</button>
      {showForm ? (
        <form onSubmit={handleSubmit}>
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
       <button type="submit">Create Cat</button>
     </form>
        ) : null}
      <form onSubmit={handleSubmit}>
      </form>
        <button onClick={handleAllCatButtonClick}>Show All Cats</button>
        {showAllCats ? (
          <div>
          <h2>All Cats</h2>
          <ul>
            {cats.map((cat) => (
              <li key={cat.id}>
                <div>
                  <p>{cat.name}</p>
                </div>
                <button onClick={() => handleEdit(cat.id)}>Edit</button>
                <button onClick={() => handleDelete(cat.id)}>Delete</button>
              </li>
            ))}
          </ul>
          </div>
        ) : null }
    </div>
  );
}  

export default AdminCats;