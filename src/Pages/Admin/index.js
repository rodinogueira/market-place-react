import React from 'react'
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa'
const Admin = () => {
    const navigate = useNavigate()
    
    return (
        <section className='my-12 max-w-screen-xl mx-auto px-6'>
            <div className='flex justify-end space-y-2'>
                <button 
                    onClick={() => navigate('/add-product')}
                    className='w-44 bg-primary px-2 text-white ring-red-400 focus:outline-none  focus:ring-4 rounded-lg transition duration-300'
                >
                    Adiciona produto
                </button>
            </div>
            <div className='flex flex-col'>               
                <div className='overflow-x-auto sm:-mx-6 lm:-mx-8'>
                    <div className='py-2 inline-block min-w-full sm:px-6 lm:px-8'>                        
                        <div className='overflow-hidden sm:rounded-lg shadow-md'>
                            <table className='min-w-full'>
                                <thead className='bg-primary'>
                                    <tr>
                                        <th scope="col" className='text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider'>
                                            Imagem
                                        </th>
                                        <th scope="col" className='text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider'>
                                            Nome
                                        </th>
                                        <th scope="col" className='text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider'>
                                            Preço
                                        </th>
                                        <th scope="col" className='text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider'>
                                            Código de Barras
                                        </th>
                                        <th scope="col" className='relative px-6 py-3'>
                                            <span className='text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider'>Acoes</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='bg-white border-b'>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                            <img src='' alt='' />
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                            Produto 1
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                            10
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                            11111111
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap flex h-24 items-center justify-center'>
                                            <div className='flex flew-row items-center justify-center space-x-3'>
                                                <FaEdit className='cursor-pointer text-2x1 text-green-600' />
                                                <FaTrash className='cursor-pointer text-2x1 text-red-600' />
                                            </div>
                                        </td>
                                    </tr>   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Admin;