import { useDispatch, useSelector } from 'react-redux';


function ConfirmDeleteModal(spotId) {



    return (
        <div className="del-modal">

        <h3>Are you sure you want to delete this spot?</h3>
        <button>Delete</button>
        <button>Cancel</button>
        </div>
    )
}