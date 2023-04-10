import React, { useState } from "react"

const EditForm = (props) => {

const [cat, setCat] = useState(props.cat);
const [updatedCat, setUpdatedCat] = useState({});
const [name, setName] = useState("");
const [breed, setBreed] = useState("");
const [age, setAge] = useState(0);
const [temperament, setTemperament] = useState("");
const [outdoor, setOutdoor] = useState(false);
const [adoptionFee, setAdoptionFee] = useState(0);
const [imageURL, setImageURL] = useState("");
const [showEdit, setShowEdit] = useState(false);

const handleEditCat = () => {
    // setUpdatedCat({});
    setCat(props.cat);
    setShowEdit(!showEdit);
};

const handleSave = async (event) => {
    event.preventDefault();
    try {
    const response = await fetch(`http://localhost:1337/api/cats/${cat.id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
        })
    })

    const updatedCat = await response.json();

    console.log(updatedCat)
    } catch (error) {
        console.log(error)
    }
};


  return (
    <div>
      <div>
        <button className="button" onClick={handleEditCat}>Edit Cat</button>
  
        {showEdit ? (
        <form onSubmit={handleSave}>

            <div className="entry">
              <p className="labelName">Name:</p>
              <input type="text" defaultValue={cat.name} className="entryBox" onChange={(event) => setName(event.target.value)}/>
            </div>

            <div className="entry">
              <p className="labelName">Breed:</p>
              <input type="text" defaultValue={cat.breed} className="entryBox" onChange={(event) => setBreed(event.target.value)}/>
            </div>

            <div className="entry">
              <p className="labelName">Age:</p>
              <input type="number" defaultValue={cat.age} className="entryBox" onChange={(event) => setAge(Number(event.target.value))}/>
            </div>

            <div className="entry">
              <p className="labelName">Temperament:</p>
              <input type="text" defaultValue={cat.temperament} className="entryBox" onChange={(event) => setTemperament(event.target.value)}/>
            </div>

            <div className="entry">
              <p className="labelName">Outdoor:</p>
              <input type="checkbox" className="checkbox" checked={outdoor} onChange={(event) => setOutdoor(event.target.checked)}/>
            </div>

            <div className="entry">
              <p className="labelName">Adoption Fee:</p>
              <input type="number" defaultValue={cat.adoptionFee} className="entryBox" onChange={(event) => setAdoptionFee(Number(event.target.value))}/>
            </div>

            <div className="entry">
              <p className="labelName">Image URL:</p>
              <input type="text" defaultValue={cat.imageURL} className="entryBox" onChange={(event) => setImageURL(event.target.value)}/>
            </div>

            <button className="button" type="submit">Update Cat</button>

          </form>
        ) : null}
      </div>
        
    </div>
  );
}

export default EditForm; 

