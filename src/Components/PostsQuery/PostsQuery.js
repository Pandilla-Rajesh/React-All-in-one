import React, { useState } from 'react'
import { useGetPostsQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } from '../../Services/PostsApi/PostsApi'

const PostsQuery = () => {

    const { data, error, isLoading } = useGetPostsQuery()
    const [createPost] = useCreatePostMutation()
    const [updatePost] = useUpdatePostMutation()
    const [deletePost] = useDeletePostMutation()

    const [formData, setFormData] = useState({ title: '', body: '', userId: 1 })
    const [editingId, setEditingId] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleCreatePost = async () => {
        if(!formData.title.trim() || !formData.body.trim()) {
            alert('Please fill in all fields')
            return
        }
        try {
            await createPost(formData).unwrap()
            setFormData({ title: '', body: '', userId: 1 })
            setSuccessMessage('Post data created successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch(err) {
            console.error('Error creating post:', err)
        }
    }

    const handleUpdatePost = async () => {
        if(!editingId || !formData.title.trim() || !formData.body.trim()) {
            alert('Please fill in all fields')
            return
        }
        try {
            await updatePost({ id: editingId, ...formData }).unwrap()
            setFormData({ title: '', body: '', userId: 1 })
            setEditingId(null)
            setSuccessMessage('Post updated successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch(err) {
            console.error('Error updating post:', err)
        }
    }

    const handleDeletePost = async (id) => {
        if(!window.confirm('Are you sure you want to delete this post?')) return
        try {
            await deletePost(id).unwrap()
            setSuccessMessage('Post deleted successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch(err) {
            console.error('Error deleting post:', err)
        }
    }

    const handleEditPost = (post) => {
        setFormData({ title: post.title, body: post.body, userId: post.userId })
        setEditingId(post.id)
    }

    const handleCancel = () => {
        setFormData({ title: '', body: '', userId: 1 })
        setEditingId(null)
    }

    if(isLoading) return <p className='text-center p-5'>...Loading</p>
    if(error) return <p className='text-center p-5 text-red-600'>Error fetching data</p>

    return (
        <section className='bg-gradient-to-tl from-violet-500 to-violet-900 p-5'>
            <div className='container mx-auto'>
                <div className='bg-violet-950 p-3 rounded-lg mb-3'>
                    <h1 className='text-3xl text-center text-slate-50 font-bold'>
                        CRUD Operations with RTK Query
                    </h1>
                </div>

                { successMessage && (
                    <div className='bg-green-500 text-white p-3 rounded-lg mb-3 text-center'>
                        { successMessage }
                    </div>
                ) }

                {/* CREATE/UPDATE FORM */ }
                <div className='bg-white rounded-lg p-5 mb-5'>
                    <h2 className='text-2xl font-bold mb-4 text-gray-800'>
                        { editingId ? 'Edit Post' : 'Create New Post' }
                    </h2>
                    <div className='space-y-4'>
                        <div>
                            <label className='block text-gray-700 font-bold mb-2'>Title</label>
                            <input
                                type='text'
                                name='title'
                                value={ formData.title }
                                onChange={ handleInputChange }
                                placeholder='Enter post title'
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500'
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700 font-bold mb-2'>Body</label>
                            <textarea
                                name='body'
                                value={ formData.body }
                                onChange={ handleInputChange }
                                placeholder='Enter post body'
                                rows='4'
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500'
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700 font-bold mb-2'>User ID</label>
                            <input
                                type='number'
                                name='userId'
                                value={ formData.userId }
                                onChange={ handleInputChange }
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500'
                            />
                        </div>
                        <div className='flex gap-2'>
                            <button
                                onClick={ editingId ? handleUpdatePost : handleCreatePost }
                                className={ `flex-1 px-4 py-2 rounded-lg text-white font-bold transition ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}` }
                            >
                                { editingId ? 'Update Post' : 'Create Post' }
                            </button>
                            { editingId && (
                                <button
                                    onClick={ handleCancel }
                                    className='flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-bold transition'
                                >
                                    Cancel
                                </button>
                            ) }
                        </div>
                    </div>
                </div>

                {/* READ - DISPLAY POSTS */ }
                <div>
                    <h2 className='text-2xl font-bold mb-4 text-white'>All Posts</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        { data?.length > 0 ? (
                            data.slice(0, 6)?.map((post) => (
                                <div className='bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition' key={ post.id }>
                                    <div className='mb-3 border-b pb-2'>
                                        <p className='text-sm text-gray-600'><strong>ID:</strong> { post.id }</p>
                                        <p className='text-sm text-gray-600'><strong>User:</strong> { post.userId }</p>
                                    </div>
                                    <div className='bg-orange-50 rounded p-2 mb-3'>
                                        <h3 className='font-bold text-gray-800 text-sm mb-2'>{ post.title }</h3>
                                        <p className='text-gray-700 text-xs line-clamp-2'>{ post.body }</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button
                                            onClick={ () => handleEditPost(post) }
                                            className='flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-bold text-sm transition'
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={ () => handleDeletePost(post.id) }
                                            className='flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-bold text-sm transition'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='text-white col-span-full text-center'>No posts found</p>
                        ) }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PostsQuery