import React, { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../api/userAuth';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        setIsLogged(true);
      } else {
        console.log('User not logged'); 
      }

      setLoading(false);
    }, [])
    
    const loginUser = async (payload) => {
      try {
        const response = await login(payload)
        console.log(response)
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        setIsLogged(true)
        navigate('/');
      } catch (error) {
        console.error('Error during login:', error.message);
        throw error;
      }
    };

    const logoutUser = () => {
      setIsLogged(false);
      localStorage.clear();
      navigate('/logout')
    }
    
    if(loading) {
      return <h1>Loading...</h1>
    } 
  
  return (
    <AuthContext.Provider value={{isLogged, loginUser, logoutUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;