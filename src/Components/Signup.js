import React,{ useState } from "react";
import { useHistory } from 'react-router-dom';
import { AxiosHelper } from "../Utilities/AxiosHelper";

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    function success(res){

        if (res.status == 200){
            history.push('/login');
        }
    }


    function clickHandler(){

        const method = 'post';
        const url = 'http://localhost:8000/register';
        const data = { email, password };

        AxiosHelper(method, url, success, data)
    }

    return (
        <>
            <div class="form-group">
                <label for="InputEmail1">Email address</label>
                <input onChange={ e => setEmail(e.target.value) } value={ email } type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div class="form-group">
                <label for="InputPassword1">Password</label>
                <input onChange={ e => setPassword(e.target.value) } value={ password } type="password" class="form-control" id="InputPassword1" placeholder="Password" />
            </div>
            <button onClick={ clickHandler } class="btn btn-primary">Signup</button>
        </>
    )
}

export default Signup;