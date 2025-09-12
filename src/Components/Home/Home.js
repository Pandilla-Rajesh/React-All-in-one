import React, { useState } from 'react'
import Parent from '../Props/Parent'
import ControlUncontrol from '../ControlUncontrol/ControlUncontrol'

const Home = ()=>{

// string state //
const [name, setName] = useState('Rajesh')
const [cname, setCname] = useState('ushasri')
// end //

    const handleName=(e)=>{
        e.preventDefault()
        setCname('')
        alert('submited' + cname)
    }

    return(
       <section className='bg-gradient-to-tr from-slate-700 to-slate-600 p-3'>
            <article className='container ms-auto'>
                
                <div className='grid grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 mb-2'>
                    <Parent/>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-3 mb-4'>

                    <div className='bg-white rounded shadow-lg p-3 my-4'>
                        <h2 className='text-xl mb-2 font-semibold uppercase'>String Component Hello: {name}</h2>
                        <div>
                            <input type="text" placeholder='type name' onChange={(e)=>setName(e.target.value || setName(''))}
                            className='w-full p-2 rounded shadow-lg border' />
                        </div>
                    </div>

                    <div className='bg-white p-3 rounded shadow-lg'>
                        <div className='mb-3'>
                            <h2 className='text-2xl'>Controlled Components</h2>
                            <h3>Name: {cname}</h3>
                        </div>
                        <form onSubmit={handleName}>
                            <input type="text" name='name' value={cname} placeholder='type name' 
                            className='w-full rounded border border-slate-500 p-2'
                            onChange={(e)=>setCname(e.target.value)} />
                            <button type='submit' className='bg-slate-700 text-slate-50 rounded-lg shadow-lg p-2 mt-2'>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>

                <div className='grid grid-cols-1 mb-3'>
                    <div className='bg-orange-900 p-3 rounded shadow-lg'>
                        <h2 className='text-2xl text-slate-50 font-bold text-center'>Control and Uncontrol Component</h2>
                    </div>
                    <div>

                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-1'>
                    <div className='bg-white p-2 rounded'>
                        <ControlUncontrol/>
                    </div>
                </div>

            </article>
       </section>
    )
}

export default Home