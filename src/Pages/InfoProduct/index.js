import React, { useState, useEffect } from 'react'
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import { findById } from '../../api/productService'

const ProductInfo = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductById();
  },[])

  const getProductById = async() => {
    try {
      const response = await findById(id);
      setProduct(response.data);
    } catch(error) {
      throw error;
    }
  }

  const addToCart = () => {
    const productCart = [
      {
        ...product,
        quantity: quantity,
      }
    ]
    console.log(productCart)
    const storageCart = JSON.stringify(localStorage.getItem('productCart'));

    if(storageCart) {
      productCart.push([
        ...storageCart
      ])
      localStorage.setItem('productCart', JSON.stringify(productCart));
    }

    localStorage.setItem('productCart', JSON.stringify(productCart));
    navigate('/Cart');
  }

  return (
    <div className='max-w-screen mx-auto px-6 my-16'>
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10'>
          <div className='order-2 md:order-1 lg:order-1 flex flex-col justify-center'>
            <h1 className='text-center md:text-left lg:text-left text-3xl lg:text-4xl font-semibold poppins pb-4 text-gray-700 select-none'>
              {product.nome}
            </h1>
            <p className='text-center md:text-left lg:text-left text-sm text-gray-500 leading-relaxed select-none'>
              {product.descricao}
            </p>
            <div className='flex flex-center justify-center md:justify-start lg:justify-start space-x-6 pt-8'>
              <h2 className='text-3xl font-bold text-black poppins select-none'>{product.precoUnitario}</h2>
              <div className='flex  items-center border border-gray-200 px-4 py-2 space-x-6 rounded-full'>
                <AiOutlineMinusSquare
                  onClick={() => {
                    quantity === 1 ? setQuantity(1) : setQuantity(quantity - 1)
                  }}
                  className='w-8 h-8 rounded-full' />
                <span className='text-lg text-gray-700 poppins select-none'>{quantity}</span>
                <AiOutlinePlusSquare
                  onClick={() => {setQuantity(quantity + 1)}}
                  className='w-8 h-8 rounded-full' />
              </div>
              <div className='mt-8 flex flex-center justify-center md:justify-start lg:justify-start space-x-6 pt-8'>
                <button onClick={addToCart} className=''>
                  <FiShoppingCart className='text-xl' />
                  <span>Add</span>
                </button>
              </div>
            </div>
            <div className='order-1 md:order-2 lg:order-2'>
              <img src={product.imagem} alt='' className='w-3/4 md:w-3/4 lg:w-full mx-auto' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo;