import axios from "axios";
import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

   const [login, setLogin] = useState({
      email: '',
      password: '',
      rememberMe: ''
   })

   const navigate = useNavigate()

   const [error, setError] = useState({})
   const [showPassword, setShowPassword] = useState(false)
   const [loading, setLoading] = useState(false)

   const toggleVisible = () => {
      setShowPassword(!showPassword)
   }

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target
      setLogin({ ...login, [name]: type === 'checkbox' ? checked : value })
      console.log(login, 'login details binded');
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      // alert(JSON.stringify(login, null, 1))
      const errors = {}

      if(!login.email || !login.email.trim()) {
         errors.email = 'please enter email'
      } else if(!/^[a-zA-Z0-9@.]+$/.test(login.email)) {
         errors.email = 'email contains must should be letters and numbers'
      } else if(login.email.length < 10) {
         errors.email = 'please enter email 10 characters'
      }

      if(!login.password.trim()) {
         errors.password = 'please enter password'
      } else if(login.password.length < 10) {
         errors.password = 'please enter password 10 characters'
      }

      if(!login.rememberMe) {
         errors.rememberMe = 'You must check Remember Me before continuing'
      }

      if(Object.keys(errors).length > 0) {
         setTimeout(() => {
            setError(errors)
            setLoading(false)
         }, 1000)
      }

      try {

         const response = await axios.post('https://dummyjson.com/user/login', {
            username: login.email, //emilys//
            password: login.password, //emilyspass//
         })

         console.log('Login Sucess', response.data)

         if(login.rememberMe) {
            localStorage.setItem('token', response.data.token)
         } else {
            sessionStorage.setItem('token', response.data.token)
         }

         setLoading(false)
         navigate('/home')

      } catch(error) {
         setLoading(false)
         if(error.response && error.response.data?.message) {
            setError({ api: error.response.data.message })
         } else {
            setError({ api: 'Something went wrong. Please try again later.' })
         }
      } finally {
         setLoading(false)
         setLogin({ email: '', password: '', rememberMe: false })
      }
   }

   return (
      <section className='info-login'>
         <>
            <div className='container h-100'>
               <div className='row vh-100 align-items-center justify-content-center'>
                  <div className='col-4'>
                     <div className='bg-gradient-to-tr from-red-900 from-red-800 p-5'>
                        <div className=' flex items-center justify-center flex-col'>
                           <div className='text-slate-50 text-7xl mb-3'><i class="bi bi-person-circle"></i></div>
                           <div className='w-full mb-4 rounded'>
                              <h5 className='text-center text-white border-b-8 rounded bg-gradient-to-tr p-2
                            from-red-600 to-red-900 pb-2 border-red-900 font-bold text-2xl'>Sign in</h5>
                           </div>
                        </div>
                        <form onSubmit={ handleSubmit }>
                           <div className='mb-3'>
                              <label className='block mb-2' htmlFor='email'>
                                 <span className="after:content-['*'] after:ml-0.5 after:text-red-700
                         text-slate-50 font-bold text-sm">
                                    Username
                                 </span>
                                 <div className='my-2'>
                                    <input type="text" name='email' value={ login.email } placeholder='Enter Email'
                                       onChange={ handleChange } autoComplete='off'
                                       className={ `border border-red-600 w-full text-slate-50 rounded text-sm px-3 py-2 bg-transparent
                           ${error.email ? 'border-red-600 ring ring-red-600' : 'border-gray-500'}` } />
                                    <p>{ error.email && <small className='text-sm text-red-300'>{ error.email }</small> }</p>
                                 </div>
                              </label>
                           </div>

                           <div className="mb-3 w-full">
                              <label htmlFor="password" className='block w-full'>
                                 <span className="after:content-['*'] after:ml-0.5 after:text-red-700
                         text-slate-50 text-sm font-bold">
                                    Password
                                 </span>
                                 <div className="group block w-full my-2">
                                    <div className='flex items-center relative w-full'>
                                       <input type={ showPassword ? 'text' : 'password' } name='password' value={ login.password }
                                          placeholder='Enter Password' onChange={ handleChange }
                                          className={ `border border-red-600 w-full text-slate-50 rounded px-3 py-2 bg-transparent
                              ${error.password ? 'border-red-500 ring ring-red-700' : 'border-gray-600'}` } />
                                       <span onClick={ toggleVisible }
                                          className=' absolute right-3 top-1/2 text-slate-50 cursor-pointer -translate-y-1/2'>
                                          { showPassword ? <i class="bi bi-eye"></i> : <i class="bi bi-eye-slash"></i> }
                                       </span>
                                    </div>
                                    <p>{ error.password && <small className='text-sm text-red-300'>{ error.password }</small> }</p>

                                 </div>
                              </label>
                           </div>

                           <div className='mb-0 d-flex justify-content-end'>
                              <label htmlFor='remember' className='text-slate-50 text-sm'>Rememberme</label>
                              <input type="checkbox" id='remember' name='rememberMe'
                                 onChange={ handleChange } value={ login.rememberMe }
                                 className='ms-2 bg-transparent' />
                           </div>
                           <p>{ error.rememberMe && <small className='text-sm text-red-300'>{ error.rememberMe }</small> }</p>
                           <div className='w-100 d-flex justify-content-center mt-2'>
                              <button type='submit' disabled={ loading }
                                 className='text-sm bg-gradient-to-tr from-red-700 to-red-950
                     text-slate-50 w-full rounded-full p-2 font-bold text-xl'>
                                 { loading ? (
                                    <>
                                       <span className=' animate-spin h-5 w-5 role-status'></span>
                                    </>
                                 ) : null }
                                 { loading ? 'Please wait' : 'Submit' }
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </>
      </section>
   )
}

export default Login