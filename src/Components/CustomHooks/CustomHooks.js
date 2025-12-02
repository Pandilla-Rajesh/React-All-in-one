import axios from "axios";
import { useEffect, useState } from 'react'

const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchCustomData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(url)
            const result = await res.data
            setData(result)
            console.log(result, 'custom hook data displayed')
        } catch(error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCustomData()
    }, [])

    return { data, loading, error }
}

export default useFetch