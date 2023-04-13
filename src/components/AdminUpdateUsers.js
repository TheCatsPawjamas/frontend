import {useState} from "react"
import "./AdminUpdateUsers.css"
const AdminUpdateUsers = (props) => {
    const { isAdmin, setIsAdmin, user, users, setUsers } = props
    const [ updateForm, setUpdateForm ] = useState (false)
    const [ updatedUser, setUpdatedUser] = useState({})
    const [ name, setName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ email, setEmail ] = useState ("") 
    
const updateUserForm = () => {
    setUpdateForm(!updateForm)
}



    const updateUser = async (event) => {
        event.preventDefault();
        try {
            // const response = await fetch (`http://localhost:1337/api/users/admin/${user.id}`, {
                const response = await fetch (`https://thecatspawjamasbackend.onrender.com/api/users/admin/${user.id}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    username: name,
                    email: email, 
                    admin: false,
                })
            })

            const updatedUserResponse = await response.json()

            const updatedListOfUsers = users.filter ((singleUser) =>{
                if (updatedUserResponse.id == singleUser.id) {
                    return false
                } else {
                    return true
                }
            })


            setUsers([...updatedListOfUsers, updatedUserResponse])

            setUpdatedUser(updatedUserResponse)
        } catch (error) {
            console.log( error)
        }
    }

    return (
        <section id="updateUserSection"> 
            <button id="editUserButton" onClick={updateUserForm}> Edit User </button>

            {updateForm ? (
            <form id="updateUserForm" onSubmit={updateUser}>
                
                <h3 id="upadateHeader"> Update User</h3>
                <label className="usersLabel"> 
                    Username: 
                    <input className="userBox"
                    type="text"
                    placeholder="New Username"
                    value = {name}
                    onChange = {(event) => setName(event.target.value)}
                    />
                </label>
                <label className="usersLabel">
                    Email: 
                    <input className="userBox"
                        type="text"
                        placeholder="New Email"
                        value = {email}
                        onChange = {(event) => setEmail(event.target.value)}
                    />
                </label>
                <button id="updateUserButton" type="submit" > Update User </button>

            </form>
        ): null }
        </section>
    )
}

export default AdminUpdateUsers