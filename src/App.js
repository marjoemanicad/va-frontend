
import './App.css';
import Header from './components/Navbar';
import Stats from './components/Stats';
import Users from './components/Users';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import UserLogs from './components/userComponents/UserLogs';
import UserHomePage from './components/UserHomePage';
function App() {
  const token = localStorage.getItem('mytoken')
  let navigate = useNavigate()

  useEffect(() => {
    if(!token) {
      navigate('/login')
      return;
    }
  }, [token])

  return (
    <div>
      <Header/>
      <Routes>
        <Route>
        <Route path='/homepage' element = {<UserHomePage/>} ></Route>
        <Route path='/userlogs' element = {<UserLogs/>} ></Route>
        <Route path='/login' element = {<Login/>} ></Route>
        <Route path='/users' element = {<Users/>} ></Route>
        <Route path='/stats' element = {<Stats/>} ></Route>
        </Route>
      </Routes>
      
      
      
    </div>
  );
}

export default App;
