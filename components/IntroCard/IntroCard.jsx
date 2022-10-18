import dynamic from 'next/dynamic'
import React, { useEffect, useRef } from 'react'

const WelcomeAnimation = dynamic(() => import('../WelcomeAnimation/WelcomeAnimation'), {
  ssr: false
})

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
    <>
      <section {...props}>
        <div className='w-fit ml-auto mr-auto'>
          <WelcomeAnimation />
          <h3 className='text-lg text-center'>
              Dear visitor,
              I&apos;m <span onClick={playHelloFromTracy} className='text-pink-500 underline cursor-pointer'>Tracy.</span> 😊
          </h3>
          <p className='mt-2'>My Portfolio Website is coming soon. </p>
        </div>
      </section>
    </>
  )
}
