import React from 'react'

function Modal({ children }) {
  return (
    <div className='w-screen min-h-screen absolute top-0 left-0 bg-dark-dp1/40'>
      <div className='flex h-screen w-full justify-center items-center p-4'>
        <div className='card p-8'>
            { children }
        </div>
      </div>
    </div>
  )
}

export default Modal