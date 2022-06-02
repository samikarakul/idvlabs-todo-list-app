import React from 'react'
import {useNavigate} from "react-router-dom"
function NotFound() {

  const navigate = useNavigate();
  return (
    <div className='not-found w-100 h-100 flex-center flex-direction-column'>
      <h1>404</h1>
      <h3>Page not found...</h3>
      <button className='button' onClick={() => navigate("/")}>Back to home...</button>
    </div>
  )
}

export default NotFound