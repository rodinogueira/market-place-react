import React, { useState, useContext } from 'react';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useProduct } from '../../hooks/useProduct';
import { useCart } from '../../hooks/useCart';

const ProductInfo = () => {
  const navigate = useNavigate();
  const { userFull } = useContext(AuthContext);
  const { id } = useParams();

  const frete = 5;
  const product = useProduct(id);
  const { cart, addToCart } = useCart(userFull._id, frete);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart(product, quantity);
    navigate('/admin/my-cart');
  };

  if (!product) return <div>Carregando...</div>;

  return (
    <div className="max-w-screen mx-auto px-6 my-16">
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {/* Informações do Produto */}
          <div className="order-2 md:order-1 lg:order-1 flex flex-col justify-center">
            <h1 className="text-center md:text-left lg:text-left text-3xl lg:text-4xl font-semibold poppins pb-4 text-gray-700 select-none">
              {product.nome}
            </h1>
            <p className="text-center md:text-left lg:text-left text-sm text-gray-500 leading-relaxed select-none">
              {product.descricao}
            </p>
            <div className="flex flex-center justify-center md:justify-start lg:justify-start space-x-6 pt-8">
              <h2 className="text-3xl font-bold text-black poppins select-none">
                {product.precoUnitario}
              </h2>
              <div className="flex items-center border border-gray-200 px-4 py-2 space-x-6 rounded-full">
                <AiOutlineMinusSquare
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                <span className="text-lg text-gray-700 poppins select-none">{quantity}</span>
                <AiOutlinePlusSquare
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              </div>
              <button onClick={handleAddToCart} className="flex items-center">
                <FiShoppingCart className="text-xl" />
                <span className="ml-2">Add</span>
              </button>
            </div>
          </div>
          {/* Imagem do Produto */}
          <div className="order-1 md:order-2 lg:order-2">
            <img src={product.imagem} alt={product.nome} className="w-3/4 md:w-3/4 lg:w-full mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
