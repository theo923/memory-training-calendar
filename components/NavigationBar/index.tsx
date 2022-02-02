import axios from 'axios';
import ColorPanel from 'components/ServerSettings/ColorPalette';
import { getUserIP } from 'lib/get/getIP';
import { UserSettingsProps, BgColorProps, UserProps } from 'lib/interface';
import { refreshData } from 'lib/utils/refresh_data';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styled, { css } from "styled-components";
import Box from 'styled/Box';
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import tw from 'twin.macro';
import { motionBoxVariant } from 'assets/animationVariant';
import MotionBox from 'styled/MotionBox';
import ReactTooltip from 'react-tooltip';
import { navData, NavDataProps } from './navData';

const NavigationBarWrapper = styled(Box)`
  z-index: 50;
  ${tw`rounded-md`}
`

const NavButton = styled(MotionBox) <{ bgcolor: string, selected: boolean }>`
  cursor: pointer;
  border: .2px solid transparent;
  border-radius: 50px;
  
  // ${({ bgcolor, selected }) => css`
  //   background: ${bgcolor || '#fff'};
  //   border: ${selected ? '1px solid #000' : null}
  // `}
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
  const ip = getUserIP()
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
      ip,
      userID: user?.id,
      userName: user.username,
      bgColor: inputVal?.bgColor
    }).then(({ data }) => {
      if (data.success)
        refreshData()
    })
  }

  return (
    <NavigationBarWrapper
      data-test="component-navigationBar"
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
          flexWrap='wrap'
        >
          {navData && navData.map(
            (nav: NavDataProps, idx: number) =>
              <NavButton
                key={idx}
                my={['0', null, '20px']}
                mr={['10px', null, '0']}
                variants={motionBoxVariant}
                initial="initial"
                animate="animate"
                whileHover='hover'
                onClick={() => router.push(nav.destination)}
                bgcolor={'#fff'}
                selected={true}
                data-tip data-for={`navTip-${nav.name}`}
              >
                {nav.icon}
              </NavButton>
          )}
        </Flex>
        {user?.id ?
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
        <ReactTooltip
          id={`colorTip-777`} place="top" effect="solid"
        >
          <Text>
            DashBoard
          </Text>
        </ReactTooltip>

        {navData && navData.map(
          (nav: NavDataProps, idx: number) =>
            <ReactTooltip
              key={idx}
              id={`navTip-${nav.name}`} place="top" effect="solid"
            >
              <Text>
                {nav.name}
              </Text>
            </ReactTooltip>
        )}
      </Flex>
    </NavigationBarWrapper >
  )
}

export default NavigationBar
