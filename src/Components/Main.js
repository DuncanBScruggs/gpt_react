import React, { useContext, useEffect } from "react";
import AxiosHelper from "../Utilities/AxiosHelper";
import { useHistory } from 'react-router-dom';
import AppContext from '../Utilities/AppContext'

function Main() {

    const history = useHistory();
    const { gamesList, setGamesList, gameId, setGameId, gameName, setGameName } = useContext(AppContext);

    const method = 'get';
    const route = 'getGames';

    function listGames(res) {
        setGamesList(res.data);
    }

    useEffect(() => {
        AxiosHelper({ method, route, fun: listGames })
    }, [])


    function selectGame(gameObject) {
        setGameId(gameObject.id)
        setGameName(gameObject.name)
        history.push(`/game/${gameObject.id}`);
    }

    return (
        <div className="row justify-content-center">
            { gamesList.map((item, index) => {
                return (
                    <div key={item.id} class="card col-5 m-2 p-0" onClick={() => selectGame(item)}>
                        <img class="card-img-top" src={item.image} alt="Card image cap" />
                        <div class="card-body">
                            {item.name}
                        </div>
                    </div>
                )
            })}
        </div>
    )


}

export default Main;