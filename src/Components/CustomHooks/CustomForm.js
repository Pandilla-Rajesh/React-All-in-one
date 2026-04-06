import react, { useState } from 'react'

const useForm = () => {

    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {

        const { name, value } = e.target
        setValues((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = (e) => {

        e.preventDefault()
        alert(JSON.stringify(values, null, 2))


    }

    const validationForm = (values) => {

        let errors = {}

        if(!values.name) {
            errors.name = 'Name is required'
        }

        if(!values.email) {
            errors.email = "Password is required"
        }


        return errors
    }


}

export default useForm