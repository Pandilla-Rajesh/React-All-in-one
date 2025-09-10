import React from 'react'

const Child = ({detailUser })=>{

    return(
        <>
         <div className='grid grid-cols-1 my-2 bg-slate-950 p-3 rounded-full shadow-lg mb-4 mt-4'>
            <h3 className='text-center text-2xl text-slate-50 font-bold'>
                Child Component
            </h3>
         </div>

         
            <div className='grid grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-2'>
                {detailUser?.map((user, index)=>(
                <div className='bg-white rounded shadow-lg p-3' key={index}>
                    <div className='border border-b-4 border-blue-950 p-3'>
                       
                       <div className='flex justify-between mb-2'>
                        <h3 className='text-1xl'>Title</h3>
                        <h2 className='text-1xl font-semibold text-orange-900 uppercase'>{user.title}</h2>
                       </div>

                        <div className='flex justify-between bg-gray-500 rounded-full px-3 py-3 items-center mb-2'>
                            <h4 className='text-1xl text-slate-50'>Name</h4>
                            <h1 className='text-2xl text-slate-50'>{user.name}</h1>
                        </div>

                        <div className='flex justify-between items-center border-b-2 pb-2'>
                            <h5>Age</h5>
                            <h4>{user.age}<strong>Yrs</strong></h4>
                        </div>

                        <div className='flex justify-between items-center mt-3'>
                            <h6 className='text-1xl'>Role</h6>
                            <h1 className='text-2xl font-bold text-orange-400'>{user.role}</h1>
                        </div>

                        <div className='flex justify-between mt-3'>
                            <p className='text-xl'>Email</p>
                            <h6 className='text-xl'>{user.email}</h6>
                        </div>

                    </div>
                </div>
                   ))}
            </div>
      

        </>
    )
}

export default Child