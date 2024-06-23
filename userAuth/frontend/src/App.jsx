import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import NoPage from './NoPage'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard/:id' element={<Dashboard />} />



          <Route path='/*' element={<NoPage/>} />

        </Routes>
      </Router>
     
    </div>
  )
}

export default App