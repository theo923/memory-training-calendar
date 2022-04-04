import { ChangeEvent } from "react"
import styled from "styled-components"
import Box from "styled/Box"
import Flex from "styled/Flex"
import Text from 'styled/Text'

const Wrapper = styled(Flex)``

const StyledRadio = styled.input``

interface Props {
  extend?: boolean
  layout: 'column' | 'row'
  name: string
  values: string[]
  currentValue: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const RadioButton: React.FC<Props> = ({
  extend,
  layout,
  name,
  values,
  currentValue,
  onChange
}) => {
  return (
    <Wrapper flexDirection={layout}>
      {values?.length > 0 && values.map(
        (val: string, idx: number) => (
          <Flex
            key={idx}
            justifyContent='space-between'
            alignItems='center'
            mr={layout === 'row' ? '20px' : '0'}
          >
            <Box mr='10px'>
              <Text extend={extend ? extend : false}>
                {val}
              </Text>
            </Box>
            <StyledRadio
              type='radio'
              checked={Boolean(currentValue === val)}
              name={name}
              value={val}
              onChange={
                (e: ChangeEvent<HTMLInputElement>) => onChange(e)
              }
            />
          </Flex>
        )
      )}
    </Wrapper>
  )
}

export default RadioButton
