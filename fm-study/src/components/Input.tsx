import React, { useState } from 'react'
import tw, { css } from 'twin.macro'
import { inputHandler } from '@/types/input'

interface InputProps {
  inputHandler: inputHandler
}

const Input = ({ inputHandler }: InputProps) => {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setter(Number(e.target.value))
  }

  return (
    <div>
      {inputHandler.states.map((state, i) => {
        return (
          <div key={i} tw='flex items-center'>
            <div tw='w-24 pb-1 text-blue-600'>{state.name}</div>
            <input
              type='range'
              min={state.min}
              max={state.max}
              step={state.step}
              value={state.variable}
              onChange={(e) => onChange(e, state.setter)}
            ></input>
            <div tw='w-24 pb-1 text-blue-600 ml-4'>{state.variable}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Input
