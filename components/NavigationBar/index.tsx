import axios from 'axios';
import ColorPanel from 'components/ServerSettings/ColorPalette';
import { UserSettingsProps, BgColorProps, UserProps } from 'lib/interface';
import { refreshData } from 'lib/utils/refresh_data';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Box from 'styled/Box';
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import tw from 'twin.macro';

const NavigationBarWrapper = styled(Box)`
  z-index: 50;
  ${tw`rounded-md`}
`

interface InputValProp {
  bgColor: string
}


interface Props {
  user: UserProps
  userSettings?: UserSettingsProps
  colorPalette?: BgColorProps
}

const NavigationBar: React.FC<Props> = ({ user, userSettings, colorPalette }): JSX.Element => {
  const initializeInputVal = {
    bgColor: userSettings?.bgColor || '#fff'
  }
  const [inputVal, setInputVal] = useState<InputValProp>(initializeInputVal)
  const router: NextRouter = useRouter()

  useEffect(() => {
    if (userSettings?.bgColor !== inputVal?.bgColor) {
      updateSettings(inputVal)
    }
  }, [inputVal?.bgColor])

  const updateSettings = async (inputVal: InputValProp) => {
    await axios.post('/api/updateUserSettings', {
      userID: user?.id,
      bgColor: inputVal?.bgColor
    }).then(({ data }) => {
      if (data.success)
        refreshData()
    })
  }

  return (
    <NavigationBarWrapper
      data-test="component-NavigationBar"
      minWidth={['100px', null, null, null, '200px']}
      height="100%"
    >
      <Flex
        flexDirection={['row', null, 'column']}
        justifyContent='space-between'
        alignItems="center"
        height="100%"
        flexWrap='wrap'
      >
        <Box>
          <Text
            fontSize={['30px', null, null, null, '50px']}
            mr={['20px', null, '0']}
          >
            M-T-C
          </Text>
          <Box
            className='border-t-8 border-gray-300 rounded-lg shadow-xl mb-10'
            width='90%'
          />
        </Box>
        <Flex
          flexDirection={['row', null, 'column']}
          justifyContent="center"
          alignItems="center"
          my={['5px']}
        >
          <Box
            onClick={() => router.push("/dashboard")}
            my={['0', null, '20px']}
          >
            <Text
              className='cursor-pointer'
              fontSize='20px'
              mr={['20px', null, '0']}
            >
              Dashboard
            </Text>
          </Box>
          <Box
            onClick={() => router.push("/")}
            my={['0', null, '20px']}
          >
            <Text
              className='cursor-pointer'
              fontSize='20px'
              mr={['20px', null, '0']}
            >
              Calendar
            </Text>
          </Box>
          <Box
            onClick={() => router.push("/tasks")}
            my={['0', null, '20px']}
          >
            <Text
              className='cursor-pointer'
              fontSize='20px'
              mr={['20px', null, '0']}
            >
              Tasks
            </Text>
          </Box>
          <Box
            onClick={() => router.push("/todoList")}
            my={['0', null, '20px']}
          >
            <Text
              className='cursor-pointer'
              fontSize='20px'
              mr={['20px', null, '0']}
            >
              TodoList
            </Text>
          </Box>
        </Flex>
        {
          user?.id ?
            <Flex mb='10px'>
              <ColorPanel
                currentValue={inputVal?.bgColor}
                setInputVal={setInputVal}
                colors={colorPalette?.color_gradient}
                inputProperties='bgColor'
              />
            </Flex> :
            <Box />
        }
      </Flex>
    </NavigationBarWrapper >
  )
}

export default NavigationBar
