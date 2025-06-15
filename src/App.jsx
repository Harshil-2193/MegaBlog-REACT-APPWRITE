import { useState, useEffect } from 'react';
import './App.css';
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from './store/authSlice';
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData)
          dispatch(login({ userData }));
        else
          dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
      <p className="text-white text-xl font-semibold animate-pulse">Loading...</p>
    </div>
  );
}

export default App;
