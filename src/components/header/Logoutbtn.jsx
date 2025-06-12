import React from 'react'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { AuthService } from '../../appwrite/auth'

const Logoutbtn = () => {

    const dispatch = useDispatch();
    const handleLogout = () =>{
        authService.logout()
        .then(()=>{
            dispatch(logout());
        })
        .catch((err)=>{
            console.error("Error while logging out:", err);
            alert("Failed to logout. Please try again.");
        })
    }

  return (
    <button onClick={handleLogout} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
        Logout
    </button>
  )
}

export default Logoutbtn
