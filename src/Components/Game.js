import React, { useState, useContext, useEffect } from "react";
import AxiosHelper from "../Utilities/AxiosHelper";
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../Utilities/AppContext'

function Game() {

    const { characterName, setCharacterName, user, token } = useContext(AppContext);

    const params = useParams();

    function clickHandler(){
        const method = 'post';
        const route = 'createCharacter';
        const data = { name: characterName, ref_game_id: params.gameid }

        console.log(data)

        AxiosHelper({ method, route,  data, token })
    }

    // console.log(params.gameid);

    useEffect(() => {
        if ( token.length > 0){
            const method = 'get'
            const route = 'userCharactersIndex'
            AxiosHelper({ method, route, token })
            // if ( user has made one character && not verified *account_verified_at* ){
            // 
            // } 
            // else if{
            // user is not verified but have no characters
           // }
        }
        else{
            // create a fake user
            // save token of fake user
        }


        // const method = 'get';
        // const route = 'getGames';
        // AxiosHelper({ method, route, })
    }, [])

    return (
        <>
            <div class="form-group">
                <label for="InputCharacter">Character Name</label>
                <input onChange={e => setCharacterName(e.target.value)} value={characterName} type="name" class="form-control" id="InputCharacterName1" placeholder="Character Name" />
            </div>
            <button onClick={clickHandler} class="btn btn-primary">Create Character</button>
        </>
    )
}

export default Game;