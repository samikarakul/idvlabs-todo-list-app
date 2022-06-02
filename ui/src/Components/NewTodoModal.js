import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {setIsHide} from "../stores/NewTodoModal"
import {addTodo} from '../stores/Todo';
import {CheckObjectValuesNullorEmpty} from '../Helper';
import {CreateTodo} from "../ApiCalls";

import {setIsHide as setNotificationIsHide, setMessage} from '../stores/Notification';

function NewTodoModal() {

    const dispatch = useDispatch()

    const userId = document.cookie && document.cookie.split('=')[1] / 1;

    const [todo, setTodo] = useState({title:'',todoContent:'tmp',userId:userId,isCompleted:false })
    const { isHide} = useSelector(state => state.newTodo)

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(todo.title){
            if(!CheckObjectValuesNullorEmpty(todo)){
                dispatch(setMessage("Please do not try to send null or empty values!"));
                dispatch(setNotificationIsHide(false))
                return;
            }
            const result = await CreateTodo(todo);
            if(!result.error && result.success){
                todo.todoId = parseInt(result.responseValue)
                dispatch(addTodo(todo))
                dispatch(setMessage("New TODO Created Successfully!"));
                dispatch(setNotificationIsHide(false))
            }
            if(result.error) console.log(result.errorMessage)
            dispatch(setIsHide(true))
        }
    }
    return (
    <div className={isHide ? 'hide' : ''}>
        <div className='bg-black-transparent w-100 h-100 z-10' onClick={() => dispatch(setIsHide(true))}></div>
        <div className='modal-white w-80 h-50 z-10 position-top-20 position-left-20 flex-center flex-direction-column'>
            <h1 className='my-4'>Add New ToDo Item</h1>
            <form className='edit-form' onSubmit={handleSubmit}>
                <input placeholde="Todo Title" className='my-4 px-4' value={todo.title} name="title"
                    onChange={(e) => setTodo({...todo,"title":e.target.value})}
                />
                <button className='button my-4'>Save</button>
            </form>
        </div>
    </div>
    )
}

export default NewTodoModal