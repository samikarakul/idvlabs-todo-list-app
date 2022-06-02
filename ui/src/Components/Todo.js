import React, {useState} from 'react'
import OK_SVG from '../svg/icon-ok.svg';
import DELETE_SVG from '../svg/icon-delete.svg';
import EDIT_SVG from '../svg/icon-edit.svg';
import {CheckObjectValuesNullorEmpty} from '../Helper';
import {UpdateTodo} from '../ApiCalls';

import { useSelector, useDispatch } from 'react-redux';
import {filterTodosWithTodoId, setTodoItem} from '../stores/Todo';
import {setIsHide} from '../stores/Confirmation';
import {setIsHide as setEditModalHide} from '../stores/Edit'


import {setIsHide as setNotificationIsHide, setMessage} from '../stores/Notification';
function Todo({todo}) {

    const [colors, setColors] = useState(["bg-yellow", "bg-orange","bg-pink","bg-green","bg-purple"])
    const dispatch = useDispatch()

    const handleOK = async() => {
        if(!CheckObjectValuesNullorEmpty(todo)){
            dispatch(setMessage("Please do not try to send null or empty values!"));
            dispatch(setNotificationIsHide(false))
            return;
        }
        const tmpTodo = {...todo};
        tmpTodo.isCompleted = true;
        const result = await UpdateTodo(tmpTodo);
        if(!result.error && result.success){
            dispatch(filterTodosWithTodoId(todo.todoId));
            dispatch(setMessage("Congratulations, you completed a TODO!!"));
            dispatch(setNotificationIsHide(false))
            return;
        }
        if(result.error){
            console.log(result.errorMessage)
        } 
        
    }
    const handleDelete = async() => {
        dispatch(setIsHide(false))
        dispatch(setTodoItem(todo))
    }

    const handleEdit = () => {
        dispatch(setEditModalHide(false))
        dispatch(setTodoItem(todo))
    }

    return (
    <div className={"card mx-4 my-4 "+ colors[Math.floor(Math.random() * colors.length)]}>
        <div className="card-actions">
            <img onClick={handleOK} src={OK_SVG}/>
            <img onClick={handleDelete} src={DELETE_SVG}/>
            <img onClick={handleEdit} src={EDIT_SVG}/>
        </div>
        <p>{todo.title}</p>
    </div>
    )
}

export default Todo