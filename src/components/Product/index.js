import React from 'react'

const Product = ({product}) => {
  return (
    <div className='bg-white border border-gray-100 transition transform duration-700 hover:scale-105 p-4 rounded-lg relative'>
      <span className='bg-white border border-red-500 rounded-full text-primary text-sm inline-block mb-4'>{product.categoria}</span>
      <img className='w-64 mx-auto transform transition duration-300 hover:scale-105' src={product.image} alt="" />
      <div className='flex flex-col items-center my-3 space-y-2'>
        <h1 className='text-gray-900 text-lg'>{product.nome}</h1>
        <p className='text-gray-500 text-sm text-center'>{product.descricao}</p>
        <h2 className='text-gray-900 text-2x1 font-bold'>{product.precoUnitario}</h2>
        <button className='bg-primary text-white px-8 py-2 rounded-full transition transform duration-300 hover:scale-105'>Pedir Agora</button>
      </div>
    </div>
  )
}

export default Product