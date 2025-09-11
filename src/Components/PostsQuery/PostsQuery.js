import React from 'react'
import { useGetPostsQuery } from '../../Services/PostsApi/PostsApi'

const PostsQuery=()=>{

    const {data, error, isLoading} = useGetPostsQuery()

    if(isLoading) return <p>...Loading</p>
    if(error) return <p>getting error fetching data</p>

    return(
        <section className='bg-gradient-to-tl from-violet-500 to-violet-900 p-5'>
            <div className='container ms-auto'>
                <div className='bg-violet-950 p-3 rounded-lg mb-3'>
                    <h1 className='text-3xl text-center text-slate-50 font-bold'>
                        Redux Toolkit useing the Data(RTK)
                    </h1>
                </div>
                <div className='grid grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-2 gap-2'>
                    {isLoading?(
                        <>
                            <p>...Loading</p>
                        </>
                    ):(
                       data?.length>0?(
                        data.slice(0, 10)?.map((post, index)=>(
                            <div className='bg-white rounded-lg p-2'>
                                <div key={post.index}>
                                   <div className='flex justify-between items-center mb-2'>
                                         <p>Id: {post.id}</p>
                                    <p>UserId: {post.userId}</p>
                                   </div>
                                   <div className='bg-orange-900 rounded-full p-2 flex justify-center'>
                                        <h2 className='text-sm text-slate-50'>
                                            <strong>Title: </strong>{post.title}
                                        </h2>
                                   </div>
                                   <div className='p-3'>
                                     <h4 className='text-slate-700'>
                                        {post.completed}
                                     </h4>
                                   </div>
                                </div>
                            </div>
                        ))
                       ) : (
                        <p>No Data Found</p>
                       )
                    )}
                </div>
            </div>
        </section>
    )
}

export default PostsQuery