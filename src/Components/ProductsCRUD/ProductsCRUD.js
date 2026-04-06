import React, { useState } from 'react'
import { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '../../Services/ProductsApi/ProductsApi'

const ProductsCRUD = () => {
    const { data: products, isLoading, error } = useGetProductsQuery()
    const [createProduct] = useCreateProductMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    const [formData, setFormData] = useState({ title: '', price: '', description: '', image: '' })
    const [editingId, setEditingId] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleCreate = async () => {
        if(!formData.title.trim() || !formData.price) {
            alert('Title and Price are required')
            return
        }
        try {
            await createProduct({ ...formData, price: parseFloat(formData.price) }).unwrap()
            setFormData({ title: '', price: '', description: '', image: '' })
            setSuccessMessage('Product created successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch(err) {
            console.error('Error creating product:', err)
        }
    }

    const handleUpdate = async () => {
        if(!editingId) return
        try {
            await updateProduct({ id: editingId, ...formData, price: parseFloat(formData.price) }).unwrap()
            setFormData({ title: '', price: '', description: '', image: '' })
            setEditingId(null)
            setSuccessMessage('Product updated successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch(err) {
            console.error('Error updating product:', err)
        }
    }

    const handleDelete = async (id) => {
        if(!window.confirm('Delete this product?')) return
        try {
            await deleteProduct(id).unwrap()
            setSuccessMessage('Product deleted successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch(err) {
            console.error('Error deleting product:', err)
        }
    }

    const handleEdit = (product) => {
        setFormData({
            title: product.title,
            price: product.price,
            description: product.description,
            image: product.image
        })
        setEditingId(product.id)
    }

    if(isLoading) return <p className='text-center p-5'>Loading products...</p>
    if(error) return <p className='text-red-600 text-center p-5'>Error loading products</p>

    return (
        <section className='bg-gradient-to-br from-green-500 to-green-900 p-5'>
            <div className='container mx-auto'>
                <h1 className='text-3xl font-bold text-white mb-5 text-center'>Products CRUD Management</h1>

                { successMessage && (
                    <div className='bg-green-500 text-white p-3 rounded-lg mb-3 text-center'>
                        { successMessage }
                    </div>
                ) }

                {/* Form */ }
                <div className='bg-white rounded-lg p-5 mb-5'>
                    <h2 className='text-2xl font-bold mb-4'>{ editingId ? 'Edit Product' : 'Add New Product' }</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <input
                            type='text'
                            name='title'
                            placeholder='Product Title'
                            value={ formData.title }
                            onChange={ handleInputChange }
                            className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500'
                        />
                        <input
                            type='number'
                            name='price'
                            placeholder='Price'
                            value={ formData.price }
                            onChange={ handleInputChange }
                            step='0.01'
                            className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500'
                        />
                        <textarea
                            name='description'
                            placeholder='Description'
                            value={ formData.description }
                            onChange={ handleInputChange }
                            rows='2'
                            className='px-4 py-2 col-span-1 md:col-span-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500'
                        />
                        <input
                            type='text'
                            name='image'
                            placeholder='Image URL'
                            value={ formData.image }
                            onChange={ handleInputChange }
                            className='px-4 py-2 col-span-1 md:col-span-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500'
                        />
                    </div>
                    <div className='flex gap-2 mt-4'>
                        <button
                            onClick={ editingId ? handleUpdate : handleCreate }
                            className={ `flex-1 px-4 py-2 text-white font-bold rounded-lg ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}` }
                        >
                            { editingId ? 'Update Product' : 'Add Product' }
                        </button>
                        { editingId && (
                            <button
                                onClick={ () => { setFormData({ title: '', price: '', description: '', image: '' }); setEditingId(null) } }
                                className='flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg'
                            >
                                Cancel
                            </button>
                        ) }
                    </div>
                </div>

                {/* Products List */ }
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    { products?.length > 0 ? (
                        products.slice(0, 12).map((product) => (
                            <div className='bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition' key={ product.id }>
                                { product.image && (
                                    <img
                                        src={ product.image }
                                        alt={ product.title }
                                        className='w-full h-40 object-cover rounded mb-3'
                                    />
                                ) }
                                <h3 className='font-bold text-lg text-gray-800 mb-2 line-clamp-2'>{ product.title }</h3>
                                <p className='text-sm text-gray-600 mb-2 line-clamp-2'>{ product.description }</p>
                                <p className='text-xl font-bold text-green-600 mb-3'>${ product.price }</p>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={ () => handleEdit(product) }
                                        className='flex-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-bold'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={ () => handleDelete(product.id) }
                                        className='flex-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-bold'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-white col-span-full text-center'>No products found</p>
                    ) }
                </div>
            </div>
        </section>
    )
}

export default ProductsCRUD
