import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

const MainLayout=()=>{

    return(
       <main>
           <header className='sticky top-0 z-40'>
               <Header/>
           </header>
           <Outlet/>
           <footer>
            <Footer/>
           </footer>
       </main>
    )
}

export default MainLayout