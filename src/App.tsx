import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Dashboard from './Pages/Dashboard/Dashboard';
import Employess from './Pages/Employess/Employess';
import UserList from './Pages/Employee Listing/UserList';
import Login from './Pages/Auth/Login/Login';
import Signup from './Pages/Auth/Signup/Signup';
import Projects from './Pages/Projects/Projects';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectAssigned from './Pages/Projects/ProjectAssigned';
import Myproject from './Pages/Users/Myproject';
import ProtectedRoute from './Utils/Protected Route/ProtectedRoute';

function App() {
  return (
   <>
         <ToastContainer />

   <BrowserRouter> 
   <Routes>
   <Route path='/'element={<Login/>}/>
   <Route path='/signup'element={<Signup/>}/>

   <Route path='/' element={<Layout/>}>
   <Route path='/dashboard'element={<ProtectedRoute>
    <Dashboard/>
   </ProtectedRoute>}/>
    <Route path='/employess' element={
      <ProtectedRoute>
      <Employess/>
      </ProtectedRoute>
      } /> 
    <Route path='/userlist' element={
      <ProtectedRoute>
        <UserList/>
        </ProtectedRoute>} />
    <Route path='/projects' element={
       <ProtectedRoute>
        <Projects/>
        </ProtectedRoute>} />
    <Route path='/assignedProject' element={
       <ProtectedRoute>
      <ProjectAssigned/>
      </ProtectedRoute>
      } />
    <Route path='/myprojects' element={
       <ProtectedRoute>
        <Myproject/>
      </ProtectedRoute>
      } />


   </Route>
    
   </Routes>
   </BrowserRouter>


   </>
  );
}

export default App;
