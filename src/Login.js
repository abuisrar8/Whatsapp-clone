import React from 'react'
import './Login.css'
import {Button} from '@material-ui/core';
import { auth,provider } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = ()=>{
        auth
        .signInWithPopup(provider)
        .then((result)=>dispatch(
            {
                type: actionTypes.SET_USER,
                user: result.user,
            }
        ))
        .catch((error)=> alert(error.message));

};
    return (
        <div className="login">
            <Button  onClick = {signIn}>
            <div className ="login__container">
                <img
                src ="https://image.flaticon.com/icons/png/512/4406/4406170.png"
                alt=""
                />
                <div className="login__text">
                    <h1>Sign in to WhatsApp Clone <small><small>v.01</small></small></h1>
                </div>

                
                    Sign In with Google
                
            </div>
            </Button>
            
        </div>
    )
}

export default Login
