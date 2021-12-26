import axios from 'axios';
import { initializeLoginInfo } from 'lib/initialize';
import { LoginInfoProps } from 'lib/interface';
import { NextRouter, useRouter } from 'next/router';
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
import tw from 'twin.macro';

const ContentBox = styled(Box)`
  padding: 50px 10px;
  background: white;
  ${tw`border-2 border-black shadow-md rounded-md mb-5`}
`

const LoginPanel = () => {
  const router: NextRouter = useRouter()
  const [_cT, setTokenCookie, _rTC] = useCookies(['calendar-user-token']);
  const [_cI, setIDCookie, _rIC] = useCookies(['calendar-user-id']);
  const [_cN, setNameCookie, _rNC] = useCookies(['calendar-user-name']);
  const [loginInfo, setLoginInfo] = useState<LoginInfoProps>(initializeLoginInfo)
  const [status, setStatus] = useState<string>('')

  const handleClick = async () => {
    setStatus('Loading...')
    const response = await axios.post('/api/authorization', {
      identifier: loginInfo.email,
      password: loginInfo.password
    })
    const { success } = response.data
    if (success) {
      const { data: { jwt, user: { id, username } } } = response.data
      setTokenCookie('calendar-user-token', jwt, {
        path: "/",
        maxAge: 3600,
        sameSite: true,
      })
      setIDCookie('calendar-user-id', id, {
        path: "/",
        maxAge: 3600,
        sameSite: true,
      })
      setNameCookie('calendar-user-name', username, {
        path: "/",
        maxAge: 3600,
        sameSite: true,
      })
      router.push('/')
    }
    else {
      setLoginInfo(initializeLoginInfo)
      setStatus('Failed, please try again!')
    }
  }

  return (
    <ContentBox data-test='component-loginPanel'>
      <Button onClick={() => router.back()}>
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
            Email:
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
            Password:
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
