import axios from 'axios';
import ColorPanel from 'components/ServerSettings/ColorPalette';
import { getUserIP } from 'lib/get/getIP';
import { refreshData } from 'lib/utils/refresh_data';
import { NextRouter, useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components";
import Box from 'styled/Box';
import Flex from 'styled/Flex';
import Text from 'styled/Text';
import tw from 'twin.macro';
import { motionBoxVariant } from 'assets/animationVariant';
import MotionBox from 'styled/MotionBox';
import ReactTooltip from 'react-tooltip';
import { navData, NavDataProps } from './navData';
import { ServerSettingsContext } from 'components/ServerSettings';
import { UserContext } from 'components/User';
import Button from 'styled/Button';

const NavigationBarWrapper = styled(Box)`
  z-index: 50;
  ${tw`rounded-md`}
`

const MotionFlexContainer = styled(MotionBox)`
  cursor: pointer;
  border: .2px solid transparent;
  border-radius: 50px;
  display: flex;
`

interface InputValProp {
  bgColor: string
}

const NavigationBar = (): JSX.Element => {
  const ip = getUserIP()
  const serverSettingsInfo = useContext(ServerSettingsContext)
  const userInfo = useContext(UserContext)
  const [inputVal, setInputVal] = useState<InputValProp>()
  const router: NextRouter = useRouter()
  const [itemHover, setItemHover] = useState('')

  useEffect(() => {
    setInputVal({ bgColor: userInfo?.userSettings?.bgColor })
  }, [userInfo?.userSettings?.bgColor])

  useEffect(() => {
    if (userInfo?.userSettings?.bgColor !== inputVal?.bgColor) {
      if (inputVal)
        updateSettings(inputVal)
    }
  }, [inputVal?.bgColor])

  const updateSettings = async (inputVal: InputValProp) => {
    await axios.post('/api/updateUserSettings', {
      ip,
      userID: userInfo?.user?.id,
      userName: userInfo?.user.username,
      bgColor: inputVal?.bgColor
    }).then(({ data }) => {
      if (data.success)
        refreshData('', 'reload')
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
              <MotionFlexContainer
                key={idx}
                variants={motionBoxVariant}
                initial="initial"
                animate="animate"
                whileHover='hover'
                flexDirection={['row', null, null, 'column']}
                alignItems="center"
                my={['0', null, '20px']}
                onMouseOver={() => setItemHover(nav.name)}
                onMouseLeave={() => setItemHover('')}
                onClick={() => {
                  if (router.asPath === nav.destination)
                    refreshData('', 'reload')
                  else
                    refreshData(nav.destination, 'replace')
                }}
              >
                <Button
                  mr={['10px', null, '0']}
                  mb={['0px', null, '10px']}
                  data-tip data-for={`navTip-${nav.name}`}
                >
                  {nav.icon}
                </Button>
                {itemHover === nav.name &&
                  <Text display={['none', null, null, null, 'block']}>
                    {nav.name}
                  </Text>
                }
              </MotionFlexContainer>
          )}
        </Flex>
        {userInfo?.user?.id ?
          <Flex mb='10px'>
            <ColorPanel
              currentValue={inputVal?.bgColor}
              setInputVal={setInputVal}
              colors={serverSettingsInfo?.colorPalette?.color_gradient}
              inputProperties='bgColor'
            />
          </Flex> :
          <Box />
        }

      </Flex>
      {navData && navData.map(
        (nav: NavDataProps, idx: number) =>
          <Box key={idx} display={['block', null, null, null, 'none']}>
            <ReactTooltip
              id={`navTip-${nav.name}`} place="top" effect="solid"
            >
              <Text>
                {nav.name}
              </Text>
            </ReactTooltip>
          </Box>
      )}
    </NavigationBarWrapper>
  )
}

export default NavigationBar
