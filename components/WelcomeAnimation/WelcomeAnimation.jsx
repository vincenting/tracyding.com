import mojs from '@mojs/core'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

import TracyPortrait from './images/tracy_portrait.png'
const commonShapeAttrs = {
  radius: 'rand(30, 60)',
  stroke: ['#7CDA6E', '#EC4899', '#F2DB12'],
  scale: { 1: 0 },
  duration: 800,
  pathScale: 'rand(.5, 1)',
  isForce3d: true
}

const WelcomeAnimation = () => {
  const animDom = useRef()
  const portraitDom = useRef()

  const timeline = new mojs.Timeline({
    onPlaybackComplete () {
      animDom.current.replaceChildren()
    }
  })

  useEffect(() => {
    const burstLines = new mojs.Burst({
      parent: animDom.current,
      count: 5,
      radius: { 50: 250 },
      children: {
        ...commonShapeAttrs,
        fill: 'white',
        shape: ['line', 'zigzag'],
        strokeWidth: 12,
        radiusY: 0,
        degreeShift: 'rand(-360, 360)',
        angle: 90
      }
    })

    const burstShapes = new mojs.Burst({
      parent: animDom.current,
      count: 5,
      radius: { 0: 250 },
      children: {
        ...commonShapeAttrs,
        shape: ['circle', 'rect'],
        points: 5,
        pathScale: 'rand(.5, 1)',
        isForce3d: true
      }
    })
    const html = new mojs.Html({
      el: portraitDom.current,
      opacity: { 0: 1 },
      delay: 200
    })

    timeline.add(burstShapes, burstLines, html)
    timeline.play()
  }, [])

  return (
    <>
      <div className='w-1/3 ml-auto mr-auto lg:mb-10 mb-4 opacity-0' ref={portraitDom}>
        <Image
          src={TracyPortrait}
          priority={1}
          alt="Tracy's Portrait"
          className='ml-auto mr-auto'
          width={246}
          height={570}
          layout="responsive"
        />
      </div>
      <div className='absolute w-full h-3/4 left-0 top-0' ref={animDom}></div>
    </>
  )
}

export default WelcomeAnimation
