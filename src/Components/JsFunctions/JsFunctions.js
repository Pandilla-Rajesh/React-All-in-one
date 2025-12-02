import axios from "axios";
import React, { useEffect, useRef, useState } from 'react'

const JsFunctions = () => {

    const [evename, setEveName] = useState()
    const [country, setCountry] = useState([])
    const [selectcountry, setSelectCountry] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const hoverref = useRef(null)

    const handleMouseHover = () => {
        setIsHovered(true)
    }

    const handleMouseOut = () => {
        setIsHovered(false)
    }

    useEffect(() => {
        const node = hoverref.current

        if(node) {
            node.addEventListener('mouse hover', handleMouseHover)
            node.removeEventListener('mouse out', handleMouseOut)
        }

        return () => {
            node.removeEventListener('mouse hover', handleMouseHover)
            node.removeEventListener('mouse out', handleMouseOut)
        }
    }, [hoverref])

    const handleName = (e) => {
        setEveName(e.target.textContent)
        console.log(e.target.value)
    }

    const getCountries = async () => {

        setLoading(false)

        try {

            const response = await axios.get('https://restcountries.com/v3.1/all')
            setCountry(response.data)
            console.log(response.data, 'all countries included')

        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCountries()
    }, [])

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all').then((res => res.json()))
            .then(res => {
                console.log(res, 'rest countries')
            })
    }, [])

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch('https://restcountries.com/v3.1/all')
                const data = await res.json()
                if(Array.isArray(data)) {
                    setCountry(data)
                    const result = data.filter(c => c.region === "Asia")
                    console.log(result)
                } else {
                    console.error("Unexpected data:", data)
                }
            } catch(err) {
                console.error(err)
            }
        }
        fetchCountries()
    }, [])

    const handleCountryChange = (e) => {
        setSelectCountry(e.target.value)
    }



    return (

        <article>
            <section>
                <div className='container mx-auto flex items-center justify-center flex-col px-4 py-2'>
                    <div className='grid grid-cols-1 lg:grid-cols-1 w-full mb-4 my-4'>
                        <div className='bg-white p-4 py-4 shadow-lg rounded-lg hover:shadow-xl transition-xl'>
                            <h1 className='text-center text-4xl font-bold'>Welcome to Javascript Functions</h1>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 max-xl:grid-cols-1 mb-4 gap-3'>
                        <div className='bg-gray-50 shadow-lg sm:shadow-xl transition-xl hover:shadow-sm rounded-lg p-4 max-w-full'>
                            <h2 className='text-center font-semibold text-xl text-gray-800 mb-4'>
                                Welcome to Event Deligation Names
                            </h2>
                            <div className='bg-slate-800 rounded-xl p-3 mb-4'>
                                <h3 className='text-3xl text-center font-semibold text-gray-50'>
                                    { evename }
                                </h3>
                            </div>
                            <div onClick={ handleName }>
                                <ul className='list-disc list-inside border px-4 py-2 rounded-lg shadow-sm cursor-pointer'>
                                    <li>Sathyanarayana</li>
                                    <li>Anasurya</li>
                                    <li>Rajesh</li>
                                    <li>Ushasri</li>
                                    <li>Aadhya</li>
                                    <li>Arjun</li>
                                </ul>
                            </div>
                        </div>

                        {/* rest-countries */ }
                        <div className='bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition-xl'>
                            <h2 className='text-xl text-center font-semibold text-gray-800 mb-4'>
                                Welcome to RestCountry Select
                            </h2>
                            <form>
                                <select className='form-select mb-4' onChange={ handleCountryChange } value={ selectcountry }>
                                    <option value="" key="">Selected Country</option>
                                    { country.length > 0 && country.map((country) => (
                                        <option key={ country.cca3 } value={ country.name.common }>
                                            { country.name.common }
                                        </option>
                                    )) }
                                </select>
                                { selectcountry && (
                                    <div className='bg-orange-500 p-4 rounded-lg'>
                                        <h3 className='text-2xl text-white font-semibold text-center'>
                                            { selectcountry }
                                        </h3>
                                    </div>
                                ) }
                            </form>
                        </div>
                        {/* end */ }

                        <div className='bg-slate-50 rounded-lg shadow-lg hover:shadow-sm p-4'>
                            <h2 className='text-xl font-bold text-center text-gray-800 mb-4'>
                                Welcome RestAPI With try catch method
                            </h2>
                            <form>
                                <select className='form-select mb-4' onChange={ handleCountryChange } value={ selectcountry }>
                                    <option value="" key="">Select Country</option>
                                    { !loading ? (
                                        <>
                                            { country?.length > 0 ? (
                                                country.slice(0, 10).map((list) => (
                                                    <option value={ list.name.common } key={ list.cca2 }>
                                                        { list.name.common }
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No countries found</option>
                                            ) }
                                        </>
                                    ) : (
                                        <option disabled>Loading...</option>
                                    ) }
                                </select>
                                { selectcountry ? (
                                    <>
                                        <article className='bg-pink-700 text-gray-50 p-4 rounded-lg'>
                                            <h4 className='font-bold text-xl'>{ selectcountry }</h4>
                                        </article>
                                    </>
                                ) : (
                                    <>
                                        <p>Data not Loading</p>
                                    </>
                                ) }
                            </form>
                        </div>

                        <div className='bg-slate-50 p-4 rounded-lg shadow-sm hover:shadow-sm translate-xl'>
                            <h2 className='text-xl font-bold text-gray-800 text-center'>
                                Mouse Hover Effect
                            </h2>
                            <div ref={ hoverref } className={ `${isHovered ? 'bg-blue-800' : 'bg-green-700'} cursor-pointer` }>
                                <h5 className='text-xl font-semibold text-gray-50'>Hover Effect</h5>
                            </div>
                            { isHovered && <p>Hover content</p> }
                        </div>

                    </div>
                </div>
            </section>
        </article>
    )
}
export default JsFunctions