import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import TracyPortrait from './images/tracy_portrait.png'

export default function IntroCard (props) {
  const audio = useRef()
  useEffect(() => {
    audio.current = new Audio('/audio/hi_im_tracy.mp3')
  }, [])

  const playHelloFromTracy = () => {
    if (audio.current) {
      audio.current.currentTime = 0
      audio.current.play()
    }
  }

  return (
    <section {...props}>
        <div className='w-fit ml-auto mr-auto'>
        <div className='w-1/3 ml-auto mr-auto lg:mb-10 mb-4'>
            <Image
            src={TracyPortrait}
            alt="Tracy's Portrait"
            className='ml-auto mr-auto'
            />
        </div>
        <h3 className='text-lg text-center'>
            Dear visitor,
            I&apos;m <span onClick={playHelloFromTracy} className='text-pink-500 underline cursor-pointer'>Tracy.</span> 😊
        </h3>
        <p className='mt-2'>My Portfolio Website is coming soon. </p>
        </div>
    </section>
  )
}
