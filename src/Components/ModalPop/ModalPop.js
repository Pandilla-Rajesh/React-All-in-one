import React from 'react'

const ModalPop=({isOpen, onClose, children})=>{
  
    if(!isOpen) return null;
    
    return(
        <>
            <h1 className='text-center p-5 text-6xl text-gray-300'>Welcome to Modalpop</h1>

            <div className='modal-overlay'>
                <div className='modal-content'>
                    <button onClick={onClose} className='modal-close'>&times;</button>
                    {children}
                </div>
            </div>

        </>
    )
}
export default ModalPop