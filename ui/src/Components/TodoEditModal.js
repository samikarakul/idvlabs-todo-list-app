import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {setIsHide} from '../stores/Edit';
import {updateTodo,setTodoItem} from '../stores/Todo';
import {CheckObjectValuesNullorEmpty} from '../Helper';
import {UpdateTodo} from "../ApiCalls";


import {setIsHide as setNotificationIsHide, setMessage} from '../stores/Notification';

function TodoEditModal() {

    const { isHide} = useSelector(state => state.edit)
    const { todoItem} = useSelector(state => state.todo)

    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(todoItem.title){
            dispatch(updateTodo(todoItem))
            if(!CheckObjectValuesNullorEmpty(todoItem)){
                dispatch(setMessage("Please do not try to send null or empty values!"));
                dispatch(setNotificationIsHide(false))
                // alert("Please do not try to send null or empty values!")
                return;
            }
            const result = await UpdateTodo(todoItem);
            if(!result.error && result.success){
                dispatch(setMessage("Todo updated successfully!"));
                dispatch(setNotificationIsHide(false))
            }
            if(result.error){
                dispatch(setMessage(result.errorMessage));
                dispatch(setNotificationIsHide(false))
            }
        }
        dispatch(setIsHide(true));
        dispatch(setTodoItem({}));
    }
    return (
    <div className={isHide ? 'hide' : ''}>
        <div className='bg-black-transparent w-100 h-100 z-10' onClick={() => dispatch(setIsHide(true))}></div>
        <div className='modal-white w-80 h-50 z-10 position-top-20 position-left-20 flex-center flex-direction-column'>
            <h1 className='my-4'>Edit ToDo Item</h1>
            <form className='edit-form' onSubmit={handleSubmit}>
                <input placeholde="Todo Title" className='my-4 px-4' value={todoItem.title} name="title"
                    onChange={(e) => dispatch(setTodoItem({...todoItem, "title": e.target.value}))}
                />
                <button className='button my-4'>Save</button>
            </form>
        </div>
    </div>
    )
}

export default TodoEditModal