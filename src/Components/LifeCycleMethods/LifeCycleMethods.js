import React, { useEffect, useState } from 'react'
import Counter from '../ReducerUse/ReducerUse';

const LifeCycleMethods = () => {

    const [count, setCount] = useState(0)

    // Mount //
    useEffect(() => {
        console.log(count, 'mounted');
    }, [count])

    // end //

    //Update-mount //
    useEffect(() => {
        console.log(count, 'update mount');
    }, [count])
    // end //

    // unmount //

    useEffect(() => {
        return () => {
            console.log(count, 'remove from the dom unmount');
        }
    }, [count])

    // end //

    return (

        <article className='container ms-auto'>

            <div className='grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3'>
                <div className='flex justify-center bg-emerald-700 px-3 my-2 py-3 rounded'>
                    <h2 className='text-xl text-slate-50 font-bold'>Welcome to the LifeCycle Methods Component</h2>
                </div>
            </div>

            <div className='grid grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-3'>
                <div className='bg-slate-400 px-2 py-2 mb-3 rounded-lg'>
                    <h2 className='text-2xl text-center text-slate-50 mb-3'>Count: { count }</h2>
                    <div className='flex gap-2 justify-center items-center'>
                        <button type='button'
                            className='bg-orange-900 px-3 py-2 rounded-full text-slate-50 font-semibold'
                            onClick={ () => setCount((prev) => prev + 1) }>
                            Incrementd
                        </button>
                        <button type='button'
                            className='bg-gray-700 px-2 py-2 rounded-full text-slate-50 font-semibold'
                            onClick={ () => { if(count > 0) { setCount((prev) => prev - 1) } } }>
                            Decrement
                        </button>
                    </div>
                </div>

                <div className='bg-orange-500 px-3 py-3 rounded-lg shadow-lg'>
                    <Counter />
                </div>

            </div>

        </article>
    )
}

export default LifeCycleMethods