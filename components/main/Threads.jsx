import React from 'react'
import Button from '../common/Button'

const ThreadsMain = () => {
  return (
    <>
    <div className='w-full  flex flex-col md:flex-row p-5 md:py-16 py-8 gap-6 border border-t-[var(--primary-light)] border-b-[var(--primary)] '>
        
        <div className="img-container md:h-72 overflow-clip w-full h-32 md:w-[70%]  bg-[url(/images/Threads.png)] ">
          {/* <img src="/images/Threads.png" alt="threads" srcset="" className='' /> */}

        </div>
        <div className="gap-4 flex flex-col justify-end ">
          <h1 className='text-6xl font-extrabold tracking-tighter font-ibmplexmono flex '>threads<p className=' font-mono'>{'.'}</p></h1>
          <p className='bg-[var(--image-bg)] font-ibmplexmono md:text-xl text-sm w-max px-2 '>Annual technology magazine of CSEA </p>
          <Button text={'Learn More'} link={'/threads'} />
        </div>
      
    </div>
    </>
    
  )
}

export default ThreadsMain
