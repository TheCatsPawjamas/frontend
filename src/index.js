import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Homepage, Login, SingleProduct, Cats, Registration } from "./components";



const App = () => { 
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return ( 
    <BrowserRouter>
        <div> 
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <Routes>
                <Route path='/' element={<Homepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                <Route path='/register' element={<Registration isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                <Route path='/cats' element={<Cats isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                <Route path='/cats/:id' element={<SingleProduct isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
            </Routes> 
        </div>
    </BrowserRouter> 
    ) 
}

const appElement = document.getElementById("app")
const root = createRoot(appElement)
root.render(<App />)
