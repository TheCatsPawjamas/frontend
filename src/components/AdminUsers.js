import React, { useState, useEffect } from "react";
import "./AdminUsers.css"
import {AdminUpdateUsers} from "./index.js"

const AdminUsers = (props) => {
    const { isAdmin, setIsAdmin } = props

    const [ users, setUsers ]  = useState([])
    // const [ username, setUsername ] = useState("")
    const [ name, setName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ email, setEmail ] = useState ("") 
    const [ updateForm, setUpdateForm ] = useState (false)
    const [ updatedUser, setUpdatedUser] = useState({})

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
            });

            const users = await response.json()
            console.log(users)
            setUsers(users)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (event, id) => {
        event.preventDefault()
        try {
            const response = await fetch (`http://localhost:1337/api/users/admin/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            }) 
            setUsers(users.filter((user) => user.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    // const handleUserEdit = () => {
    //     setUpdatedUser({})
    //     setUsers(props.user)
    // }

    const updateUserForm = () => {
        setUpdateForm(!updateForm)
    }


    // const updateUser = async (event, userId) => {
    //     event.preventDefault();
    //     try {
    //         const response = await fetch (`http://localhost:1337/api/users/admin/${userId}`, {
    //             method: "PATCH", 
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${localStorage.getItem("token")}`
    //             },
    //             body: JSON.stringify({
    //                 name: name,
    //                 email: email, 
    //                 admin: false,
    //             })
    //         })

    //         const updatedUser = await response.json()
            
    //         console.log(updatedUser)
    //         setUpdatedUser(updatedUser)
    //         return updatedUser
    //     } catch (error) {
    //         console.log( error)
    //     }
    // }

    return (
      <section> 

        {/* GET ALL USERS LIST */}
        {/* DELETE USER */}
        <button onClick={getAllUsers}> Show All Users </button>
        <h3> All Users </h3>
        <ul>
            {
                users.map((user) => (
                <li key={user.id}>
                    {user.username}
                    <button onClick={(event) => deleteUser(event, user.id)}> Delete </button>
                    {/* <button onClick={updateUserForm}> Update User </button> */}
                    <AdminUpdateUsers user={user} setUsers={setUsers} users={users}/>
                </li>
                ))
            }
        </ul>


        


        {/* UPDATE A USER 
        { updateForm ? (
            <form id="updateUserForm" onSubmit={updateUser}>
                
                <h3> Update User</h3>
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
                    Email: 
                    <input
                        type="text"
                        placeholder="New Email"
                        value = {email}
                        onChange = {(event) => setEmail(event.target.value)}
                    />
                </label>
                <button type="submit" > Update User </button>
            </form>
        ): null } */}
      </section>
    )

}

export default AdminUsers


{/* <button onClick={updateUser}> Update Users </button> */}
{/* <button onClick={() => updateUser(user.id)}>Update</button> */}

  // const createUser = async () => {
    //     try {
    //         const response = await fetch (`http://localhost:1337/api/users/admin`, {
    //             method: "POST", 
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${localStorage.getItem("token")}`
    //             },
    //             body: JSON.stringify ({
    //                 name: name,
    //                 password: password, 
    //                 email: email, 
    //                 admin: (false),
    //             })
    //         })
    //         const newUser = await response.json()
            
    //         if (Object.keys(newUser).length) {
    //             setUsers([...users, newUser])
    //             // setNewUserName("")
    //             // setNewUserPassword("")
    //             // setNewUserEmail("")
    //         }



    //         return newUser
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


            {/* CREATE A USER
        <form id="createUserForm">
            <h3>Create a User</h3>
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
        </form> */}

        // <label>
        // Password: 
        // <input
        //     type="text"
        //     placeholder="New Password"
        //     value = {password}
        //     onChange = {(event) => setPassword(event.target.value)}
        // />
        // </label>