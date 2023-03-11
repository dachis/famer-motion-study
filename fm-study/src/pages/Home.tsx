'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import tw, { css } from 'twin.macro'
import Input from '@/components/Input'
import Reversi from '@/components/Reversi'

export default function Home() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [rotate, setRotate] = useState(0)
  const [damping, setDamping] = useState(10)

  const inputHandler = {
    states: [
      { name: 'x', variable: x, setter: setX, min: -100, max: 100, step: 1 },
      { name: 'y', variable: y, setter: setY, min: -100, max: 100, step: 1 },
      { name: 'rotate', variable: rotate, setter: setRotate, min: 0, max: 360, step: 1 },
      { name: 'damping', variable: damping, setter: setDamping, min: 0, max: 10, step: 1 },
    ],
  }

  const spring = {
    type: 'spring',
    damping: damping,
    stiffness: 100,
    duration: 1.5,
  }

  const variants = {
    active: {
      backgroundColor: '#f00',
    },
    inactive: {
      backgroundColor: '#fff',
      transition: { duration: 2 },
    },
  }

  return (
    <main tw='pt-3 px-12'>
      <div>Motion Component</div>
      <div tw='flex items-center w-full mt-3'>
        <div tw='min-w-[384px] min-h-[384px] place-content-center grid border rounded-md mr-6'>
          <motion.div
            tw='w-24 h-24 bg-blue-600 rounded-md'
            transition={spring}
            variants={variants}
            animate={{
              x: x,
              y: y,
              rotate: rotate,
            }}
            whileTap={{ scale: 0.8, boxShadow: '10px 10px 0 rgba(0, 0, 0, 0.2)', opacity: '70%' }}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          />
        </div>
        <Input inputHandler={inputHandler} />
      </div>
      <div tw='mt-3'>
        オセロ
        <Reversi />
      </div>
    </main>
  )
}
