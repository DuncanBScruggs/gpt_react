import React, { useState, useContext, useEffect } from "react";
import AxiosHelper from "../Utilities/AxiosHelper";
import { useParams } from 'react-router-dom';
import AppContext from '../Utilities/AppContext'

function Game() {

    const { gameName, characterName, setCharacterName, token, setToken } = useContext(AppContext);

    const params = useParams();
    const [charactersList, setCharactersList] = useState([]);
    const [charactersTasks, setCharactersTasks] = useState([]);
    const [activeCharacter, setActiveCharacter] = useState([]);
    const [locationsList, setLocationsList] = useState([]);
    const [ifChecked, setIfChecked] = useState([]);
    

    function clickHandler() {
        const method = 'post';
        const route = 'createCharacter';
        const data = { name: characterName, ref_game_id: params.gameid }

        AxiosHelper({ method, route, data, token, fun: getCharactersList })
    }

    function selectCharacter(characterId) {
        setActiveCharacter(charactersList.filter((item) => {
            if (item.id == characterId) {
                return item;
            }
        }))
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
    function getCharactersTasks(res) {
        if (res.status == 200) {
            console.log(res);
            setCharactersTasks(res.data)
        }
    }

    function getLocations(res) {
        if (res.status == 200) {
            console.log(res);
            setLocationsList(res.data)
        }
    }

    function updateTask(taskId) {
        if (taskId == ifChecked){
            const method = 'delete';
            const route = 'deleteCharacterTask';
            const data = { ref_task_id: taskId, ref_character_id: activeCharacter[0].id }
            
            AxiosHelper({ method, route, data })   
        }
        else{
            setIfChecked(taskId)
            const method = 'post';
            const route = 'createCharacterTask';
            const data = { ref_task_id: taskId, ref_character_id: activeCharacter[0].id }
            
            AxiosHelper({ method, route, data })     
        }
    }

    useEffect(() => {

        const ssToken = window.sessionStorage.getItem('token')
        if (ssToken) {
            const method = 'post'
            const route = 'userCharactersIndex'
            const data = { ref_game_id: params.gameid }

            console.log(params.gameid)

            AxiosHelper({ method, route, token: ssToken, fun: getCharactersList, data })


            // if (charactersList > 0 && user.account_verified_at.length < 0) {

            // }
            // else if( user has made no character && user.account_verified_at < 0 ){
            // else if (charactersList < 0 && user.account_verified_at.length < 0) {

            // }
            // user is not verified but have no characters
            // }
        }
        else {
            const method = 'post';
            const route = 'anonymousAccount';
            AxiosHelper({ method, route, fun: unauthToken, })
            // save token of fake user
        }


        // const method = 'get';
        // const route = `getLocations/${params.gameid}`;
        AxiosHelper({ method:'get', route: `getLocations/${params.gameid}`, fun: getLocations })

        // AxiosHelper({ method:'get', route: 'getCharacterTask', fun: getCharactersTasks })


    }, [])

    return (
        <>
            <h1>{gameName}</h1>

            <h2>Character: {activeCharacter.length > 0 ? activeCharacter[0].name : 'none selected'}</h2>

            <div class="form-group">
                <label for="InputCharacter">Character Name</label>
                <input onChange={e => setCharacterName(e.target.value)} value={characterName} type="name" class="form-control" id="InputCharacterName1" placeholder="Character Name" />
            </div>
            <button onClick={clickHandler} class="btn btn-primary">Create Character</button>

            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Select Character
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    {
                        charactersList.map((item) => {
                            return (
                                <button onClick={() => selectCharacter(item.id)} class="dropdown-item" type="button">{item.name}</button>
                            )
                        })
                    }

                </div>
            </div>

            {locationsList.map((item) => {
                return (
                    <>
                        <h2>{item.location}</h2>
                        {item.tasks.map((task) => {
                            return (

                                <div  key={task.id} class="form-check">
                                    <input onClick={() => updateTask(task.id)} class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                    <label class="form-check-label" for="defaultCheck1" >
                                        {task.name}
                                    </label> 
                                </div>
                            )
                        })}
                    </>
                )
            })}


        </>
    )
}

export default Game;