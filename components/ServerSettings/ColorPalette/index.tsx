import React from 'react'
import { ColorProps, TaskProps } from 'lib/interface'
import { controlTaskColor } from 'lib/controller/controlTask'
import styled, { css } from 'styled-components'
import Box from 'styled/Box'
import Flex from 'styled/Flex'

const ColorCircle = styled(Box) <{ bgColor: string, selected: boolean }>`
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
  colors: ColorProps[],
  inputVal: TaskProps,
  setInputVal: React.Dispatch<React.SetStateAction<TaskProps>>,
}

const ColorPanel: React.FC<Props> = ({
  colors,
  inputVal,
  setInputVal,
}): JSX.Element => {
  return (
    <Flex
      data-test="ServerSettings-colorPalette"
      mb='20px'
    >
      {colors && colors?.map(
        (color: ColorProps, idx: number) =>
          <ColorCircle
            key={idx}
            onClick={() => controlTaskColor(setInputVal, color)}
            selected={inputVal?.taskColor === color?.colorValue}
            bgColor={color?.colorValue}
          />)
      }
    </Flex>
  )
}

export default ColorPanel
