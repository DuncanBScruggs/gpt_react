import React, { useState, useContext } from "react";
import AxiosHelper from "../Utilities/AxiosHelper";
import { useHistory } from 'react-router-dom';
import AppContext from '../Utilities/AppContext'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const { setToken } = useContext(AppContext);

    function successfulLogin(res) {
        if (res.status == 200) {
            history.push('/main');
            console.log(res);
            setToken(res.data.access_token);
            sessionStorage.setItem('token', res.data.access_token);
        }
    }


    function clickHandler() {
        const method = 'post';
        const route = 'v1/oauth/token';
        const data = { username: email, password, client_secret: "b9UG8przbzZtVhFuSSfInrs6AJlrfpVzKUaetE3O", client_id: '2', grant_type: 'password', scope: '' };

        AxiosHelper({ method, route, fun: successfulLogin, data })
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
            <button onClick={clickHandler} class="btn btn-primary">Login</button>
        </>
    )
}

export default Login;