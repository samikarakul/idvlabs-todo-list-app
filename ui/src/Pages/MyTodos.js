import React, {useState,useEffect} from 'react'
import Navbar from '../Components/Navbar';
import TodoList from '../Components/TodoList';
import NewTodoModal from '../Components/NewTodoModal';
import Notification from '../Components/Notification';
import {GetUserTodos} from "../ApiCalls";

import { useSelector, useDispatch } from 'react-redux';
import {setTodos} from '../stores/Todo';
import {setIsHide, setMessage} from '../stores/Notification';

function MyTodos() {
  const path = document.cookie && document.cookie.split("=")[1]
  const [userId, setUserId] = useState(path);

  const dispatch = useDispatch()
	const { todos } = useSelector(state => state.todo)
	const { isHide, message } = useSelector(state => state.notification)
  

  const FetchUserTodos = async() => {    
    const tmpTodos = await GetUserTodos(userId)
    dispatch(setTodos(tmpTodos));
  }

  useEffect(() => {
    FetchUserTodos();
  }, [])

  useEffect(() => {
    console.log(message)
    if(!isHide){
      setTimeout(() => {
        dispatch(setIsHide(true))
        dispatch(setMessage(""))
      }, 5000)
    }
  }, [message])
  return (
    <div className='flex-center justify-between h-100 bg-gray-1 flex-auto'>
      {!isHide ? <Notification/> : ""}
      <Navbar/>
      <TodoList todos={todos}/>
      <NewTodoModal/>
    </div>
  )
}

export default MyTodos