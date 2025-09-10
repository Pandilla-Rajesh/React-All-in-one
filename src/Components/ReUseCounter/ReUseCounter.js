import React, { useCallback, useEffect, useMemo, useState } from 'react'


export default function ReUseCounter(){
    
    const {counter, incHandle, decHandle, reSetHandle} = Counter()

//* show-more-content*//
const [isExpand, setIsExpand] = useState(false)
const toggleExpand=()=>{
    setIsExpand(!isExpand)
}
const content = 
`Name 1.Catalina Kelley
Name 2.Eric Peters
Name 3.Leila Good
Name 4.Davian Wells
Name 5.Catalina Kelley
Name 6.Catalina Kelley
Name 7.Catalina Kelley
Name 8.Catalina Kelley
Name 9.Catalina Kelley
Name 10.Catalina Kelley`
// end //

useEffect(()=>{
document.title = `Count ${counter}`
console.log(counter, 'counter updated when i click the counts')
}, [counter])

const [count, setCount] = useState(0)
const [price, setPrice] = useState(0)

const totalPrice = useMemo(()=>{
    console.log('calculating total price', count + price)
    return count + price
}, [count, price])

const handleClick = useCallback(()=>{
    console.log("Button Clicked")
}, [])


        return(

       <section>
           <div className='container gap-0'>
              <div className='flex items-center justify-center row g-0'>
                 <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-3'>
                    <div className='bg-slate-50 p-4 shadow-lg hover:shadow-sm transition-xl rounded-lg my-8'>

                        <div className=' my-5 flex items-center justify-center flex-wrap flex-col'>
                            <h2 className='text-3xl font-bold pb-3'>useMemo store expensive calculation</h2>
                            <div className='flex gap-3 border border-b-orange-300 p-3 bg-orange-200 my-3 rounded-lg'>
                                 <h4 className='text-2xl font-bold'>Count: {count}</h4>
                                 <h4 className='text-2xl font-bold'>Price: {price}</h4>
                            </div>
                            <div className='mb-3'>
                                <h3 className='text-3xl font-bold bg-green-800 text-gray-50 p-3 rounded'>Total Price: {totalPrice}</h3>
                            </div>

                            <div className='flex gap-3'>
                                 <button className=' bg-red-500 text-gray-50 px-2 py-2 rounded' onClick={()=>setCount(count + 1)}>Increment Count</button>
                            <button className=' bg-green-800 text-gray-50 px-2 py-2 rounded' onClick={()=>setPrice(price + 1)}>Increase Price</button>
                                <button onClick={handleClick} 
                                className='bg-blue-500 text-gray-50 font-bold text-2xl p-3 rounded'>
                                    useCallback</button>
                            </div>

                        </div>

                        <h2 className='text-4xl text-center font-bold text-slate-700 mb-4'>Reusefull Counter</h2>
                        <div className='flex items-center justify-center flex-wrap flex-col'>
                            <h5 className='text-center font-bold text-orange-700 text-5xl mb-4'>Count: {counter}</h5>
                            <div className=' gap-3 flex'>
                                <button className='bg-teal-800 bg-gradient-to-r from-teal-400 to-teal-900
                                 text-gray-50 font-bold rounded-lg px-4 py-2'
                            onClick={incHandle}>Increment</button>
                            <button onClick={decHandle} className='font-bold bg-orange-400 bg-gradient-to-r
                            from-orange-400 to-orange-700 rounded-lg px-4 py-2 text-green-50'>DecIncrement</button>
                            <button onClick={reSetHandle} className='font-bold text-gray-50 bg-gradient-to-r
                            bg-slate-500 bg-slate-900 font-bold px-4 py-2 rounded-lg'>Reset</button>
                            </div>
                        </div>
                  </div>
                  <div className='bg-slate-50 p-4 shadow-lg hover:shadow-sm transition-xl rounded-lg my-8'>
                       <div className=' overflow-x-auto'>
                          <table className='min-w-full border border-gray-200 text-left text-sm'>
                             <thead className='bg-green-50 text-grey-700 uppercase'>
                                <tr key="">
                                    <th className='px-6 py-3 border-b'>Name</th>
                                    <th className='px-6 py-3 border-b'>Email</th>
                                    <th className='px-6 py-3 border-b'>Password</th>
                                    <th className='px-6 py-3 border-b'>Phone</th>
                                </tr>
                             </thead>
                          </table>
                       </div>

                       <div className='border border-gray-400 text-center my-4 p-4'>
                           <h2 className='font-bold text-2xl mb-4'>Show the Content Show more Show less</h2>
                           <div className='bg-gray-500 text-gray-50 p-4 overflow-hidden transition-all rounded-lg'>
                              <p style={{maxHeight: isExpand ? '500px' : '100px', whiteSpace:'pre-line', textAlign:'left'}}>{content}</p>
                           </div>
                            <div className='my-2'>
                                    <button className='bg-blue-400 bg-gradient-to-r from-blue-400 to-blue-950
                                text-gray-50 px-4 p-2 rounded font-bold' onClick={toggleExpand}>
                                    {isExpand ? 'Shoe less' : 'Show more'}
                                    </button>
                                </div>
                       </div>
                  </div>
                 </div>
              </div>
           </div>
       </section>
    )
}

const Counter=()=>{

    const [counter, setCounter] = useState(0)

    const incHandle=()=>{
        setCounter((prevCounter) => prevCounter+1)
    }

    const decHandle=()=>{
        setCounter((prevCounter) => prevCounter-1)
    }

    const reSetHandle=()=>{
        setCounter(0)
    }



 return{counter, incHandle, decHandle, reSetHandle}
}