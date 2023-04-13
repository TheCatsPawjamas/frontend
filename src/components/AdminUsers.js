import React, { useState, useEffect } from "react";
import "./AdminUsers.css"
import {AdminUpdateUsers} from "./index.js"

const AdminUsers = (props) => {
    const { isAdmin, setIsAdmin } = props

    const [ users, setUsers ]  = useState([])
   
    const [ name, setName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ email, setEmail ] = useState ("") 
    const [ updateForm, setUpdateForm ] = useState (false)
    const [ updatedUser, setUpdatedUser] = useState({})



    const getAllUsers = async () => {
        try {
            // const response = await fetch ("http://localhost:1337/api/users/admin", {
            const response = await fetch ("https://thecatspawjamasbackend.onrender.com/api/users/admin", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });

            const users = await response.json()
            
            setUsers(users)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (event, id) => {
        event.preventDefault()
        try {
            // const response = await fetch (`http://localhost:1337/api/users/admin/${id}`, {
            const response = await fetch (`https://thecatspawjamasbackend.onrender.com/api/users/admin/${id}`, {
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


    const updateUserForm = () => {
        setUpdateForm(!updateForm)
    }


    return (
      <section id="adminUsersSection"> 

        <button id="allUserButton" onClick={getAllUsers}> View All Users </button>
        <h3 id="userHeader"> All Users </h3>
        <ul>
            {
                users.map((user) => (
                <li id="listOfUsers" key={user.id}>
                    {user.username}
                    <button id="deleteButton" onClick={(event) => deleteUser(event, user.id)}> Delete </button>
                    <AdminUpdateUsers id="adminUpdates" user={user} setUsers={setUsers} users={users}/>
                </li>
                ))
            }
        </ul>
      </section>
    )

}

export default AdminUsers

