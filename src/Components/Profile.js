import React, { useState, useContext } from "react";
import AxiosHelper from "../Utilities/AxiosHelper";
import { useHistory } from 'react-router-dom';
import AppContext from '../Utilities/AppContext'

function Profile(){

    const { user } = useContext(AppContext);

    console.log( user );

    return(

        <div>  Profile </div>

    )
}

export default Profile;