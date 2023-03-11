'use client'

import * as R from 'ramda'
import React, { useCallback, useEffect, useState } from 'react'
import tw, { css } from 'twin.macro'
import Piece from './icons/Piece'

const COLS = 8
const ROWS = 8

const InitialBoardState: Array<Array<'Black' | 'White' | 'None'>> = R.repeat(
  R.repeat('None', COLS),
  ROWS,
).map((row) => [...row]) as Array<Array<'Black' | 'White' | 'None'>>
InitialBoardState[3][3] = 'White'
InitialBoardState[4][4] = 'White'
InitialBoardState[3][4] = 'Black'
InitialBoardState[4][3] = 'Black'

const Reversi = () => {
  const [turn, setTurn] = useState<'Black' | 'White' | 'BlackJudge' | 'WhiteJudge'>('Black')
  const [boardState, setBoardState] = useState<
    Array<Array<'Black' | 'White' | 'BlackJudge' | 'WhiteJudge' | 'None'>>
  >(InitialBoardState.map((row) => [...row]))
  const [move, setMove] = useState<{ x: number; y: number; t: 'Black' | 'White' }>()

  const judgeBoard = useCallback(
    ({ x, y, t }: { x: number; y: number; t: 'Black' | 'White' }) => {
      if (turn === 'Black' || turn === 'White') return
      const col = boardState[x].slice()
      const colFirst = col.findIndex((it) => it === t)
      const colLast = R.lastIndexOf(t, col)
      colFirst >= 0 &&
        setBoardState((prev) => {
          prev = prev.map((x) =>
            x.map((xy) => (xy === 'BlackJudge' ? 'Black' : xy === 'WhiteJudge' ? 'White' : xy)),
          )
          for (let i = 1; colFirst + i < colLast; i++) {
            prev[x][colFirst + i] !== t &&
              (prev[x][colFirst + i] = t === 'Black' ? 'BlackJudge' : 'WhiteJudge')
          }
          prev[x][y] = t
          prev[x][colFirst] = t
          prev[x][colLast] = t
          console.log(prev)
          return prev
        })
      setTurn((prev) => (prev === 'BlackJudge' ? 'White' : 'Black'))
    },
    [boardState, turn],
  )

  useEffect(() => {
    if (!move || turn === 'Black' || turn === 'White') return
    judgeBoard(move)
  }, [turn, move, judgeBoard])

  return (
    <div tw='flex items-start h-[396px] pt-3'>
      <table tw='border bg-green-800'>
        <tbody>
          {[...Array(ROWS)].map((_, n) => (
            <tr key={n}>
              {boardState.map((cols, x) => (
                <td
                  tw='border-2 w-12 h-12'
                  key={String(x) + String(n)}
                  onClick={() => {
                    if (turn === 'BlackJudge' || turn === 'WhiteJudge') return
                    setBoardState((prev) => {
                      prev[x][n] = turn
                      return prev
                    })
                    setMove({
                      x: x,
                      y: n,
                      t: turn,
                    })
                    setTurn((prev) => (prev === 'Black' ? 'BlackJudge' : 'WhiteJudge'))
                  }}
                >
                  {cols[n] === 'White' || cols[n] === 'WhiteJudge' ? (
                    <Piece
                      tw='m-auto'
                      width={25}
                      height={25}
                      fillColor={'white'}
                      strokeColor={'black'}
                      flip={cols[n] === 'WhiteJudge'}
                    />
                  ) : (
                    (cols[n] === 'Black' || cols[n] === 'BlackJudge') && (
                      <Piece
                        tw='m-auto'
                        width={25}
                        height={25}
                        fillColor={'black'}
                        strokeColor={'white'}
                        flip={cols[n] === 'BlackJudge'}
                      />
                    )
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div tw='flex flex-col h-full justify-between items-start ml-6'>
        <div>手番：{turn === 'BlackJudge' ? 'Black' : turn === 'WhiteJudge' ? 'White' : turn}</div>
        <button
          tw='bg-gray-800 text-white rounded-md p-2'
          onClick={() => {
            setTurn('Black')
            setBoardState(InitialBoardState.map((row) => [...row]))
          }}
        >
          リセット
        </button>
      </div>
    </div>
  )
}

export default Reversi
