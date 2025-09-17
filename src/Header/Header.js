import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        // <section>
        //  <nav className='navbar navbar-expand-lg'>
        //     <div className='container-fluid'>
        //         <a href="#" className='navbar-brand text-white'>ReactAll</a>
        //         <button type='button' className='navbar-toggler' data-bs-toggle="collapse" data-bs-target="#navMenu">
        //             <span className='navbar-toggler-icon'></span>
        //         </button>
        //         <div className='collapse navbar-collapse' id='navMenu'>
        //             <ul className='navbar-nav me-auto'>
        //                 <li className='nav-item'>
        //                     <a href='#'>Home</a>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        //  </nav>
        // </section>

        <article>
            <section>
                <nav className='bg-gray-900 text-white'>
                    <div className='container-fluid mx-auto flex items-center justify-between px-3'>
                        <div className='xl:max-w-max'>
                            <a href="#" className='text-2xl font-bold'>React AllinOne</a>
                        </div>
                        <div className='relative'>
                            <button onClick={() => setIsOpen(!isOpen)} 
                            className='text-gray-50 lg:hidden focus:outline-none'>
                                {isOpen ? (
                                    <>
                                        <i class="bi bi-list"></i>
                                    </>
                                ) :
                                    (
                                        <div className=' absolute right-0'>
                                            <i class="bi bi-x-lg"></i>
                                        </div>
                                    )}
                            </button>
                        </div>
                        <div className={`lg:flex ${isOpen ? 'hidden' : 'block'} w-full lg:w-auto max-xl:w-full`}>
                            <ul className='lg:flex space-y-3 lg:space-y-0 space-x-3 mt-0 lg:mt-0 w-full max-xl:w-full'>
                                    <NavLink to="/home" 
                                    className={({isActive})=>`text-gray-50 hover:bg-orange-400 
                                   hover:transition ease-in-out duration-300 p-3
                                    ${isActive? 'bg-orange-600' : ''}`}>
                                        Home
                                    </NavLink>
                                <NavLink to="/todo" className={({isActive})=>`text-gray-50 hover:bg-orange-400
                                p-3 ${isActive ? 'bg-orange-600' : ""}`}>ToDoList</NavLink>
                                <NavLink to="/axiosfetch" className={({isActive})=>`text-gray-50 hover:bg-orange-400
                                px-3 py-3 ${isActive? 'bg-orange-700' : ''}`}>AxiosFetch</NavLink>
                                <NavLink to="/reusecounter" className={({isActive})=>`text-gray-50 hover:bg-orange-400
                                px-3 py-3 ${isActive? "bg-orange-700" : ''}`}>ReUseCounter</NavLink>
                               <NavLink to="/jsfunctions" className={({isActive})=>`text-gray-50 hover:bg-orange-400
                               px-3 py-3 ${isActive ? 'bg-orange-700' : ''}`}>JS Functions</NavLink>
                               <NavLink to="/postquery" className={({isActive})=>`text-gray-50 hover:bg-orange-400
                               px-3 py-3 ${isActive ? 'bg-orange-700' : ''}`}>RTK</NavLink>
                               <NavLink to="/custom" className={({isActive})=>`text-gray-50 hover:bg-orange-400
                               px-3 py-3 ${isActive ? 'bg-orange-700' : ''}`}>Custom Hook</NavLink>
                            </ul>
                        </div>
                    </div>
                </nav>
            </section>
        </article>

    )
}

export default Header