import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { removeSpot } from '../../store/spots';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { useHistory, Link } from 'react-router-dom';



function ConfirmDeleteModal({spotId}) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    // const history = useHistory();
  
  
    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };
  
    useEffect(() => {
      if (!showMenu) return;
  
      const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };
  
      document.addEventListener('click', closeMenu);
  
      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
  
    const closeMenu = () => setShowMenu(false);
  
    const confirmDelete = (spotId) => {
      dispatch(removeSpot(spotId))
      closeMenu();
    };
  

    return (
        <div className="del-modal">
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to remove this spot from the listings?</h3>
        <button onClick={confirmDelete}>Yes (Delete Spot)</button>
        <button onClick={closeMenu}>No (Keep Spot)</button>
        </div>
    )
}

export default ConfirmDeleteModal;