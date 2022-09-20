import React from 'react'

const Alerta = ({children}) => {
    return (
        <div className='text-center font-bold my-4 bg-red-600 p-3 text-white uppercase'>
            {children}
        </div>
    )
}

export default Alerta