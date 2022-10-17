import React, { useEffect, useRef } from 'react'

export default function Home () {
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
    <main className="w-screen h-screen overflow-hidden flex bg-orange-100">
      <div className='w-fit h-48 self-center ml-auto mr-auto container'>
        <h3 className='text-lg text-center'>
          Dear visitor,
          I&apos;m <span onClick={playHelloFromTracy} className='text-pink-500 underline cursor-pointer'>Tracy.</span> 😊
        </h3>
        <p className='mt-2'>My Portfolio Website is coming soon. </p>
      </div>
    </main>
  )
}
