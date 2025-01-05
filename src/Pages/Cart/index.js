import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { findCartById } from '../../api/cartService';
import { addOrder, send } from '../../api/orderService';

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { carrinhoId } = location.state;
  const { userFull } = useContext(AuthContext);

  const [productCart, setProductCart] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [frete] = useState(5);
  const [address, setAddress] = useState({
    rua: '',
    numero: '',
    complemento: '',
    cep: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (carrinhoId) {
      fetchCart(carrinhoId).catch(err => setError(err.message));
    }
  }, [carrinhoId]);

  const fetchCart = async (cartId) => {
    try {
      const response = await findCartById(cartId);
      const jsonString = JSON.stringify(response.data.produtos);
      const parsedObject = JSON.parse(jsonString);
      setProductCart(parsedObject);

      const total = parsedObject.reduce(
        (acc, item) => acc + item.precoUnitario * item.quantity,
        0
      );
      setTotalValue(total);
    } catch (error) {
      throw new Error('Erro ao buscar o carrinho. Por favor, tente novamente.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const remove = (id) => {
    const storageCart = JSON.parse(localStorage.getItem('productCart'));
    const filteredCart = storageCart.filter((product) => product._id !== id);
    localStorage.setItem('productCart', JSON.stringify(filteredCart));
    setProductCart(filteredCart);

    const newTotal = filteredCart.reduce(
      (acc, item) => acc + item.precoUnitario * item.quantity,
      0
    );
    setTotalValue(newTotal);
  };

  const findAddress = async () => {
    if (address.cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${address.cep}/json`);
        setAddress({
          ...address,
          rua: `${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade}`,
        });
      } catch (error) {
        console.error('Erro ao buscar o CEP', error);
        setError('Erro ao buscar o CEP. Por favor, verifique o endereço e tente novamente.');
      }
    }
  };

  const sendOrder = async () => {
    setLoading(true);
    const productsOrder = productCart.map((product) => ({
      _id: product._id,
      quantidade: product.quantity,
    }));

    const cartInfo = {
      produtos: productsOrder,
      frete,
      precoTotal: totalValue,
      userId: userFull._id,
    };

    try {
      const response = await send(cartInfo);
      if (response.data) {
        const order = {
          name: response.data.nome,
          produtos: productsOrder,
          precoTotal: totalValue + frete,
          frete,
          concluido: true,
        };
        const responseOrder = await addOrder(order);
        if (responseOrder.data) {
          localStorage.removeItem('productCart');
          navigate('/complete');
        }
      }
    } catch (error) {
      setError('Erro ao enviar o pedido. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen banner">
      <div className="max-w-screen-xl py-20 mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl text-gray-700 border-b border-gray-500 pb-4">Adicione seu endereço</h2>
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
          <div className="space-y-3">
            {productCart.map((product) => (
              <div key={product._id} className="rounded-lg p-4 flex space-x-3">
                <img className="w-24 object-contain" src={product.imagem} alt={product.nome} />
                <div className="flex flex-col space-y-3 flex-grow">
                  <h5 className="text-base text-gray-700">{product.nome}</h5>
                  <h3 className="font-semibold text-lg text-primary">{product.precoUnitario}</h3>
                </div>
                <div className="flex items-center px-4 py-2 space-x-3">
                  <span className="text-lg text-gray-500">{product.quantity}un</span>
                </div>
                <AiOutlineDelete
                  onClick={() => remove(product._id)}
                  className="w-6 h-6 text-gray-600 transform transition hover:scale-105 duration-500 cursor-pointer"
                />
              </div>
            ))}
            <div className="my-4">
              <div className="flex items-center">
                <span className="flex-grow text-gray-700">Total</span>
                <span className="text-gray-700">${totalValue.toFixed(2)}</span>
              </div>
              <div className="flex items-center">
                <span className="flex-grow text-gray-700">Taxa de Entrega</span>
                <span className="text-gray-700">${frete}</span>
              </div>
              <div className="flex items-center">
                <span className="flex-grow text-gray-700">Total + Taxa</span>
                <span className="text-gray-700">${(totalValue + frete).toFixed(2)}</span>
              </div>
            </div>
            <div>
              {loading ? (
                <button className="w-full px-6 py-3 rounded-lg bg-gray-400 text-white cursor-not-allowed">
                  Enviando Pedido...
                </button>
              ) : (
                <button
                  onClick={sendOrder}
                  className="w-full px-6 py-3 rounded-lg bg-primary text-white transition duration-500 hover:bg-primary-dark focus:ring-4 focus:ring-red-300"
                >
                  Enviar Pedido
                </button>
              )}
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
