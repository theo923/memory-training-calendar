import axios from 'axios';
import { UserContext } from 'components/User';
import { auth } from 'lib/firebase';
import { initializeRegisterInfo } from 'lib/initialize';
import { RegisterInfoProps } from 'lib/interface';
import { refreshData } from 'lib/utils/refresh_data';
import React, { ChangeEvent, useContext, useState } from 'react';
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

const RegisterPanel = () => {
  const userInfo = useContext(UserContext)
  const [_c, setCookie, _rC] = useCookies(['calendar-user-token']);
  const [registerInfo, setRegisterInfo] = useState<RegisterInfoProps>(initializeRegisterInfo)
  const [status, setStatus] = useState<string>('')

  const handleClick = async () => {
    if (
      !registerInfo.email ||
      !registerInfo.username ||
      !registerInfo.password ||
      registerInfo.confirmPassword != registerInfo.password
    ) {
      setRegisterInfo(prev => {
        return {
          ...prev,
          confirmPassword: ''
        }
      })
      setStatus('Please make sure all the fields are correct!')
      return
    }
    setStatus('Loading...')
    const response = await axios.post('/api/registration', {
      email: registerInfo.email,
      username: registerInfo.username,
      password: registerInfo.password,
      ip: userInfo?.user?.ip,
    })
    const { success } = response.data
    if (success) {
      const { data: { jwt } } = response.data
      setCookie('calendar-user-token', jwt, {
        path: "/",
        maxAge: 3600,
        sameSite: true,
      })

      await auth.createUserWithEmailAndPassword(registerInfo.email, registerInfo.password)

      refreshData('/')
    }
    else {
      setRegisterInfo(initializeRegisterInfo)
      setStatus('Failed, please try again!')
    }
  }

  return (
    <ContentBox data-test='component-registerPanel'>
      <Button onClick={() => refreshData('', 'back')}>
        <BsFillArrowLeftSquareFill size='30px' />
      </Button>
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Text>
          Register
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
            value={registerInfo.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRegisterInfo(prev => { return { ...prev, email: e.target.value } })
            }
          />
          <Flex
            flexDirection='column'
            justifyContent='center'
          >
            <Text>
              Username:
            </Text>
          </Flex>
          <Input
            value={registerInfo.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRegisterInfo(prev => { return { ...prev, username: e.target.value } })
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
            value={registerInfo.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRegisterInfo(prev => { return { ...prev, password: e.target.value } })
            }
          />
          <Flex
            flexDirection='column'
            justifyContent='center'
          >
            <Text>
              Confirm Password:
            </Text>
          </Flex>
          <Input
            type='password'
            value={registerInfo.confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRegisterInfo(prev => { return { ...prev, confirmPassword: e.target.value } })
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
            <Button
              onClick={() => handleClick()}
              disabled={Boolean(status === 'Loading...')}
            >
              Submit
            </Button>
          </Box>
          <Button
            onClick={() => setRegisterInfo(initializeRegisterInfo)}
            disabled={Boolean(status === 'Loading...')}
          >
            Reset
          </Button>
        </Flex>
      </Flex>
      {status.length > 0 && <Text color='red'>{status}</Text>}
    </ContentBox>
  )
}

export default RegisterPanel
