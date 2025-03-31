import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Navbar() {
  return (
    <div className=' sticky top-0 z-50   flex  justify-between  items-center   w-full'  style={{backgroundColor:'#FFFFFF'}}>
        
        <div  style={{  margin: '10px', padding: '10px' }} >
        <Link href="/">
            <Image src='/photoDagm3.png' alt='5G' width={163} height={42} />
            </Link>
        </div>

        <div >
    <h1   className=' text-3xl text-lime-800 font-bold whitespace-nowrap text-center m-2.5 font-serif' >For Example</h1>
    
</div>
       
        
   
         </div>
  )
}

export default Navbar