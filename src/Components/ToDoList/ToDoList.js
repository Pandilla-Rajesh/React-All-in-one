import React, { useEffect, useState } from 'react'

const ToDoList=()=>{

    const [product, setProduct] = useState([])

    const tasks = {

       todo:[

         'Finalize sitemap and content',
        'Design homepage layout',
        'Implement mobile-first styles',
        'Add project showcase section',
        'Integrate contact form',
        'Test cross-browser compatibility'
       ],

       inProgress:[
        'Animate scroll transitions using Lenis + GSAP',
        'Apply WCAG accessibility best practices',
       ],
       completed:[
        'Set up project repo and boilerplate',
        'Installed dependencies (React, Tailwind, Lenis)'
       ]
    }

    useEffect(()=>{
        fetch('https://dummyjson.com/products').then((res=>res.json()))
        .then(res=>{
            setProduct(res.products)  
            console.log(res.products, 'print the data')
        })
        .catch(err=>console.log(err))
    }, [])

    return(
        <>
           <section>
              <article className='container gap-0'>
                 <aside className='flex items-center justify-center'>
                    <div className='grid grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xl:max-sm:grid-cols-1 max-xl:grid-cols-1 gap-3 sm:grid-cols-1 min-w-full w-full'>
                        
                        <div className='bg-slate-50 p-4 rounded-lg shadow-sm transition-xl my-8'>
                            <div className='max-w-xl mx-auto'>
                                <h4 className='text-3xl font-bold text-center mb-3'>Uniq keys for dynamic list</h4>
                                <h2 className='text-2xl font-bold nb-4 text-green-900'> Task List: Portfolio Website</h2>
                                <div className='mb-4'>
                                    <h3 className='text-xl font-bold text-blue-600 my-2'>To-Do</h3>
                                    <ul className='list-inside'>
                                      {tasks.todo.map((task, index)=>{
                                        const taskId = `task${index}`;
                                          return(
                                            <li key={index}>
                                            <input type="checkbox" id={taskId} className='mr-3' />
                                            <label htmlFor={taskId} className='text-gray-600'>{task}</label>
                                        </li>
                                          )
                                      })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='bg-slate-50 p-4 rounded-lg shadow-sm my-8'>
                            <div className='max-w-xl mx-auto'>
                                <h2 className='text-2xl font-bold text-gray-800'>Task List In Progress</h2>
                                 <div className='mb-4'>
                                 <h3 className='text-xl text-orange-700 font-bold my-2'>In Progress</h3>
                                 <ul className='list-inside'>
                                    {tasks.inProgress.map((inpro, index)=>{
                                        const inproId = `inpro${index}`;
                                        return(
                                            <li key={index} className=''>
                                                <input type='checkbox' id={inproId} className='mr-3' />
                                                <label htmlFor={inproId}>{inpro}</label>
                                            </li>
                                        )
                                    })}
                                 </ul>
                            </div>
                            </div>
                        </div>

                    </div>
                 </aside>
              </article>
           </section>

           <section>
              <div className='container'>
                 <div className="row g-0 flex items-center justify-center">
  {product?.length > 0 ? (
    <div className="grid grid-cols-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 max-xl:grid-cols-1 gap-2">
      {product.slice(0, 10).map((pro, index) => (
        <div className='bg-green-50 rounded-lg p-4 mb-2'>
             <ul className="list-inside list-disc">
                 <article className='flex flex-col'>
                     <li key={index}>{pro.title} </li>
            <li>
                <span>{pro.description}</span>
            </li>
                 </article>
        </ul>
        </div>
      ))}
    </div>
  ) : (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm col-span-4 text-center">
      <p>No Data Found</p>
    </div>
  )}
</div>

              </div>
           </section>

        </>
    )
}

export default ToDoList