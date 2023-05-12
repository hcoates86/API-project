import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/logo64.png';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div id='navbar'>
    <ul>
      <li>
        <NavLink exact to="/"> <img src={logo} alt="mybnb logo"></img> <span id='logobnb'>mybnb</span> </NavLink>
      </li>
      <li>Create a New Spot</li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>     
      )}

    </ul>
    </div>
  );
}

export default Navigation;