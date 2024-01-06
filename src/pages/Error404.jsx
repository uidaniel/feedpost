import React from 'react'
import {useNavigate} from 'react-router-dom'

const Error404 = () => {
    const navigate = useNavigate()
  return (
    <section className='flex flex-col items-center justify-center gap-3'>
        <img src="https://bafybeicodwwfosuuy764n7zptvomzvsvzpwzvljx4o5h5vegfta437ngf4.ipfs.w3s.link/404 Error-rafiki.svg" alt="" className="w-[400px]" />
        <p className='text-[#FF2424] text-[50px] font-bold'>Oops!</p>
        <p className='text-[20px] text-center p-3'>Seems you got lost in space, you can still go back to the space ship though😂</p>
        <div className='w-[180px] h-[50px] mb-8 rounded-full bg-[#FF2424] flex items-center justify-center cursor-pointer text-white' onClick={()=> {
            navigate('/')
        }}>Go to space ship</div>
    </section>
  )
}

export default Error404