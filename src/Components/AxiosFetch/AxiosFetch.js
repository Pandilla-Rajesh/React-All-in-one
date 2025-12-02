import axios from "axios";
import React, { useCallback, useEffect, useState } from 'react'
import LifeCycleMethods from '../LifeCycleMethods/LifeCycleMethods'

const AxiosFetch = () => {

    const [data, setData] = useState([])
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const getData = async () => {

        setLoading(true)

        try {

            const res = await axios.get('https://dummyjson.com/posts')
            setData(res.data.posts)
            console.log(res.data.posts, 'axios product details')

        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const postData = async () => {

        setLoading(true)
        try {
            const res = await axios.post('https://dummyjson.com/posts/')
            setData((prevData) => ([...prevData, res.data.posts]))
            console.log(res.data.posts, 'post data retrive')
        } catch(err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        postData()
    }, [])

    const postHandle = () => {
        postData()
    }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos').then((res => res.json()))
            .then(data => {
                console.log(data)
            })
    }, [])

    useEffect(() => {
        async function getPro() {
            setLoading(true)
            try {

                const res = await fetch('https://fakestoreapi.com/products')
                const respro = await res.json()
                setProduct(respro)
                console.log(respro, 'get product details')

            } catch(err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        getPro()
    }, [])

    const getProduct = useCallback(async () => {
        setLoading(true)
        try {

            const res = await fetch('https://jsonplaceholder.typicode.com/todos')
            const response = await res.json()
            setProduct(response)
            console.log(response, 'get pro details')

        } catch(err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getProduct()
    }, [getProduct])

    return (
        <>

            <section className=''>
                <article className='container'>
                    <div className='row'>
                        <div className="col-lg-12">
                            <LifeCycleMethods />
                        </div>
                    </div>
                </article>
            </section>


            <section>
                <div className='container'>
                    <div className='row flex items-center justify-center g-0'>

                        <div className=" col-span-12 text-center py-5 ">
                            <h2 className="text-5xl text-green-700 font-bold mb-3">Product Details Shown</h2>
                            <div className="table-responsive">
                                { loading ? (
                                    <tr key="">
                                        <td colSpan={ 5 }>
                                            <p>No Data Found</p>
                                        </td>
                                    </tr>
                                ) : (
                                    <table className=" table table-bordered">
                                        <thead>
                                            <tr key="">
                                                <th>Id</th>
                                                <th>User Id</th>
                                                <th>User Title</th>
                                                <th>User Body</th>
                                                <th>Posts</th>
                                                <th>LiKES</th>
                                                <th>Views</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { product?.length > 0 ? (
                                                product.slice(0, 20)?.map((pro, index) => (
                                                    <tr key={ index + 1 }>
                                                        <td>{ pro.id }</td>
                                                        <td>{ pro.userId }</td>
                                                        <td>{ pro.title }</td>
                                                        <td>{ pro.title }</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr key="index">
                                                    <td colSpan={ 5 }>
                                                        <p>No Data Found</p>
                                                    </td>
                                                </tr>
                                            ) }
                                        </tbody>
                                    </table>
                                ) }
                            </div>
                        </div>

                        <div className='col-auto px-2 py-5'>
                            <h2 className='text-5xl font-bold text-gray-100 dark:text-white text-orange-500 pb-2 px-2'>
                                Welcome Axios and Fetch API Call</h2>
                        </div>

                        <div className='col-auto'>
                            <div className='grid grid:cols-1 md:grid-cols-1 lg:grid-cols-1 w-full'>
                                <div className='bg-white rounded-lg p-4 shadow-lg hover:shadow-lg transition-xl'>
                                    <div className=' flex items-center justify-center flex-wrap flex-col'>
                                        <div className='py-0'>
                                            <h3 className='text-2xl font-bold mb-3'>React Axios API Calls</h3></div>
                                        <div className='table-responsive'>
                                            { loading ? (
                                                <p>Loading</p>
                                            ) : (
                                                <>
                                                    <table className=' table table-bordered'>
                                                        <thead>
                                                            <tr key="">
                                                                <th>Id</th>
                                                                <th>User Id</th>
                                                                <th>User Title</th>
                                                                <th>User Body</th>
                                                                <th>Posts</th>
                                                                <th>LiKES</th>
                                                                <th>Views</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            { data?.length > 0 && data.slice(0, 5)?.map((post, id) => (
                                                                <tr key={ id }>
                                                                    <td>{ post.id }</td>
                                                                    <td>{ post.userId }</td>
                                                                    <td>{ post.title }</td>
                                                                    <td>{ post.body.slice(0) }</td>
                                                                    <td>
                                                                        <ul className='list-disc'>
                                                                            { Object.entries(post.reactions).map(([reactionType, count]) => (
                                                                                <li key={ reactionType }>
                                                                                    { reactionType.charAt(0).toUpperCase() + reactionType.slice(0) } { count }
                                                                                </li>
                                                                            )) }
                                                                        </ul>
                                                                    </td>
                                                                    <td>
                                                                        <ul className='list-disc'>
                                                                            { Object.keys(post.tags).map((el) => (
                                                                                <li key={ el }>
                                                                                    { typeof post.tags[el] == 'object' ? JSON.stringify(post.tags[el]) : post.tags[el] }
                                                                                </li>
                                                                            )) }
                                                                        </ul>
                                                                    </td>
                                                                    <td>{ post.views }</td>
                                                                    <td className='flex items-center justify-center gap-3'>
                                                                        <div className=' flex gap-3'>
                                                                            <button className='btn bg-slate-700 text-gray-100 font-bold'>Edit</button>
                                                                            <button className='btn bg-red-700 text-gray-50 font-bold'>Delete</button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )) }
                                                        </tbody>
                                                    </table>
                                                </>
                                            ) }
                                            <div>
                                                <button onClick={ postHandle } className='btn btn-primary
                                                 border-t-neutral-800'>PostData</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default AxiosFetch