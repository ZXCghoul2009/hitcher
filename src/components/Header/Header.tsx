import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './Header.module.css'
import UserService from "../../utils/service/UserService";

const Header: React.FC = () => {
    return (
        <header className={classes.header}>
            <NavLink to='/'>
                <div className={classes.logo}>Hitcher</div>
            </NavLink>
                <ul>
                    <NavLink to="search"> <li><div aria-hidden="true" className={classes.icon_search}/>Искать</li></NavLink>
                    <NavLink to="create-trip"><li><div aria-hidden="true" className={classes.icon_add_trip}/>Опубликовать поездку</li></NavLink>
                    {!UserService.isLoggedIn() && <NavLink to="auth"><li onClick={()=>UserService.doLogin()}>Профиль</li></NavLink>}
                    {UserService.isLoggedIn() && <NavLink to="auth"><li onClick={()=>UserService.doLogout()}>Выйти</li></NavLink> }
                </ul>
        </header>
    );
};

export default Header;