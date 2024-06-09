import React, { Component } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import {Login} from './pages/login'
import {Main} from './pages/post-main/main'
import{Navbar} from "./components/navbar"
import { CreatePost} from "./pages/create-post/createPost"
import { Footer } from './components/footer';
function App() {
  return (
    <div className="App">
     <Router>

      <Navbar/>
      <Routes>
        <Route path='/'element={<Main/>}/>
        <Route path="/Login" element={<Login/>}/>   
        <Route path="/CreatePost" element={<CreatePost/>}/>  
      </Routes>
      <Footer />
     </Router>
        
    </div>
  );
}

export default App;
