import React from 'react'
import Parent from '../Props/Parent'

const Home = ()=>{



    return(
       <section className='bg-gradient-to-tr from-slate-700 to-slate-600 p-3'>
            <article className='container ms-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1'>
                    <Parent/>
                </div>
            </article>
       </section>
    )
}

export default Home