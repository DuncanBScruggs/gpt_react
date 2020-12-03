import React, { useState, useContext, useEffect } from "react";
import AxiosHelper from "../Utilities/AxiosHelper";
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../Utilities/AppContext'

function Game() {

    const params = useParams();
    const method = 'get';
    const route = 'getGames';

    console.log(params);

    useEffect(() => {
        AxiosHelper({ method, route, })
    }, [])

    return(
        <div>TEST</div>
    )
}

export default Game;