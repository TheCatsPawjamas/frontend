import React from "react"

const EditForm = (props) => {


return (
    <div>
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
    </div>
)
}

export default EditForm