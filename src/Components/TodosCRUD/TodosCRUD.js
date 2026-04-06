import React, { useState } from 'react'
import { useGetTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from '../../Services/TodosApi/TodosApi'

const TodosCRUD = () => {
    const { data: todos, isLoading, error } = useGetTodosQuery()
    const [createTodo] = useCreateTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    const [formData, setFormData] = useState({ title: '', userId: 1, completed: false })
    const [editingId, setEditingId] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (name === 'userId' ? parseInt(value) : value)
        }))
    }

    const handleCreate = async () => {
        if(!formData.title.trim()) {
            alert('Title is required')
            return
        }
        try {
            await createTodo(formData).unwrap()
            setFormData({ title: '', userId: 1, completed: false })
            setSuccessMessage('Todo created successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch(err) {
            console.error('Error creating todo:', err)
        }
    }

    const handleUpdate = async () => {
        if(!editingId) return
        try {
            await updateTodo({ id: editingId, ...formData }).unwrap()
            setFormData({ title: '', userId: 1, completed: false })
            setEditingId(null)
            setSuccessMessage('Todo updated successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch(err) {
            console.error('Error updating todo:', err)
        }
    }

    const handleDelete = async (id) => {
        if(!window.confirm('Delete this todo?')) return
        try {
            await deleteTodo(id).unwrap()
            setSuccessMessage('Todo deleted successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch(err) {
            console.error('Error deleting todo:', err)
        }
    }

    const handleEdit = (todo) => {
        setFormData({
            title: todo.title,
            userId: todo.userId,
            completed: todo.completed
        })
        setEditingId(todo.id)
    }

    if(isLoading) return <p className='text-center p-5'>Loading todos...</p>
    if(error) return <p className='text-red-600 text-center p-5'>Error loading todos</p>

    return (
        <section className='bg-gradient-to-br from-yellow-500 to-yellow-900 p-5'>
            <div className='container mx-auto'>
                <h1 className='text-3xl font-bold text-white mb-5 text-center'>Todos CRUD Management</h1>

                { successMessage && (
                    <div className='bg-green-500 text-white p-3 rounded-lg mb-3 text-center'>
                        { successMessage }
                    </div>
                ) }

                {/* Form */ }
                <div className='bg-white rounded-lg p-5 mb-5'>
                    <h2 className='text-2xl font-bold mb-4'>{ editingId ? 'Edit Todo' : 'Add New Todo' }</h2>
                    <div className='space-y-4'>
                        <textarea
                            name='title'
                            placeholder='Todo Title'
                            value={ formData.title }
                            onChange={ handleInputChange }
                            rows='2'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500'
                        />
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <input
                                type='number'
                                name='userId'
                                placeholder='User ID'
                                value={ formData.userId }
                                onChange={ handleInputChange }
                                min='1'
                                className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500'
                            />
                            <label className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg'>
                                <input
                                    type='checkbox'
                                    name='completed'
                                    checked={ formData.completed }
                                    onChange={ handleInputChange }
                                    className='w-4 h-4'
                                />
                                <span className='text-gray-700'>Mark as Completed</span>
                            </label>
                        </div>
                    </div>
                    <div className='flex gap-2 mt-4'>
                        <button
                            onClick={ editingId ? handleUpdate : handleCreate }
                            className={ `flex-1 px-4 py-2 text-white font-bold rounded-lg ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}` }
                        >
                            { editingId ? 'Update Todo' : 'Add Todo' }
                        </button>
                        { editingId && (
                            <button
                                onClick={ () => { setFormData({ title: '', userId: 1, completed: false }); setEditingId(null) } }
                                className='flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg'
                            >
                                Cancel
                            </button>
                        ) }
                    </div>
                </div>

                {/* Todos List */ }
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    { todos?.length > 0 ? (
                        todos.slice(0, 15).map((todo) => (
                            <div
                                className={ `rounded-lg p-4 shadow-lg hover:shadow-xl transition ${todo.completed ? 'bg-gray-300' : 'bg-white'}` }
                                key={ todo.id }
                            >
                                <div className='flex items-start gap-2 mb-2'>
                                    <span className={ `font-bold text-sm ${todo.completed ? 'text-gray-600' : 'text-yellow-600'}` }>
                                        #{ todo.id }
                                    </span>
                                    { todo.completed && <span className='bg-green-500 text-white text-xs px-2 py-1 rounded'>✓ Done</span> }
                                </div>
                                <p className={ `text-gray-800 mb-3 line-clamp-2 ${todo.completed ? 'line-through' : ''}` }>
                                    { todo.title }
                                </p>
                                <p className='text-sm text-gray-600 mb-3'><strong>User:</strong> { todo.userId }</p>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={ () => handleEdit(todo) }
                                        className='flex-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-bold'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={ () => handleDelete(todo.id) }
                                        className='flex-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-bold'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-white col-span-full text-center'>No todos found</p>
                    ) }
                </div>
            </div>
        </section>
    )
}

export default TodosCRUD
