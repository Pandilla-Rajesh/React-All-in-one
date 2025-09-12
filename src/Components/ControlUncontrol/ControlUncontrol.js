import React, { useEffect, useState } from 'react'

const ControlUncontrol=()=>{

    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(false)
        fetch('https://jsonplaceholder.typicode.com/posts').then((res)=>res.json())
        .then((data)=>{
            console.log(data, 'fetch the data')
        }).catch((err)=>{
            setLoading(false)
            console.error('error fetch the data', err)
        })
    }, [])

    const searchData = async()=>{
        setLoading(false)
        try{

            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            const response = await res.json()
            setPosts(response)
            console.log(response, 'data response')
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        searchData()
    }, [])

    const filteredPost = posts.filter(
        (p)=>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.body.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toString().includes(search) ||
        p.userId.toString().includes(search)
    )

    return(
        <>
          <div className='flex justify-between items-center'>
            <div>
                <h2 className='text-3xl font-semibold'>Search The Item</h2>
            </div>
           <div className='flex flex-col mb-2'>
              <label className='mb-2 font-semibold text-right'>Search Item</label>
              <input type="text" value={search} placeholder='Search Term'
              className='border rounded p-2 w-80 border-slate-600'
              onChange={(e)=>setSearch(e.target.value)} />
           </div>
          </div>
          <div>
           {loading ? (
            <p>...Loading</p>
           ) : (
             <div className='relative overflow-x-auto'>
                <table className='table-fixed text-sm border w-full text-gray-600'>
                    <thead className='text-sm border bg-gray-500 uppercase text-slate-50'>
                        <tr>
                            <th scope='col' className='px-3 py-3'>Id</th>
                            <th scope='col' className='px-3 py-3'>UserId</th>
                            <th scope='col' className='px-3 py-3'>Title</th>
                            <th scope='col' className='px-3 py-3'>Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPost?.length>0?(
                            filteredPost.slice(0, 10)?.map((post, index)=>(
                                <tr key={index} className='border-b dark:border-gray-600'>
                                    <td className='px-3 py-3'>{post.id}</td>
                                    <td className='px-3 py-3'>{post.userId}</td>
                                    <td className='px-3 py-3'>{post.title}</td>
                                    <td className='px-3 py-3'>{post.body}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">
                                    <p>...Loading</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
             </div>
           )}
          </div>
        </>
    )
}

export default ControlUncontrol