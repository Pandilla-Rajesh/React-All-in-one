import React, { useState } from 'react'
import { useGetPhotosQuery, useCreatePhotoMutation, useUpdatePhotoMutation, useDeletePhotoMutation } from '../../Services/PhotosApi/PhotosApi'

const PhotosCRUD = () => {
    const { data: photos, isLoading, error } = useGetPhotosQuery()
    const [createPhoto] = useCreatePhotoMutation()
    const [updatePhoto] = useUpdatePhotoMutation()
    const [deletePhoto] = useDeletePhotoMutation()

    const [formData, setFormData] = useState({ title: '', url: '', thumbnailUrl: '', albumId: 1 })
    const [editingId, setEditingId] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'albumId' ? parseInt(value) : value
        }))
    }

    const handleCreate = async () => {
        if(!formData.title.trim() || !formData.url.trim()) {
            alert('Title and URL are required')
            return
        }
        try {
            await createPhoto(formData).unwrap()
            setFormData({ title: '', url: '', thumbnailUrl: '', albumId: 1 })
            setSuccessMessage('Photo created successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch(err) {
            console.error('Error creating photo:', err)
        }
    }

    const handleUpdate = async () => {
        if(!editingId) return
        try {
            await updatePhoto({ id: editingId, ...formData }).unwrap()
            setFormData({ title: '', url: '', thumbnailUrl: '', albumId: 1 })
            setEditingId(null)
            setSuccessMessage('Photo updated successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch(err) {
            console.error('Error updating photo:', err)
        }
    }

    const handleDelete = async (id) => {
        if(!window.confirm('Delete this photo?')) return
        try {
            await deletePhoto(id).unwrap()
            setSuccessMessage('Photo deleted successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch(err) {
            console.error('Error deleting photo:', err)
        }
    }

    const handleEdit = (photo) => {
        setFormData({
            title: photo.title,
            url: photo.url,
            thumbnailUrl: photo.thumbnailUrl,
            albumId: photo.albumId
        })
        setEditingId(photo.id)
    }

    if(isLoading) return <p className='text-center p-5'>Loading photos...</p>
    if(error) return <p className='text-red-600 text-center p-5'>Error loading photos</p>

    return (
        <section className='bg-gradient-to-br from-pink-500 to-pink-900 p-5'>
            <div className='container mx-auto'>
                <h1 className='text-3xl font-bold text-white mb-5 text-center'>Photos CRUD Management</h1>

                { successMessage && (
                    <div className='bg-green-500 text-white p-3 rounded-lg mb-3 text-center'>
                        { successMessage }
                    </div>
                ) }

                {/* Form */ }
                <div className='bg-white rounded-lg p-5 mb-5'>
                    <h2 className='text-2xl font-bold mb-4'>{ editingId ? 'Edit Photo' : 'Add New Photo' }</h2>
                    <div className='space-y-4'>
                        <input
                            type='text'
                            name='title'
                            placeholder='Photo Title'
                            value={ formData.title }
                            onChange={ handleInputChange }
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500'
                        />
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <input
                                type='text'
                                name='url'
                                placeholder='Image URL'
                                value={ formData.url }
                                onChange={ handleInputChange }
                                className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500'
                            />
                            <input
                                type='text'
                                name='thumbnailUrl'
                                placeholder='Thumbnail URL'
                                value={ formData.thumbnailUrl }
                                onChange={ handleInputChange }
                                className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500'
                            />
                            <input
                                type='number'
                                name='albumId'
                                placeholder='Album ID'
                                value={ formData.albumId }
                                onChange={ handleInputChange }
                                min='1'
                                className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500'
                            />
                        </div>
                    </div>
                    <div className='flex gap-2 mt-4'>
                        <button
                            onClick={ editingId ? handleUpdate : handleCreate }
                            className={ `flex-1 px-4 py-2 text-white font-bold rounded-lg ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}` }
                        >
                            { editingId ? 'Update Photo' : 'Add Photo' }
                        </button>
                        { editingId && (
                            <button
                                onClick={ () => { setFormData({ title: '', url: '', thumbnailUrl: '', albumId: 1 }); setEditingId(null) } }
                                className='flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg'
                            >
                                Cancel
                            </button>
                        ) }
                    </div>
                </div>

                {/* Photos List */ }
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    { photos?.length > 0 ? (
                        photos.slice(0, 12).map((photo) => (
                            <div className='bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition' key={ photo.id }>
                                { photo.thumbnailUrl && (
                                    <img
                                        src={ photo.thumbnailUrl }
                                        alt={ photo.title }
                                        className='w-full h-40 object-cover rounded mb-3 hover:scale-105 transition'
                                    />
                                ) }
                                <h3 className='font-bold text-sm text-gray-800 mb-2 line-clamp-2'>{ photo.title }</h3>
                                <p className='text-xs text-gray-600 mb-2'><strong>Album:</strong> { photo.albumId }</p>
                                <p className='text-xs text-gray-600 mb-3'><strong>ID:</strong> { photo.id }</p>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={ () => handleEdit(photo) }
                                        className='flex-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-bold'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={ () => handleDelete(photo.id) }
                                        className='flex-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-bold'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-white col-span-full text-center'>No photos found</p>
                    ) }
                </div>
            </div>
        </section>
    )
}

export default PhotosCRUD
