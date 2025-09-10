import React from 'react'
import Child from './Child'

const Parent = () => {

    const detailUser = [

        { title: 'Developer', name: 'Rajesh Pandilla', age: 40, role: 'Developer', email: 'raj@gmail.com' },
        { title: 'Housewife', name: 'Ushasri', age: 35, role: 'Home', email: 'usha@gmail.com' },
        { title: 'Child1', name: 'Aadhya', age: 9, role: 'school', email: 'aadhya@gmail.com' },
        { title: 'Child2', name: 'Arjun', age: 4, role: 'school', email: 'arjun@gmail.com' }

    ]

    return (

        <>

            <div className='grid grid-cols-1 w-full'>
                <h1 className='text-3xl text-center text-slate-50'>Welcome to the Parent Componet</h1>
            </div>

            <div>
                <Child detailUser={detailUser} />
            </div>

        </>


    )
}

export default Parent