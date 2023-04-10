import React, { useState } from "react"

const EditForm = (props) => {
  const [cat, setCat] = useState(props.cat);
  const [updatedCat, setUpdatedCat] = useState({});
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
    const [showEdit, setShowEdit] = useState(false);

  const handleEditCat = () => {
    setUpdatedCat({});
    setCat(props.cat);
    setShowEdit(!showEdit);
  };

  const handleUpdateField = (field, value) => {
    setUpdatedCat({ ...updatedCat, [field]: value });
    setCat({ ...cat, [field]: value });
    handleSave();
  };

  const handleSave = async () => {
    const response = await fetch(`http://localhost:1337/api/cats/${cat.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCat),
    });

    const updatedCat = await response.json();

    if (Object.keys(updatedCat).length) {
      setCat(updatedCat);
      props.onUpdateCat(updatedCat);
      setUpdatedCat({});
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  };

  return (
    <div>
      <div>
        <button className="button" onClick={handleEditCat}>Edit Cat</button>
  
        {showEdit ? (
        //   <form onSubmit={handleUpdate}>
        // <form onSubmit={handleSave}>
        <form onSubmit={handleUpdateField}>
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
        
    </div>
  );
}

export default EditForm;

