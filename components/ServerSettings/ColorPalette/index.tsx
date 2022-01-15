import React from 'react'
import { ColorProps } from 'lib/interface'
import { controlTaskColor } from 'lib/controller/controlTask'
import styled, { css } from 'styled-components'
import MotionBox from 'styled/MotionBox'
import Flex from 'styled/Flex'
import { motionBoxVariant } from 'assets/animationVariant'

const ColorCircle = styled(MotionBox) <{ bgColor: string, selected: boolean }>`
  cursor: pointer;
  height: 30px;
  width: 30px;
  margin-right: 10px;
  border: .2px solid transparent;
  border-radius: 50px;
  
  ${({ bgColor, selected }) => css`
    background: ${bgColor || '#fff'};
    border: ${selected ? '1px solid #000' : null}
  `}
`

interface Props {
  colors?: ColorProps[],
  currentValue?: string
  setInputVal: React.Dispatch<React.SetStateAction<any>>,
  inputProperties: string
}

const ColorPanel: React.FC<Props> = ({
  colors,
  currentValue,
  setInputVal,
  inputProperties
}): JSX.Element => {
  return (
    <Flex
      data-test="ServerSettings-colorPalette"
      flexWrap='wrap'
      mb='20px'
    >
      {colors && colors?.map(
        (color: ColorProps, idx: number) =>
          <ColorCircle
            key={idx}
            variants={motionBoxVariant}
            initial="initial"
            animate="animate"
            whileHover='hover'
            my='10px'
            mx='10px'
            onClick={() => controlTaskColor(setInputVal, color, inputProperties)}
            selected={currentValue === color?.colorValue}
            bgColor={color?.colorValue}
          />)
      }
    </Flex>
  )
}

export default ColorPanel
