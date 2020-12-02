import React, { useState, useContext } from "react";
import { useLocation, Link } from 'react-router-dom';
import AppContext from '../Utilities/AppContext'



function NavBar() {

    const { pages, token, logoutUser } = useContext(AppContext);
    const { pathname } = useLocation();

    return (
        <nav class="navbar navbar-expand-lg navbar-dark brand fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#">Game Progress Tracker</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        {
                            pages.filter((item, index) => {
                                if (item.url === '/main') {
                                    return item;
                                }
                                if (token.length > 0) {
                                    if (item.url === '/profile') {
                                        return item;
                                    }
                                    if (item.url === '/logout') {
                                        return item;
                                    }
                                }
                                else {
                                    if (item.url !== '/logout' && item.url !== '/profile') {
                                        return item;
                                    }
                                }
                            }).map((item, index) => {
                                return (
                                    <li key={index} class="nav-item">
                                        { item.url === '/logout' ?
                                            <a href='#' className="nav-link" onClick={logoutUser}>Logout</a> :
                                            <Link
                                                to={item.url}
                                                class={"nav-link " + (pathname === item.url ? "active" : "")}>
                                                {item.readableName}
                                            </Link>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar