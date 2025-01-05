import React, { useContext, useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext'
import { BsFillCartFill } from 'react-icons/bs'
import { SlLogout } from 'react-icons/sl';
import { findCartById } from '../../api/cartService';

const NavBar = () => {
  const navigate = useNavigate()
  const { isLogged, logoutUser } = useContext(AuthContext);
  const [productsQuantityCart, setProductQuantityCart] = useState(0);

  useEffect(() => {
    findCart()
  }, []);

  const findCart = async() => {
    const cartId = localStorage.getItem('carrinhoId');

    try{
      const response = await findCartById(cartId);
      
      const productQuantity = response.data.produtos.reduce((acc, product) => acc + product.quantidade, 0);
      
      console.log(productQuantity)
      setProductQuantityCart(productQuantity);
    } catch (error){
      console.error(`Network Error: ${error}`);
      throw error;
    }
  }

  return (
    <header className='bg-transparent z-50 w-full'>
       <nav className='flex item-center max-w-screen-xl mx-auto px-6 py-3'>
        <div className='flex flex-grow items-center'>
          <img src={logo} alt='Logo' className='w-36 cursor-pointer' />
          <h1 className='text-center text-3xl font-semibold text-gray-700'>Food App</h1>
        </div>
        <div>
          {isLogged ? (
            <div className='flex items-center justify-end space-x-6'>
              {/* Carrinho de Compras */}
              <div className='relative flex items-center bg-slate-600'>
                <span className='bg-primary w-2 h-2 rounded-full absolute -right-2 -top-2'>{productsQuantityCart}</span>
                <BsFillCartFill onClick={() => navigate('/admin/my-cart')} className='w-6 h-6 cursor-pointer bg-white' aria-label="Carrinho de compras" />
              </div>

              {/* Informações do Usuário */}
              <div className='flex items-center space-x-2 cursor-pointer'>
                <p className='text-gray-700 text-sm'>Usuario</p>
                <button onClick={() => navigate('/admin')}>Admin</button>
                
                {/* Avatar do Usuário */}
                <img 
                  src='' 
                  alt='User' 
                  className='w-8 h-8 rounded-full border border-gray-300' 
                />
                <SlLogout
                  onClick={logoutUser}
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