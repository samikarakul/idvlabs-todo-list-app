import React from 'react'
import {useSelector} from 'react-redux'
function Notification() {

	const { message } = useSelector(state => state.notification)

  return (
    <div className='notification px-4'>
        <p>{message}</p>
    </div>
  )
}

export default Notification