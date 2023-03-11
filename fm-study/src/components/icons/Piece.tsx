import { motion } from 'framer-motion'

interface PieceProps {
  className?: string
  strokeColor?: string
  fillColor?: string
  width?: number
  height?: number
}

const Piece = ({ className, strokeColor, fillColor, width = 55, height = 55 }: PieceProps) => {
  return (
    <motion.svg
      className={className}
      width={width}
      height={height}
      viewBox='0 0 70 70'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <motion.circle
        cx='35'
        cy='35'
        r='31'
        fill={fillColor || 'white'}
        stroke={strokeColor || 'black'}
        strokeWidth='8'
        // initial={{ pathLength: 0 }}
        animate={{ rotateX: 180, rotate: 90 }}
        transition={{ duration: 0.1 }}
      />
    </motion.svg>
  )
}

export default Piece
