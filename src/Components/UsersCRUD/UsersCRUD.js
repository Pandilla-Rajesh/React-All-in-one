import React, { useState } from 'react'
import { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } from '../../Services/UsersApi/UsersApi'

const UsersCRUD = () => {
    const { data: users, isLoading, error } = useGetUsersQuery()
    const [createUser] = useCreateUserMutation()
    const [updateUser] = useUpdateUserMutation()
    const [deleteUser] = useDeleteUserMutation()

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', username: '' })
    const [editingId, setEditingId] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleCreate = async () => {
        if (!formData.name.trim() || !formData.email.trim()) {
            alert('Name and Email are required')
            return
        }
        try {
            await createUser(formData).unwrap()
            setFormData({ name: '', email: '', phone: '', username: '' })
            setSuccessMessage('User created successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch (err) {
            console.error('Error creating user:', err)
        }
    }

    const handleUpdate = async () => {
        if (!editingId) return
        try {
            await updateUser({ id: editingId, ...formData }).unwrap()
            setFormData({ name: '', email: '', phone: '', username: '' })
            setEditingId(null)
            setSuccessMessage('User updated successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch (err) {
            console.error('Error updating user:', err)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this user?')) return
        try {
            await deleteUser(id).unwrap()
            setSuccessMessage('User deleted successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch (err) {
            console.error('Error deleting user:', err)
        }
    }

    const handleEdit = (user) => {
        setFormData({ name: user.name, email: user.email, phone: user.phone, username: user.username })
        setEditingId(user.id)
    }

    if (isLoading) return <p className='text-center p-5'>Loading users...</p>
    if (error) return <p className='text-red-600 text-center p-5'>Error loading users</p>

    return (
        <section className='bg-gradient-to-br from-blue-500 to-blue-900 p-5'>
            <div className='container mx-auto'>
                <h1 className='text-3xl font-bold text-white mb-5 text-center'>Users CRUD Management</h1>

                {successMessage && (
                    <div className='bg-green-500 text-white p-3 rounded-lg mb-3 text-center'>
                        {successMessage}
                    </div>
                )}

                {/* Form */}
                <div className='bg-white rounded-lg p-5 mb-5'>
                    <h2 className='text-2xl font-bold mb-4'>{editingId ? 'Edit User' : 'Add New User'}</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <input
                            type='text'
                            name='name'
                            placeholder='Name'
                            value={formData.name}
                            onChange={handleInputChange}
                            className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                        />
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleInputChange}
                            className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                        />
                        <input
                            type='text'
                            name='phone'
                            placeholder='Phone'
                            value={formData.phone}
                            onChange={handleInputChange}
                            className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                        />
                        <input
                            type='text'
                            name='username'
                            placeholder='Username'
                            value={formData.username}
                            onChange={handleInputChange}
                            className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='flex gap-2 mt-4'>
                        <button
                            onClick={editingId ? handleUpdate : handleCreate}
                            className={`flex-1 px-4 py-2 text-white font-bold rounded-lg ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                            {editingId ? 'Update User' : 'Add User'}
                        </button>
                        {editingId && (
                            <button
                                onClick={() => { setFormData({ name: '', email: '', phone: '', username: '' }); setEditingId(null) }}
                                className='flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg'
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

                {/* Users List */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {users?.length > 0 ? (
                        users.map((user) => (
                            <div className='bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition' key={user.id}>
                                <h3 className='font-bold text-lg text-gray-800 mb-2'>{user.name}</h3>
                                <p className='text-sm text-gray-600 mb-1'><strong>Email:</strong> {user.email}</p>
                                <p className='text-sm text-gray-600 mb-1'><strong>Phone:</strong> {user.phone}</p>
                                <p className='text-sm text-gray-600 mb-3'><strong>Username:</strong> {user.username}</p>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className='flex-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-bold'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className='flex-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-bold'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-white col-span-full text-center'>No users found</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default UsersCRUD
