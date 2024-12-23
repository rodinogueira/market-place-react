import React, { useContext } from 'react'
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext'
import { BsFillCartFill } from 'react-icons/bs'
import { SlLogout } from "react-icons/sl";

const NavBar = () => {
  const navigate = useNavigate()
  const { isLogged, logoutUser } = useContext(AuthContext);

  return (
    <header className='bg-transparent z-50 w-full'>
       <nav className='flex item-center max-w-screen-xl mx-auto px-6 py-3'>
        <div className='flex flex-grow items-center'>
          <img src={logo} alt='Logo' className='w-36 cursor-pointer' />
          <h1 className='text-center text-3xl font-semibold text-gray-700'>Food App</h1>
        </div>
        <div>
          {isLogged ? (
            <div className='flex items-center justify-end space-x-6 bg-red-500'>
              {/* Carrinho de Compras */}
              <div className='relative flex items-center bg-slate-600'>
                <span className='bg-primary w-2 h-2 rounded-full absolute -right-2 -top-2'></span>
                <BsFillCartFill className='w-6 h-6 cursor-pointer' aria-label="Carrinho de compras" />
              </div>

              {/* Avatar do Usuário */}
              <img 
                src='' 
                alt='Usuário' 
                className='w-8 h-8 rounded-full border border-gray-300' 
              />

              {/* Informações do Usuário */}
              <div onClick={logoutUser} className='flex items-center space-x-2 cursor-pointer bg-orange-500'>
                <p className='text-gray-700 text-sm'>Nome Usuario</p>
                <SlLogout 
                  className='w-6 h-6 cursor-pointer hover:text-red-500 transition-colors' 
                  aria-label="Sair" 
                />
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-end space-x-6'>
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/register')} className='bg-primary px-6 text-white rounded-full transition duration-700 rover:scale-105'>Register</button>
            </div>
          )}
        </div>
       </nav>
    </header>
  )
}

export default NavBar;