import React from "react";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth"; // small correction: you wrote `AuthService` but imported as default earlier

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((err) => {
        console.error("Error while logging out:", err);
        alert("Failed to logout. Please try again.");
      });
  };

  return (
    <button
      onClick={handleLogout}
      className="px-5 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
