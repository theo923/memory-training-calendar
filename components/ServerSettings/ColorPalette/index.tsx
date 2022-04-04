import React, { useEffect } from 'react'
import { ColorProps } from 'lib/interface'
import { controlTaskColor } from 'lib/controller/controlTask'
import styled, { css } from 'styled-components'
import MotionBox from 'styled/MotionBox'
import Flex from 'styled/Flex'
import Text from 'styled/Text'
import { motionBoxVariant } from 'assets/animationVariant'
import ReactTooltip from "react-tooltip";

const ColorCircle = styled(MotionBox) <{ bgcolor: string, selected: boolean }>`
  cursor: pointer;
  height: 30px;
  width: 30px;
  margin-right: 10px;
  border: .2px solid transparent;
  border-radius: 50px;
  
  ${({ bgcolor, selected }) => css`
    background: ${bgcolor || '#fff'};
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
  useEffect(() => {
    ReactTooltip.rebuild();
  });

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
            bgcolor={color?.colorValue}
            data-tip data-for={`colorTip-${inputProperties}-${color.colorValue}`}
          />
      )}
      {colors && colors?.map(
        (color: ColorProps, idx: number) =>
          <ReactTooltip
            key={idx}
            id={`colorTip-${inputProperties}-${color.colorValue}`} place="top" effect="solid"
          >
            <Text color='white'>
              {color.colorName}
            </Text>
          </ReactTooltip>
      )}
    </Flex>
  )
}

export default ColorPanel
