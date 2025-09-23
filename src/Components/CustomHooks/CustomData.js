import React, { useState } from 'react'
import useFetch from './CustomHooks'

const CustomData = ()=>{

    const {data, loading, error} = useFetch('https://jsonplaceholder.typicode.com/posts')
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('')
    
    if(loading) return <p>...Loading</p>
    if(error) return <p>Error: {error.message}</p>
    
    const filterData = data?.filter(post=>(
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.id.toString().includes(query.toLowerCase())
    ))

    const handleSubmit=(e)=>{
        e.preventDefault()
        setQuery(search)
        alert(JSON.stringify(search,null,1))
        setSearch('')
    }

    return(
        <section className='my-5 z-0'>
            <article className='container ms-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1'>
                    <div className=''>
                        <form action="" onSubmit={handleSubmit} className='flex justify-end gap-2 mb-2 items-center'>
                             <input type="text" value={search}
                        onChange={(e)=>setSearch(e.target.value)} 
                        className=' border rounded px-3 py-2 w-11/12'
                        placeholder='search post' />
                        <div>
                            <button 
                            className='bg-orange-800 text-slate-50 px-3 py-2 
                            rounded-5 font-bold'>
                                Search</button>
                        </div>
                        </form>
                    </div>
                </div>
                {loading?(
                    <p>...Loading</p>
                ) : (
                    <div className='relative overflow-x-hidden'>
                        <table className='table-fixed text-xl boder w-full text-gray-600'>
                        <thead className='bg-orange-800 text-sm text-slate-50'>
                            <tr>
                                <th className='px-3 py-3' scope='col'>Id</th>
                                <th className='px-3 py-3' scope='col'>UserId</th>
                                <th className='px-3 py-3' scope='col'>Title</th>
                                <th className='px-3 py-3' scope='col'>Body</th>
                            </tr>
                        </thead>
                        <tbody className='border'>
                            {filterData?.length>0?(
                                filterData.slice(0, 10)?.map((post, index)=>(
                                    <>
                                      <tr key={index} className=' border-b'>
                                        <td className='px-3 py-3 border-r text-sm'>{post.id}</td>
                                        <td className='px-3 py-3 border-r text-sm'>{post.userId}</td>
                                        <td className='px-3 py-3 border-r text-sm'>{post.title}</td>
                                        <td className='px-3 py-3 border-r text-sm'>{post.body}</td>
                                      </tr>
                                    </>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">
                                        <p>No Data Found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                )}
            </article>
        </section>
    )

}

export default CustomData