import React, { useState } from 'react'
import { useGetCommentsQuery, useCreateCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation } from '../../Services/CommentsApi/CommentsApi'

const CommentsCRUD = () => {
    const { data: comments, isLoading, error } = useGetCommentsQuery()
    const [createComment] = useCreateCommentMutation()
    const [updateComment] = useUpdateCommentMutation()
    const [deleteComment] = useDeleteCommentMutation()

    const [formData, setFormData] = useState({ name: '', email: '', body: '', postId: 1 })
    const [editingId, setEditingId] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'postId' ? parseInt(value) : value
        }))
    }

    const handleCreate = async () => {
        if(!formData.name.trim() || !formData.body.trim()) {
            alert('Name and Comment are required')
            return
        }
        try {
            await createComment(formData).unwrap()
            setFormData({ name: '', email: '', body: '', postId: 1 })
            setSuccessMessage('Comment created successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch(err) {
            console.error('Error creating comment:', err)
        }
    }

    const handleUpdate = async () => {
        if(!editingId) return
        try {
            await updateComment({ id: editingId, ...formData }).unwrap()
            setFormData({ name: '', email: '', body: '', postId: 1 })
            setEditingId(null)
            setSuccessMessage('Comment updated successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch(err) {
            console.error('Error updating comment:', err)
        }
    }

    const handleDelete = async (id) => {
        if(!window.confirm('Delete this comment?')) return
        try {
            await deleteComment(id).unwrap()
            setSuccessMessage('Comment deleted successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch(err) {
            console.error('Error deleting comment:', err)
        }
    }

    const handleEdit = (comment) => {
        setFormData({
            name: comment.name,
            email: comment.email,
            body: comment.body,
            postId: comment.postId
        })
        setEditingId(comment.id)
    }

    if(isLoading) return <p className='text-center p-5'>Loading comments...</p>
    if(error) return <p className='text-red-600 text-center p-5'>Error loading comments</p>

    return (
        <section className='bg-gradient-to-br from-purple-500 to-purple-900 p-5'>
            <div className='container mx-auto'>
                <h1 className='text-3xl font-bold text-white mb-5 text-center'>Comments CRUD Management</h1>

                { successMessage && (
                    <div className='bg-green-500 text-white p-3 rounded-lg mb-3 text-center'>
                        { successMessage }
                    </div>
                ) }

                {/* Form */ }
                <div className='bg-white rounded-lg p-5 mb-5'>
                    <h2 className='text-2xl font-bold mb-4'>{ editingId ? 'Edit Comment' : 'Add New Comment' }</h2>
                    <div className='space-y-4'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <input
                                type='text'
                                name='name'
                                placeholder='Your Name'
                                value={ formData.name }
                                onChange={ handleInputChange }
                                className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500'
                            />
                            <input
                                type='email'
                                name='email'
                                placeholder='Email'
                                value={ formData.email }
                                onChange={ handleInputChange }
                                className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500'
                            />
                            <input
                                type='number'
                                name='postId'
                                placeholder='Post ID'
                                value={ formData.postId }
                                onChange={ handleInputChange }
                                min='1'
                                className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500'
                            />
                        </div>
                        <textarea
                            name='body'
                            placeholder='Your Comment'
                            value={ formData.body }
                            onChange={ handleInputChange }
                            rows='3'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500'
                        />
                    </div>
                    <div className='flex gap-2 mt-4'>
                        <button
                            onClick={ editingId ? handleUpdate : handleCreate }
                            className={ `flex-1 px-4 py-2 text-white font-bold rounded-lg ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}` }
                        >
                            { editingId ? 'Update Comment' : 'Add Comment' }
                        </button>
                        { editingId && (
                            <button
                                onClick={ () => { setFormData({ name: '', email: '', body: '', postId: 1 }); setEditingId(null) } }
                                className='flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg'
                            >
                                Cancel
                            </button>
                        ) }
                    </div>
                </div>

                {/* Comments List */ }
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    { comments?.length > 0 ? (
                        comments.slice(0, 15).map((comment) => (
                            <div className='bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition' key={ comment.id }>
                                <div className='flex justify-between items-start mb-2'>
                                    <h3 className='font-bold text-gray-800'>{ comment.name }</h3>
                                    <span className='text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded'>#{ comment.id }</span>
                                </div>
                                <p className='text-xs text-gray-600 mb-2'><strong>Email:</strong> { comment.email }</p>
                                <p className='text-xs text-gray-600 mb-3'><strong>Post ID:</strong> { comment.postId }</p>
                                <p className='text-gray-700 text-sm mb-3 line-clamp-3'>{ comment.body }</p>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={ () => handleEdit(comment) }
                                        className='flex-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-bold'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={ () => handleDelete(comment.id) }
                                        className='flex-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-bold'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-white col-span-full text-center'>No comments found</p>
                    ) }
                </div>
            </div>
        </section>
    )
}

export default CommentsCRUD
