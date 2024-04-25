import React from 'react'
import Home from './Home'
import DnDFlow from './DnDFlow';
import {Routes, Route} from "react-router-dom";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
   
      {/* <Route path="/" element={<Home/>}></Route> */}
    </Routes>
  )
}

export default AllRoutes
