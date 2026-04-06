import React, { useState, useMemo } from 'react'
import useFetch from './CustomHooks'
import DatePicker from 'react-datepicker'

const CustomData = () => {

    const [startDate, setStartDate] = useState(null);

    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts')
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('')


    const filterData = useMemo(() => {
        if(!Array.isArray(data)) return [];

        const q = (query ?? "").trim().toLowerCase();
        if(!q) return data;  // show full data initially

        return data.filter(post => {
            if(!post) return false;

            const title = post.title?.toLowerCase() || "";
            const id = String(post.id || "").toLowerCase();
            const userId = String(post.userId || "").toLowerCase();

            return (
                title.includes(q) ||
                id.includes(q) ||
                userId.includes(q)
            );
        });
    }, [data, query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(search);
    };

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: { error.message }</p>;


    return (
        <section className='my-5'>

            {/* custom-form */ }

            <article className=' container mx-auto'>
                <div className=' bg-violet-700 rounded p-5 mb-5'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-x-1'>

                        <div className=' flex items-center justify-center'>
                            {/* form-title */ }
                            <h2 className=' text-6xl text-white font-semibold leading-snug'>
                                Welcome <br /> To The <br /> Customhook Form</h2>
                            {/* end */ }
                        </div>

                        {/* custom-form */ }

                        <form role="form">

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                <div className='flex flex-col'>
                                    <label className='block mb-2 text-white font-medium'>Full name</label>
                                    <input type="text" className='bg-white rounded p-3' placeholder='username' />
                                </div>

                                <div className='flex flex-col'>
                                    <label className='block mb-2 text-white font-medium'>Last name</label>
                                    <input type="text" className='bg-white rounded p-3' placeholder='username' />
                                </div>


                                <div className='flex flex-col'>
                                    <label className='block mb-2 text-white font-medium'>Mobile Number</label>
                                    <input type="text" className='bg-white rounded p-3' placeholder='username' />
                                </div>

                                <div className="flex flex-col">
                                    <label className="mb-1">Select Date</label>

                                    <DatePicker
                                        selected={ startDate }
                                        onChange={ (date) => setStartDate(date) }
                                        placeholderText="Choose date"
                                        className="bg-white rounded p-3 w-full outline-none border"
                                        calendarClassName="rounded-lg shadow-lg"
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label className='block mb-2 text-white font-medium'>Gender</label>
                                    <input type="text" className='bg-white rounded p-3' placeholder='username' />
                                </div>

                                <div className='flex flex-col'>
                                    <label className='block mb-2 text-white font-medium'>Select Area</label>
                                    <input type="text" className='bg-white rounded p-3' placeholder='username' />
                                </div>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label className='block mb-2 text-white font-medium'>Address</label>
                                <textarea name='' className='bg-white rounded p-3'></textarea>
                            </div>
                        </form>

                        {/* end */ }

                    </div>
                </div>
            </article>

            {/* end */ }

            <article className='container mx-auto'>
                <form onSubmit={ handleSubmit } role='custom-api-data'
                    className='flex flex-col flex-wrap gap-3 sm:flex-row mb-4 justify-between items-center'>
                    <h2 className=' text-2xl font-semibold'>Custom API Data Searched</h2>
                    <div className=' flex gap-2'>
                        <input
                            type="text"
                            value={ search }
                            onChange={ (e) => setSearch(e.target.value) }
                            className='border px-3 py-2 w-full'
                            placeholder='Search post...'
                        />
                        <button className='bg-orange-800 text-white px-4 py-2 rounded'>
                            Search
                        </button>
                    </div>
                </form>

                <table className='table-fixed w-full border'>
                    <thead className='bg-orange-800 text-white'>
                        <tr>
                            <th className='py-2 px-3'>ID</th>
                            <th className='py-2 px-3'>UserID</th>
                            <th className='py-2 px-3'>Title</th>
                            <th className='py-2 px-3'>Body</th>
                        </tr>
                    </thead>

                    <tbody>
                        { filterData.length > 0 ? (
                            filterData.slice(0, 10).map((post) => (
                                <tr key={ post.id } className='border-b'>
                                    <td className='p-2 px-3'>{ post.id }</td>
                                    <td className='p-2 px-3'>{ post.userId }</td>
                                    <td className='p-2 px-3'>{ post.title }</td>
                                    <td className='p-2 px-3'>{ post.body }</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className='text-center py-4'>
                                    No Data Found
                                </td>
                            </tr>
                        ) }
                    </tbody>
                </table>
            </article>
        </section>
    );
}

export default CustomData;
