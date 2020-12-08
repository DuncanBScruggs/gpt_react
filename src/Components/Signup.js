import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import AxiosHelper from "../Utilities/AxiosHelper";
import AppContext from '../Utilities/AppContext'

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { setToken } = useContext(AppContext);

    function successfulRegister(res) {
        if (res.status == 200) {
            history.push('/main');
            console.log(res);
            setToken(res.data.data.token);
            sessionStorage.setItem('token', res.data.data.token);
        }
    }


    function clickHandler() {

        const method = 'post';
        const route = 'register';
        const data = { email, password };

        AxiosHelper({ method, route, fun: successfulRegister, data })
    }

    return (
        <>
            <div class="form-group">
                <label for="InputEmail1">Email address</label>
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div class="form-group">
                <label for="InputPassword1">Password</label>
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" class="form-control" id="InputPassword1" placeholder="Password" />
            </div>
            <button onClick={clickHandler} class="btn btn-primary">Signup</button>
        </>
    )
}

export default Signup;