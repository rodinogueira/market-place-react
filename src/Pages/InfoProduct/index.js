import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import { findProductById } from '../../api/productService';
import { createCart, findCartById, updateCart } from '../../api/cartService';
import { AuthContext } from '../../context/AuthContext';

const ProductInfo = () => {
  const navigate = useNavigate();
  const [frete] = useState(5);
  const { userFull } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [cartId, setCartId] = useState('');
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getProductById();
    if (cartId) {
      findCart(cartId);
    }
  }, [cartId]);

  useEffect(() => {
    const storedCartId = localStorage.getItem("carrinhoId");
    if (storedCartId) setCartId(storedCartId);
  }, []);

  const getProductById = async () => {
    try {
      const response = await findProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    }
  };

  const addToCart = async () => {
    try {
      const productToAdd = { ...product, quantidade: quantity };
  
      const updatedCart = [...cart];
      const existingProductIndex = updatedCart.findIndex((item) => item._id === productToAdd._id);
  
      if (existingProductIndex > -1) {
        updatedCart[existingProductIndex].quantidade += productToAdd.quantidade;
      } else {
        updatedCart.push(productToAdd);
      }
  
      const precoProdutos = updatedCart.reduce((acc, item) => {
        const precoUnitario = Number(item.precoUnitario) || 0;
        const quantidade = Number(item.quantidade) || 0;
        return acc + precoUnitario * quantidade;
      }, 0);
  
      const precoTotal = precoProdutos + frete;
  
      const cartData = {
        produtos: updatedCart.map((item) => ({
          _id: item._id,
          quantidade: item.quantidade,
        })),
        frete,
        precoTotal,
        userId: userFull._id,
      };
  
      if (cartId && cartId !== "") {
        console.log("Atualizando carrinho existente, ID:", cartId);
        await updateCart(cartId, cartData);
        setCart(updatedCart);
        navigate('/admin/my-cart', { state: { carrinhoId: cartId } });
        // navigate('/cart', { state: { carrinhoId: cartId } });
      } else {
        const response = await createCart(cartData);
        const newCartId = response.data._id;
      
        setCartId(newCartId);
        localStorage.setItem("carrinhoId", newCartId);
        setCart(updatedCart);
        navigate('/admin/my-cart', { state: { carrinhoId: newCartId } });
        // navigate('/cart', { state: { carrinhoId: cartId } });
      }
      
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      throw error;
    }
  };
  

  const findCart = async (id) => {
    try {
      const response = await findCartById(id);
      setCart(response.data.produtos || []);
    } catch (error) {
      console.error(`Erro ao buscar carrinho: ${error}`);
    }
  };

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
              <div className='flex items-center border border-gray-200 px-4 py-2 space-x-6 rounded-full'>
                <AiOutlineMinusSquare
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className='w-8 h-8 rounded-full'
                />
                <span className='text-lg text-gray-700 poppins select-none'>{quantity}</span>
                <AiOutlinePlusSquare
                  onClick={() => setQuantity(quantity + 1)}
                  className='w-8 h-8 rounded-full'
                />
              </div>
              <button onClick={addToCart} className='flex items-center'>
                <FiShoppingCart className='text-xl' />
                <span className='ml-2'>Add</span>
              </button>
            </div>
          </div>
          <div className='order-1 md:order-2 lg:order-2'>
            <img src={product.imagem} alt='' className='w-3/4 md:w-3/4 lg:w-full mx-auto' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
