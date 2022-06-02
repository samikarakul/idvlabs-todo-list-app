import React from 'react'
import {CheckFormValuesNullOrEmpty, CreateObjectWithFormValues} from '../Helper';
import {LoginUser, RegisterUser} from '../ApiCalls';
import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

function Form() {
  
    const location = window.location.href.split('/');
    const [path, setPath] = useState(location[location.length - 1]);
    const [userCookieValue, setUserCookieValue] = useState(document.cookie && document.cookie.split("=")[1])
    const [failed, setFailed] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(CheckFormValuesNullOrEmpty(e.target.elements))
        {
            const userObject = CreateObjectWithFormValues(e.target.elements);
            let sonuc = {}
            switch(path){
                case "register":
                        userObject.username = userObject.username.trim().replaceAll(" ", "")
                        userObject.password = userObject.password.trim().replaceAll(" ", "")
                        
                        sonuc = await RegisterUser(userObject);
                        if(sonuc.errorMessage) alert(sonuc.errorMessage)
                    break;
                case "login":
                    userObject.username = userObject.username.trim().replaceAll(" ", "")
                    userObject.password = userObject.password.trim().replaceAll(" ", "")
                    
                    sonuc = await LoginUser(userObject);
                    if(!sonuc.error && sonuc.success){
                        document.cookie = 'userid='+sonuc.responseValue;
                        setUserCookieValue(document.cookie && document.cookie.split("=")[1]);
                    }
                    else if(sonuc.errorMessage) alert(sonuc.errorMessage)
                    break;
                default:
                    break;
            }
        } 
        else{
            const form = document.getElementsByClassName("user-form")[0]
            form.classList.add("user-form-failed")
            setFailed(true)
            setTimeout(() => {
                form.classList.remove("user-form-failed")
                setFailed(false)
            }, 2000)
        } 
        
    }
    
    useEffect(() => {
        if(userCookieValue) navigate('/todo-list')
    }, [userCookieValue])
    return (
    <div className="user-form flex-center flex-direction-column">
        {failed ? <p>Please check your inputs...</p> : ""}
        <form onSubmit={handleSubmit}>
            <input placeholde="username" name="username" type="text" onChange={(e) => e.target.value = e.target.value.trim().replaceAll(" ", "")}/>
            <input placeholde="password" name="password" type="password" onChange={(e) => e.target.value = e.target.value.trim().replaceAll(" ", "")}/>
            <button className="button button-positive">{path.toUpperCase()}</button>
        </form>
        {path == "login" ? 
                (
                    <Link to={`/register`}>
                        Don't you have an account? Register!
                    </Link>
                )
                :
                (
                    <Link to={`/login`}>
                        Do you have an account? Login!
                    </Link>
                )
        }
    </div>
    )
}

export default Form