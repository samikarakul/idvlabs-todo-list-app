import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setIsHide} from "../stores/NewTodoModal"
import { searchTodo } from '../stores/Todo';
import SEARCH_SVG from "../svg/icon-search.svg"
import LOGOUT_PNG from "../img/icon-logout.png"
function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [userCookieValue, setUserCookieValue] = useState(document.cookie && document.cookie.split("=")[1])

  const handleLogout = () => {
    document.cookie = 'userid=;expires=Thu, 01 Jan 1970 00:00:00 GMT;'
    setUserCookieValue(document.cookie && document.cookie.split("=")[1]);
  }

  const handleSearch = (e) => {
    dispatch(searchTodo(e.target.value));
  }
  useEffect(() => {
    if(!userCookieValue) navigate('/login')
  }, [userCookieValue])

  return (
    <div className='h-100 w-20 nav'>
      <img src={SEARCH_SVG} className="img-search"/>
      <input placeholder='Search...' onChange={handleSearch}/>
      <button onClick={() => dispatch(setIsHide(false))} className="button">Add New Todo</button>
      <img src={LOGOUT_PNG} className="img-logout"/>
      <button className='button logout' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar