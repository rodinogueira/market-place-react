import React, { useState, useEffect } from 'react'
import Product from '../Product'
import { findAll } from '../../api/productService';

const ProductList = () => {
  const [categorias] = useState(['Hamburguer', 'Brasileira', 'Japonesa'])
  const [categoriaAtiva, setCategoriaAtiva] = useState('Hamburguer');
  const [products, setProducts] = useState([])

  useEffect(() => {
      findAllProducts()
  }, []);

  const findAllProducts = async () => {
      try{
          const response = await findAll();
          console.log(response.data)
          setProducts(response.data);
      } catch(error) {
          throw error;
      }
  }
  console.log(categoriaAtiva);
  return (
    <section className='my-12 max-w-screen-xl mx-auto px-3'>
        <div className='flex items-center justify-center space-x-6 '>
          {categorias.map((categoria) => (
            <p className={categoriaAtiva === categoria ? 'menu-tab bg-primary border rounded-full' : 'menu-tab'} onClick={() => setCategoriaAtiva(categoria)}>{categoria}</p>
          ))}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12'>    
          {products.map((product) => (
            <Product key={product._id} product={product}/>
          ))}        
        </div>
    </section>
  )
}   

export default ProductList;