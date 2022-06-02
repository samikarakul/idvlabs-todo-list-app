import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

function Home() {
  const navigate = useNavigate();


  return (
    <div className='container-form'>
      <div className='bg-black-transparent w-100 h-100 z-10'></div>
      <div className='modal-transparent w-80 h-50 z-10 position-top-20 position-left-20 flex-center flex-direction-column'>
        <h1><span></span></h1>
        <button class="button" onClick={() => navigate('/login')}>TRY NOW</button>
      </div>


    </div>
  )
}

export default Home