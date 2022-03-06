import axios from 'axios';
import { auth } from 'lib/firebase';
import { getUserIP } from 'lib/get/getIP';
import { initializeLoginInfo } from 'lib/initialize';
import { LoginInfoProps } from 'lib/interface';
import { refreshData } from 'lib/utils/refresh_data';
import React, { ChangeEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import styled from 'styled-components';
import Box from 'styled/Box';
import Button from 'styled/Button';
import Flex from 'styled/Flex';
import Grid from 'styled/Grid';
import Input from 'styled/Input';
import Text from 'styled/Text';

const ContentBox = styled(Box)`
  padding: 50px 10px;
  background: transparent;
`

const LoginPanel = () => {
  const ip = getUserIP()
  const [_cT, setTokenCookie, _rTC] = useCookies(['calendar-user-token']);
  const [_cI, setIDCookie, _rIC] = useCookies(['calendar-user-id']);
  const [_cN, setNameCookie, _rNC] = useCookies(['calendar-user-name']);
  const [loginInfo, setLoginInfo] = useState<LoginInfoProps>(initializeLoginInfo)
  const [status, setStatus] = useState<string>('')

  const handleClick = async () => {
    setStatus('Loading...')
    const response = await axios.post('/api/authorization', {
      identifier: loginInfo.email,
      password: loginInfo.password,
      ip
    })
    const { success } = response.data
    if (success) {
      const { data: { jwt, user: { id, username } } } = response.data
      setTokenCookie('calendar-user-token', jwt, {
        path: "/",
        maxAge: 3600 * 10 * 365 * 24 * 60 * 60,
        sameSite: true,
      })
      setIDCookie('calendar-user-id', id, {
        path: "/",
        maxAge: 3600 * 10 * 365 * 24 * 60 * 60,
        sameSite: true,
      })
      setNameCookie('calendar-user-name', username, {
        path: "/",
        maxAge: 3600 * 10 * 365 * 24 * 60 * 60,
        sameSite: true,
      })
      await auth.signInWithEmailAndPassword(loginInfo.email, loginInfo.password)

      refreshData('/')
    }
    else {
      setLoginInfo(initializeLoginInfo)
      setStatus('Failed, please try again!')
    }
  }

  return (
    <ContentBox data-test='component-loginPanel'>
      <Button onClick={() => refreshData('', 'back')}>
        <BsFillArrowLeftSquareFill size='30px' />
      </Button>
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Text>
          Login
        </Text>
        <Grid gridTemplateColumns='0.8fr 1.2fr'>
          <Flex
            flexDirection='column'
            justifyContent='center'
          >
            <Text>
              Email:
            </Text>
          </Flex>
          <Input
            type='email'
            value={loginInfo.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLoginInfo(prev => { return { ...prev, email: e.target.value } })
            }
          />
          <Flex
            flexDirection='column'
            justifyContent='center'
          >
            <Text>
              Password:
            </Text>
          </Flex>
          <Input
            type='password'
            value={loginInfo.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLoginInfo(prev => { return { ...prev, password: e.target.value } })
            }
          />
        </Grid>
      </Flex>
      <Flex
        width='100%'
        justifyContent='flex-end'
      >
        <Flex>
          <Box mr='5px'>
            <Button onClick={() => handleClick()}>
              Submit
            </Button>
          </Box>
          <Button onClick={() => setLoginInfo(initializeLoginInfo)}>
            Reset
          </Button>
        </Flex>
      </Flex>
      {status.length > 0 && <Text color='red'>{status}</Text>}
    </ContentBox>
  )
}

export default LoginPanel
