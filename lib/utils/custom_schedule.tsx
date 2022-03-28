import { ChangeEvent } from "react"
import Box from "styled/Box"
import Flex from "styled/Flex"
import styled from 'styled-components'
import Input from "styled/Input"
import { ScheduleProps, TaskDateProps } from "lib/interface"
import { addDays } from "date-fns"
import { getFullDate } from "lib/get/getDate"
import Text from "styled/Text"

export const custom_schedule = (target: Date, inputVal: ScheduleProps) => {
  let cTarget: Date = target
  const returnVal: TaskDateProps[] = []

  for (let i = 0; i < inputVal.daily; i++) {
    returnVal.push({
      t_date: getFullDate(cTarget),
      t_period: 'Daily',
      t_finished: false
    })
    cTarget = addDays(cTarget, 1)
  }

  for (let i = 0; i < inputVal.bidaily; i++) {
    returnVal.push({
      t_date: getFullDate(cTarget),
      t_period: 'BiDaily',
      t_finished: false
    })
    cTarget = addDays(cTarget, 2)
  }

  for (let i = 0; i < inputVal.weekly; i++) {
    returnVal.push({
      t_date: getFullDate(cTarget),
      t_period: 'Weekly',
      t_finished: false
    })
    cTarget = addDays(cTarget, 7)
  }

  for (let i = 0; i < inputVal.monthly; i++) {
    returnVal.push({
      t_date: getFullDate(cTarget),
      t_period: 'Monthly',
      t_finished: false
    })
    cTarget = addDays(cTarget, 30)
  }

  returnVal.push({
    t_date: getFullDate(cTarget),
    t_period: 'Monthly',
    t_finished: false
  })

  return returnVal
}

const InputText = styled(Text)`
  align-self: center;
`

interface Props {
  inputVal: ScheduleProps
  setInputVal: React.Dispatch<React.SetStateAction<ScheduleProps>>
  extend?: boolean
}

const CustomSchedule: React.FC<Props> = ({
  inputVal,
  setInputVal,
  extend
}) => {

  return (
    <Box>
      <Flex>
        <Box width='100%'>
          <InputText
            extend={extend ? true : false}
            fontSize={['20px', null, '20px']}
            lineHeight={['20px', null, '28px']}
          >
            Daily:
          </InputText>
        </Box>
        <Box width='100%'>
          <Input
            type='number'
            value={inputVal.daily}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) => (
                setInputVal(prev => {
                  const number = Math.abs(Number(e.target.value))
                  const result = number > 10 ? 10 : number < 0 ? 0 : number
                  return { ...prev, 'daily': result }
                })
              )
            }
          />
        </Box>
      </Flex>
      <Flex>
        <Box width='100%'>
          <InputText
            extend={extend ? true : false}
            fontSize={['20px', null, '20px']}
            lineHeight={['20px', null, '28px']}
          >
            BiDaily:
          </InputText>
        </Box>
        <Box width='100%'>
          <Input
            type='number'
            value={inputVal.bidaily}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) => (
                setInputVal(prev => {
                  const number = Math.abs(Number(e.target.value))
                  const result = number > 10 ? 10 : number < 0 ? 0 : number
                  return { ...prev, 'bidaily': result }
                })
              )
            }
          />
        </Box>
      </Flex>
      <Flex>
        <Box width='100%'>
          <InputText
            extend={extend ? true : false}
            fontSize={['20px', null, '20px']}
            lineHeight={['20px', null, '28px']}
          >
            Weekly:
          </InputText>
        </Box>
        <Box width='100%'>
          <Input
            type='number'
            value={inputVal.weekly}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) => (
                setInputVal(prev => {
                  const number = Math.abs(Number(e.target.value))
                  const result = number > 10 ? 10 : number < 0 ? 0 : number
                  return { ...prev, 'weekly': result }
                })
              )
            }
          />
        </Box>
      </Flex>
      <Flex>
        <Box width='100%'>
          <InputText
            extend={extend ? true : false}
            fontSize={['20px', null, '20px']}
            lineHeight={['20px', null, '28px']}
          >
            Monthly:
          </InputText>
        </Box>
        <Box width='100%'>
          <Input
            type='number'
            value={inputVal.monthly}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) => (
                setInputVal(prev => {
                  const number = Math.abs(Number(e.target.value))
                  const result = number > 10 ? 10 : number < 0 ? 0 : number
                  return { ...prev, 'monthly': result }
                })
              )
            }
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default CustomSchedule
