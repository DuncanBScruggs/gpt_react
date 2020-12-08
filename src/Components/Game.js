import React, { useState, useContext, useEffect } from "react";
import AxiosHelper from "../Utilities/AxiosHelper";
import { useParams } from 'react-router-dom';
import AppContext from '../Utilities/AppContext'

function Game() {

    const { gameName, characterName, setCharacterName, user, token, setToken } = useContext(AppContext);

    const params = useParams();
    const [charactersList, setCharactersList] = useState([]);
    const [locationsList, setLocationsList] = useState([]);
    // const [tasksList, setTasksList] = useState([]);

    function clickHandler() {
        const method = 'post';
        const route = 'createCharacter';
        const data = { name: characterName, ref_game_id: params.gameid }

        AxiosHelper({ method, route, data, token, fun: getCharactersList })
    }

    function unauthToken(res) {
        if (res.status == 200) {
            setToken(res.data.access_token);
            sessionStorage.setItem('token', res.data.access_token);
        }
    }

    function getCharactersList(res) {
        if (res.status == 200) {
            console.log(res);
            setCharactersList(res.data)
        }
    }

    function getLocations(res) {
        if (res.status == 200) {
            console.log(res);
            setLocationsList(res.data)
        }
    }

    function updateTask(taskId){
        const method = 'post';
        const route = `updateTask/${taskId}`;
        const data = { name: characterName, ref_game_id: params.gameid }

        AxiosHelper({ method, route, data, token, fun: getCharactersList })
    }

    useEffect(() => {
        const ssToken = window.sessionStorage.getItem('token')
        if (ssToken) {
            const method = 'post'
            const route = 'userCharactersIndex'
            const data = { ref_game_id: params.gameid }

            console.log(params.gameid)

            AxiosHelper({ method, route, token: ssToken, fun: getCharactersList, data })



            if (charactersList > 0 && user.account_verified_at.length < 0) {

            }
            // else if( user has made no character && user.account_verified_at < 0 ){
            else if (charactersList < 0 && user.account_verified_at.length < 0) {

            }
            // user is not verified but have no characters
            // }
        }
        else {
            const method = 'post';
            const route = 'anonymousAccount';
            AxiosHelper({ method, route, fun: unauthToken, })
            // save token of fake user
        }


        const method = 'get';
        const route = `getLocations/${params.gameid}`;
        AxiosHelper({ method, route, fun: getLocations })


    }, [])

    return (
        <>
            <h1>{gameName}</h1>


            <div class="form-group">
                <label for="InputCharacter">Character Name</label>
                <input onChange={e => setCharacterName(e.target.value)} value={characterName} type="name" class="form-control" id="InputCharacterName1" placeholder="Character Name" />
            </div>
            <button onClick={clickHandler} class="btn btn-primary">Create Character</button>

            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Character List
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    {
                        charactersList.map((item, index) => {
                            return (
                                <button key={item.id} class="dropdown-item" type="button">{item.name}</button>
                            )
                        })
                    }

                </div>
            </div>

            {locationsList.map((item, index) => {
                return (
                    <>
                        <h2>{item.location}</h2>
                        {item.tasks.map((task) => {
                            if(characters.id === task.ref_character_id)
                            return (
                                <p>{task.name} <button onClick={() => updateTask(task.id) } className="btn btn-secondary">check or uncheck</button></p>
                            )
                        })}
                    </>
                )
            })}


        </>
    )
}

export default Game;