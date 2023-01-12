import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './Header.module.css'
import UserService from "../../utils/service/UserService";
import {ProfileImg} from "../../UI/ProfileImg/ProfileImg";


const Header: React.FC = () => {
    return (
        <header className={classes.header}>
            <NavLink to='/'>
                <div className={classes.logo}>Hitcher</div>
            </NavLink>
                <ul>
                    <NavLink to="search"> <li><div aria-hidden="true" className={classes.icon_search}/>Искать</li></NavLink>
                    <NavLink to="create-trip"><li><div aria-hidden="true" className={classes.icon_add_trip}/>Опубликовать поездку</li></NavLink>
                    {UserService.isLoggedIn() && <NavLink to="/profile"><li><ProfileImg/></li></NavLink> }
                    {!UserService.isLoggedIn() && <NavLink to="auth"><li onClick={()=>UserService.doLogin()}>Войти</li></NavLink>}
                    {UserService.isLoggedIn() && <NavLink to="/"><li onClick={()=>UserService.doLogout()}>Выйти</li></NavLink> }
                </ul>
        </header>
    );
};

export default Header;