import React, { useState, useEffect } from "react";
import "./AdminUsers.css"

const AdminUsers = (props) => {
    const { isAdmin, setIsAdmin, currentUser } = props
    const [ users, setUsers ]  = useState([])
    // const [ username, setUsername ] = useState("")
    const [ name, setName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ email, setEmail ] = useState ("") 
    const [ admin, setAdmin ] = useState(false)



    // useEffect (() => {
    //     getAllUsers();
    // }, [])

    const getAllUsers = async () => {
        try {
            const response = await fetch ("http://localhost:1337/api/users/admin", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                // http://localhost:1337/api/users NO
                // http://localhost:1337/api/admin/users NO
                // http://localhost:1337/api/users/admin NO
                // http://localhost:1337/api/admin/user NO
            });

            const users = await response.json()
            console.log(users)
            setUsers(users)
        } catch (error) {
            console.log(error)
        }
    }



    const deleteUser = async (id) => {

        try {
            const response = await fetch (`http://localhost:1337/api/users/admin/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            }) 
        } catch (error) {
            console.log(error)
        }
    }


    const updateUser = async (userId) => {
        try {
            const response = await fetch (`http://localhost:1337/api/admin/users/admin/${userId}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    password: password, 
                    email: email, 
                    admin: (false),
                })
            })

            const updatedUser = await response.json()

            return updatedUser
        } catch (error) {
            console.log( error)
        }
    }

    const createUser = async () => {
        try {
            const response = await fetch (`http://localhost:1337/api/users/admin`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify ({
                    name: name,
                    password: password, 
                    email: email, 
                    admin: (false),
                })
            })
            const newUser = await response.json()
            
            if (Object.keys(newUser).length) {
                setUsers([...users, newUser])
                // setNewUserName("")
                // setNewUserPassword("")
                // setNewUserEmail("")
            }



            return newUser
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <section> 

        {/* GET ALL USERS LIST */}
        {/* DELETE USER */}
        <button onClick={getAllUsers}> Show All Users </button>
        <h2> All Users </h2>
        <ul>
            {
                users.map((user) => (
                <li key={user.id}>
                    {user.username} 
                </li>
                ))
            }
        <button onClick={() => deleteUser(users.id)}>Delete</button>

        </ul>
        


        {/* UPDATE A USER  */}
        <form id="updateUserForm">
            <button onClick={updateUser}> Update Users </button>
            {/* <button onClick={() => updateUser(user.id)}>Update</button> */}
            <h2> Update User</h2>
            <label> 
                Username: 
                <input
                type="text"
                placeholder="New Username"
                value = {name}
                onChange = {(event) => setName(event.target.value)}
                />
            </label>
            <label>
                Password: 
                <input
                    type="text"
                    placeholder="New Password"
                    value = {password}
                    onChange = {(event) => setPassword(event.target.value)}
                />
            </label>
            <label>
                Email: 
                <input
                    type="text"
                    placeholder="New Email"
                    value = {email}
                    onChange = {(event) => setEmail(event.target.value)}
                />
            </label>
        </form>



        {/* CREATE A USER */}
        <form id="createUserForm" onSubmit={createUser}>
            <h2>Create a User</h2>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </label>
            <button type="submit">Create User</button>
        </form>


        
        
      </section>
    )

}

export default AdminUsers