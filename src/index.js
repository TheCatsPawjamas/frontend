import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Home, Login } from "./components";



const App = () => { 
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return ( 
    <BrowserRouter>
        <div> 
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <Routes>
                {/* <Route path='/' element={<Homepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} /> */}

            </Routes> 
        </div>
    </BrowserRouter> 
    ) 
}

const appElement = document.getElementById("app")
const root = createRoot(appElement)
root.render(<App />)
