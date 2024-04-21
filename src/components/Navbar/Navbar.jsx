import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.scss'
import hacker from './Navbar/hacker.png'

const Navbar = () => {
    const {logout, isLogin} = useContext(AuthContext)
    return (
        <nav>
            <div className="nav-wrapper navbar">
            <img src={hacker} alt="logo" /><a href="/" className="brand-logo">PCC TEAM</a>
                
                    {
                        isLogin
                        ? <ul id='nav-mobile' className="right hide-on-med-and-down">
                        <li><a href="/" onClick={logout}>LOG OUT</a></li></ul>
                        : <ul id='nav-mobile' className="right hide-on-med-and-down">
                        <li><Link to="/login">LOG IN</Link></li></ul>
                    }
            </div>
        </nav>
    );
}

export default Navbar;
