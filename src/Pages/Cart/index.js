import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { addOrder, send } from '../../api/orderService';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext'

const Cart = () => {
    const navigate = useNavigate();
    const { userFull } = useContext(AuthContext);
    const [productCart, setProductCart] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [frete] = useState(5);
    const [address, setAddress] = useState({
        rua: '',
        numero: '',
        complemento: '',
        cep: ''
    });

    useEffect(() => {
        const storedCart = localStorage.getItem('productCart');
        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart);
                setProductCart(parsedCart);
                const total = parsedCart.reduce((acc, product) => acc + product.precoUnitario, 0);
                setTotalValue(total);
            } catch (error) {
                console.error('Erro ao analisar o localStorage:', error);
            }
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target
    
        setAddress(prev => ({
          ...prev,
          [name]: value
        }))
      }

    const remove = (id) => {
        const storageCart = JSON.parse(localStorage.getItem('productCart'));
        const filterCart = storageCart.filter(product => product._id !== id);
        localStorage.setItem('productCart', JSON.stringify(filterCart));
        setProductCart(filterCart);
    }

    const findAddress = async() => {
        const response = await axios.get(`https://viacep.com.br/ws/${address.cep}/json`);
        setAddress({
            ...address,
            rua: `${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade}`
        })
    }

    const sendOrder = async() => {
        const productsOrder = productCart.map(product => {
            return {
                _id: product._id,
                quantidade: product.quantity
            }
        });
        
        const cartInfo = {
            produtos: productsOrder,
            frete: 5,
            precoTotal: totalValue,
            userId: userFull.user._id
        }

        try {
          const response = await send(cartInfo);
          if(response.data){
            const order = {
                name: response.data.nome,
                produtos: productsOrder,
                precoTotal: totalValue + frete,
                frete: frete,
                concluido: true
            }
            const responseOrder = await addOrder(order);
            if(responseOrder.data) {
                localStorage.removeItem('productCart');
                navigate('/complete');   
            }
          }
        } catch(error) {
          throw error;
        }
    }

    return(
        <main className='h-screen banner'>
            <div className='max-w-screen-xl py-20 mx-auto px-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>
                    <div className='col-span-1'>
                        <div className='flex flex-col mt-20'>
                            <h2 className='text-2xl poppins pb-4 border-b border-gray-500 text-gray-700'>
                                Adicione seu endereço
                            </h2>
                            <form className='my-4'>
                                <div className='flex flex-col space-y-3'>
                                    <input
                                        className='w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-400 focus:ring-4 focus:outline-none transition duration-300 focus:shadow-xl'
                                        type='text' name='cep' placeholder='cep:' id='cep'
                                        value={address.cep}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className='w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-400 focus:ring-4 focus:outline-none transition duration-300 focus:shadow-xl'
                                        type='text' name='rua' placeholder='rua:' id='rua'
                                        value={address.rua}
                                        onFocus={findAddress}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className='w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-400 focus:ring-4 focus:outline-none transition duration-300 focus:shadow-xl'
                                        type='text' name='numero' placeholder='numero:' id='numero'
                                        value={address.numero}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className='w-full px-4 py-3 rounded-lg ring-red-200 border border-gray-400 focus:ring-4 focus:outline-none transition duration-300 focus:shadow-xl'
                                        type='text' name='complemento' placeholder='complemento:' id='complemento'
                                        value={address.complemento}
                                        onChange={handleChange}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='flex flex-col space-y-3 mt-20'>
                        {productCart.map(product => (
                            <div key={product._id} className='rounded-lg p-4 flex space-x-3'>
                                <div className='flex'>
                                    <img className='w-24 object-contain' src={product.imagem} alt={product.nome} />
                                </div>
                                <div className='flex flex-col space-y-3 flex-grow'>
                                    <h5 className='text-base poppins text-gray-700'>{product.nome}</h5>
                                    <h3 className='font-semibold text-lg text-primary poppins'>{product.precoUnitario}</h3>
                                </div>
                                <div className='flex items-center px-4 py-2 space-x-3'>
                                    <span className='text-lg text-gray-500 select-none'>
                                        {product.quantity}un
                                    </span>
                                </div>
                                <div className='flex flex-col items-center justity-center'>
                                    <AiOutlineDelete onClick={() => remove(product._id)} className='w-6 h-6 text-gray-600 transform transition hover:scale-105 duration-500 cursor-pointer' />
                                </div>
                            </div>
                        ))}
                        <div className='flex flex-col space-y-3 my-4'>
                            <div className='flex items-center'>
                                <span className='flex-grow poppins text-gray-700'>
                                    Total
                                </span>

                                <span className='flex-grow poppins text-gray-700'>
                                    ${totalValue}
                                </span>
                            </div>
                            <div className='flex items-center'>
                                <span className='flex-grow poppins text-gray-700'>
                                    Taxa de Entrega
                                </span>

                                <span className='flex-grow poppins text-gray-700'>
                                    5
                                </span>
                            </div>
                            <div className='flex items-center'>
                                <span className='flex-grow poppins text-gray-700'>
                                    Total + Taxa
                                </span>

                                <span className='flex-grow poppins text-gray-700'>
                                    R${totalValue + 5} 
                                </span>
                            </div>
                            <div className='flex flex-col space-y4 mb-3'>
                                <p className='poppins text-gray-700'>
                                    Endereço de Entrega
                                </p>
                                <span className='font-semibold text-black'>
                                    {address.rua}
                                </span>
                                <span className='font-semibold text-black'>
                                    {address.cep}
                                </span>
                                <span className='font-semibold text-black'>
                                    {address.complemento}
                                </span>
                                <span className='font-semibold text-black'>
                                    {address.numero}
                                </span>
                            </div>
                            <div>
                                <button onClick={sendOrder} className='w-full px-6 py-3 rounded-lg bg-primary text-white poppins ring-red-300 focus:ring-4 transition duration-500'>
                                    Enviar Pedido
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Cart;