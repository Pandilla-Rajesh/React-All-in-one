import React from 'react'

const NoDataFound=()=>{
    return(
        <>
            <section className='info-nodata vh-100'>
                <article className=' container'>
                    <div className='row g-2 vh-100'>
                        <div className='col-12 d-flex justify-content-center'>
                            <h2 className=' fs-1'>No Data Found Component</h2>
                        </div>
                    </div>
                </article>
            </section>
        </>
    )
}

export default NoDataFound