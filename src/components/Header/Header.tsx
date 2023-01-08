import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './Header.module.css'
import UserService from "../../utils/service/UserService";
import {useKeycloak} from "@react-keycloak/web";

const Header: React.FC = () => {
  const { keycloak } = useKeycloak()
  console.log(keycloak.token)
  console.log(UserService.getToken())
    return (
        <header className={classes.header}>
            <NavLink to='/'>
                <div className={classes.logo}>Hitcher</div>
            </NavLink>
                <ul>
                    <NavLink to="search"> <li><div aria-hidden="true" className={classes.icon_search}/>Искать</li></NavLink>
                    <NavLink to="create-trip"><li><div aria-hidden="true" className={classes.icon_add_trip}/>Опубликовать поездку</li></NavLink>
                    {!UserService.isLoggedIn() && <NavLink to="auth"><li onClick={()=>keycloak.login()}>Профиль</li></NavLink>}
                    {UserService.isLoggedIn() && <NavLink to="auth"><li onClick={()=>UserService.doLogout()}>Выйти</li></NavLink> }
                </ul>
        </header>
    );
};

export default Header;