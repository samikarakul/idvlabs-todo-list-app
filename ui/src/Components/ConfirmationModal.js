import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {setIsHide, setResult} from '../stores/Confirmation';
import {filterTodosWithTodoId, setTodoItem} from '../stores/Todo';
import {DeleteTodo} from '../ApiCalls';

import {setIsHide as setNotificationIsHide, setMessage} from '../stores/Notification';

function ConfirmationModal() {

    const dispatch = useDispatch()
	const { isHide, result } = useSelector(state => state.confirmation)
    const { todoItem} = useSelector(state => state.todo)
    const confirm = async() => {
        dispatch(setIsHide(true))
        const result = await DeleteTodo(todoItem);
        if(!result.error && result.success){
            dispatch(setMessage("Todo deleted successfully!"));
            dispatch(setNotificationIsHide(false))
            dispatch(filterTodosWithTodoId(todoItem.todoId));
            return;
        }
        if(result.error) console.log(result.errorMessage)
        dispatch(setTodoItem({}))
        
    }
    return (
        <div className={isHide ? 'hide' : 'w-100 h-100 z-10'}>
            <div className='bg-black-transparent w-100 h-100 z-10'></div>
            <div className='modal-white w-80 h-50 z-10 position-top-20 position-left-20 flex-center flex-direction-column'>
                <h3 className='mx-4'>Are you sure to delete this todo?</h3>
                <button className='button button-confirm mx-4 my-4' onClick={confirm}>Yes</button>
                <button className='button button-decline mx-4 my-4' onClick={() => {dispatch(setIsHide(true))}}>No</button>
            </div>
        </div>
    )
}

export default ConfirmationModal