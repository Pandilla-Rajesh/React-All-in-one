import axios from "axios";
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {

    const [sign, setSign] = useState({
        userName: '',
        password: ''
    })

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const [showPassword, setShowPassword] = useState(false)

    const toggleVisible = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setSign({ ...sign, [name]: value })
        console.log(sign, 'sign in details')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        alert(JSON.stringify(sign, null, 2))
        const errors = {}
        setLoading(true)
        if(!sign.userName.trim()) {
            errors.userName = 'Please enter Username'
        } else if(!/^[a-zA-Z]+$/.test(sign.userName)) {
            errors.userName = 'user name only letters'
        }

        if(!sign.password.trim()) {
            errors.password = 'please enter password'
        }

        if(Object.keys(errors).length === 0) {
            setError({})
            setSign({ userName: '', password: '' })
        } else {
            setError(errors)
            return;
        }

        if(!errors.userName && !errors.password) {
            alert('form submitted successfully')
        }
        try {
            setLoading(true)
            const response = await axios.post('https://dummyjson.com/auth/login', {

                username: sign.userName,
                password: sign.password
            })

            const data = response.data
            console.log(data, 'login success')

            localStorage.setItem('authToken', data.token);
            sessionStorage.setItem('authToken', data.token)
            navigate('/home')

        } catch(error) {
            console.log(error.message, 'login error')
            setError({ api: error.response?.data?.message || error.message })
        } finally {
            setLoading(false)
        }
    }

    // useEffect(()=>{

    //     const interval = setInterval(()=>{
    //         console.log('runing...')
    //     }, 1000)

    //     return () => clearInterval(interval)
    // }, [])

    return (
        <>
            <section className=' bg-slate-700 h-full'>
                <div className=' container ms-auto'>
                    <div className=' flex h-dvh justify-center items-center'>
                        <div className=' grid grid-cols-1 w-full max-w-lg'>
                            <div className=' bg-slate-100 shadow-lg hover:shadow-lg transition-xl p-8 rounded-lg hidden'>
                                <div className='flex flex-wrap items-center flex-col w-full'>
                                    <h1 className=' text-5xl font-bold text-center text-orange-600'>Sign In</h1>
                                    <form className='w-full' onSubmit={ handleSubmit }>
                                        <label className=' block'>
                                            <span className='block text-md font-medium text-slate-950'>User Name</span>
                                        </label>
                                        <div className='flex items-center w-full bg-white rounded-lg border
                                     border-gray-300 shadow-sm focus:focus-within:ring-2  px-2 py-2'>
                                            <input type="text" className={ `w-full px-2 py-2 focus:outline-none
                                        ${error.userName ? 'is-invalid' : ''}` } minLength={ 5 } maxLength={ 10 }
                                                onChange={ handleChange } name='userName' value={ sign.userName } />
                                            <span className='text-gray-400 hover:text-gray-500 px-2 py-2'>
                                                <i className="bi bi-person"></i>
                                            </span>
                                        </div>
                                        <p>{ error.userName && <small className=' text-orange-700'>{ error.userName }</small> }</p>
                                        <div className='mb-3'>
                                            <label className='block'>
                                                <span className='block text-md font-medium text-slate-950'>Password</span>
                                            </label>
                                            <div className={ `flex items-center w-full px-2 py-2 bg-white border border-gray-300 rounded-md 
                                    shadow-sm focus-within:ring-2
                                     focus-within:ring-blue-500 ${error.password ? 'is-invalid' : ''}` }>
                                                <input
                                                    type={ showPassword ? 'text' : 'password' }
                                                    name="password"
                                                    value={ sign.password }
                                                    onChange={ handleChange }
                                                    className="w-full px-2 py-2 focus:outline-none"
                                                    placeholder="Enter your password"
                                                />
                                                <button type="button" className="text-gray-500 focus:outline-none hover:text-gray-800 px-2 py-2"
                                                    onClick={ toggleVisible }>
                                                    { showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i> }
                                                </button>
                                            </div>
                                            <p>{ error.password && <small className='text-danger'>{ error.password }</small> }</p>
                                        </div>
                                        <div className='flex items-center justify-between mb-3'>
                                            <fieldset>
                                                <label className=' inline-flex space-x-2 items-center' htmlFor='remember'>
                                                    <input type="checkbox" className=' form-check h-4 w-4 text-blue-500
                                                 transition-all duration-200 ease-in-out'
                                                        name='' id='remember' />
                                                    <span className='text-gray-700 text-sm'>Rememberme</span>
                                                </label>
                                            </fieldset>
                                            <div className=''>
                                                <Link to="/forgot" className='text-md font-medium text-green-700 no-underline
                                            hover:text-blue-950'>
                                                    Forgot Password</Link>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <button type='submit' className='text-center bg-purple-900 w-full rounded-lg p-3
                                        text-white font-medium'>
                                                { loading ? 'Logging' : 'Submit' }
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignIn