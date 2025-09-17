import React from 'react'
import useFetch from './CustomHooks'

const CustomData = ()=>{

    const {data, loading, error} = useFetch('https://jsonplaceholder.typicode.com/posts')
    if(loading) return <p>...Loading</p>
    if(error) return <p>Error: {error.message}</p>

    return(
        <section className='my-5 z-0'>
            <article className='container ms-auto'>
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
                            {data?.length>0?(
                                data.slice(0, 10)?.map((post, index)=>(
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