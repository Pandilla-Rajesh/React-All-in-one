import React, { useState } from 'react'

const OtpInput=({size=6})=>{

    /**
     * 1.Forward Functionality
     *  i.when no digit in the input
     *  ii.apply the new key in it and focus the immediate next input
     * 2.Backward functionality
     * 3.Arrow functionality
     */

    const [inputValues, setInputValues] = useState(()=>{
        return new Array(size).fill('');
    })

    console.log(inputValues)

    return(
        <>
           <section className='h-full'>
                <div className='container-otp'>
                    <div className='otp-box'>
                        {inputValues.map((inputValue, index)=>{
                            return <input key={index.toString()} value={inputValue} />
                        })}
                    </div>
                </div>
           </section>
        </>
    )
}

export default OtpInput