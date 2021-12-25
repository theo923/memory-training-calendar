import axios from 'axios';
import { getHiddenWords } from 'lib/get/getHiddenWords';
import { initializeRegisterInfo } from 'lib/initialize';
import { RegisterInfoProps } from 'lib/interface';
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

const RegisterPanel = () => {
  const router: NextRouter = useRouter()
  const [_c, setCookie, _rC] = useCookies(['calendar-user-token']);
  const [registerInfo, setRegisterInfo] = useState<RegisterInfoProps>(initializeRegisterInfo)
  const [fail, setFail] = useState<string>('')

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
      setFail('Please make sure all the fields are correct!')
      return
    }
    const response = await axios.post('/api/registration', {
      email: registerInfo.email,
      username: registerInfo.username,
      password: registerInfo.password
    })
    const { success } = response.data
    if (success) {
      const { data: { jwt } } = response.data
      setCookie('calendar-user-token', jwt, {
        path: "/",
        maxAge: 3600,
        sameSite: true,
      })
      router.push('/')
    }
    else {
      setRegisterInfo(initializeRegisterInfo)
      setFail('Failed, please try again!')
    }
  }

  return (
    <ContentBox data-test='component-registerPanel'>
      <Button onClick={() => router.back()}>
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
            Email:
          </Flex>
          <Input
            value={registerInfo.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRegisterInfo(prev => { return { ...prev, email: e.target.value } })
            }
          />
          <Flex
            flexDirection='column'
            justifyContent='center'
          >
            Username:
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
            Password:
          </Flex>
          <Input
            value={getHiddenWords(registerInfo.password)}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRegisterInfo(prev => { return { ...prev, password: e.target.value } })
            }
          />
          <Flex
            flexDirection='column'
            justifyContent='center'
          >
            Confirm Password:
          </Flex>
          <Input
            value={getHiddenWords(registerInfo.confirmPassword)}
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
            <Button onClick={() => handleClick()}>
              Submit
            </Button>
          </Box>
          <Button onClick={() => setRegisterInfo(initializeRegisterInfo)}>
            Reset
          </Button>
        </Flex>
      </Flex>
      {fail.length > 0 && <Text color='red'>{fail}</Text>}
    </ContentBox>
  )
}

export default RegisterPanel
