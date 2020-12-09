import React, { useState, useContext } from "react";
import AxiosHelper from "../Utilities/AxiosHelper";
import { useHistory } from 'react-router-dom';
import AppContext from '../Utilities/AppContext'

function Profile() {

    const { user, token } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function clickHandler(){
        const method = 'put';
        const route = 'updateAccount';
        const data = { email, password };

        AxiosHelper({ method, route, token, data })
    }

    return (
        <>
            <div class="form-group">
                <label for="InputEmail1">Change Email address</label>
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder={user.email} />
            </div>
            <div class="form-group">
                <label for="InputPassword1">Change Password</label>
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" class="form-control" id="InputPassword1" placeholder="Password" />
            </div>
            <button onClick={clickHandler} class="btn btn-primary">Edit</button>
        </>
    )
}

export default Profile;