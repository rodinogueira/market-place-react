import React, { useEffect, useState } from 'react'
import {findAllCategories} from '../../api/categoryService'

const AddProduct = () => {
  const [productForm, setProductForm] = useState({
    nome: '',
    descricao: '',
    precoUnitario: 0,
    imagem: '',
    codigoBarras: 0,
    categorias: [{ _id: '' }]
  })

  const [categories, setCategories] = useState([]);
  console.log(categories)

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    try{
      const response = await findAllCategories();
      setCategories(response)
    } catch(error) {
      console.error('Error during get categories:', error.message);
      throw error;
    }
  }

  return (
    <section className='my-12 max-w-screen-xl mx-auto px-6'>
        <div className='flex flex-col space-y-2'>
          <h1 className='text-2x1 text-gray-600'>Cadastro de Produtos</h1>
        </div>
        <form className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 mt-6'>
          <div className='flex flex-col space-y-4'>
            <label htmlFor='nome' className='text-gray-500 poppins'>Nome</label>
            <input
              className='w-full px-4 py-3 rounded-lg border border-gray-400 ring-red-200 focus:ring-4 focus:outline-none transition duration-300 focus:shadow-xl'
              type='text'
              id='nome'
              name='nome'
              required
            />
            <label htmlFor='descricao' className='text-gray-500 poppins'>Descrição</label>
            <textarea
              className='w-full px-4 py-3 rounded-lg border border-gray-400 ring-red-200 focus:ring-4 focus:outline-none transition duration-500 resize-none'
              id='descricao'
              name='descricao'
              cols='30'
              rows='5'
              required
            ></textarea>
            <label htmlFor='codigoBarra' className='text-gray-500 poppins'>Código de Barras</label>
            <input
              className='w-full px-4 py-3 rounded-lg border border-gray-400 ring-red-200 focus:ring-4 focus:outline-none transition duration-300 focus:shadow-xl'
              type='text'
              id='codigoBarra'
              name='codigoBarra'
              required
            />
          </div>
          <div className='flex flex-col space-y-4'>
            <label htmlFor='precoUnitario' className='text-gray-500 poppins'>Preço</label>
            <input
              className='w-full px-4 py-3 rounded-lg border border-gray-400 ring-red-200 focus:ring-4 focus:outline-none transition duration-300 focus:shadow-xl'
              type='text'
              id='preco'
              name='precoUnitario'
              required
            />
            <label htmlFor='imagem' className='text-gray-500 poppins'>Imagem</label>
            <input
              className='w-full px-4 py-3 rounded-lg border border-gray-400 ring-red-200 focus:ring-4 focus:outline-none transition duration-300 focus:shadow-xl'
              type='text'
              id='imagem'
              name='imagem'
              required
            />
            <label htmlFor='title' className='text-gray-500 poppins'>Categoria</label>
            <select
              className='w-full px-4 py-3 rounded-lg border border-gray-400 ring-red-200 focus:ring-4 focus:outline-none transition duration-300 focus:shadow-xl'
              id=''
              name=''
            >
              <option value=''></option>
            </select>
            <div className='mt-8'>
              <button className='w-full py-3 mt-6 bg-primary text-white focus:outline-none focus:ring-4 rounded-lg transition duration-300'>
                Adicionar
              </button>
            </div>
          </div>
        </form>
    </section>
  )
}

export default AddProduct