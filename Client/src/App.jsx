import { useState } from 'react'
import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom';
import {UseAuthContext} from './context/authContext';
import {Toaster} from 'react-hot-toast';
import Auth from './pages/Auth'
import Home from './pages/Home'

function App() {
  const {auth} = UseAuthContext();
  return (
    <>
      <Routes>
        <Route path='/' element={!auth ? <Navigate to='/auth'/> : <Home/>}/>
        <Route path='/auth' element={auth ? <Navigate to='/'/> : <Auth/>}/>
      </Routes>
      <Toaster position="top-right"
        reverseOrder={false}/>
    </>
  )
}

export default App
