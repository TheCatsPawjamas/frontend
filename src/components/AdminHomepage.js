import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminHomepage.css"

const AdminHomepage = (props) => {
    const {isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, currentUser} = props;

        return(
            <div id="mainAdminHomepage">
            {
                isAdmin ? 
                        <div id="adminHomepage">
                            <div id="adminUsers">
                                <Link to="/adminusers">Click here to delete/edit a User</Link>
                            </div>
                            <div id="adminCats">
                                <Link to="/admincats">Click here to add/delete/edit a Cat</Link>
                            </div>
                        </div>
                        : <div>You don't have admin status</div>      
            }
            </div>
            
        )
}
export default AdminHomepage;