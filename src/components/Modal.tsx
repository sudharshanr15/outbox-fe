import React from 'react'

function Modal({ children }) {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <div className='card p-8'>
            { children }
        </div>
    </div>
  )
}

export default Modal