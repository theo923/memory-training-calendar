import { childNode, ServerSettingsProps, UserProps, UserSettingsProps } from "lib/interface";
import React, { useContext, useEffect } from "react";
import Box from "styled/Box";
import Flex from "styled/Flex";
import Grid from "styled/Grid";
import GlassBox from "styled/GlassBox";
import styled, { css } from "styled-components";
import { UserContext } from "components/User";
import { ServerSettingsContext } from "components/ServerSettings";
import { initializeUser } from "lib/initialize";

const Wrapper = styled(Box) <{ bgcolor: string }>`
  min-height: 100vh;
  min-width: 100vw;
  
  ${({ bgcolor }) => css`
    background: ${bgcolor}
  `}
`

interface Props {
  main?: boolean
  children?: childNode;
  user?: UserProps;
  serverSettings?: ServerSettingsProps;
  userSettings?: UserSettingsProps;
}

const Layout: React.FC<Props> = ({
  main,
  children,
  user,
  serverSettings,
  userSettings
}): JSX.Element => {
  const serverSettingsInfo = useContext(ServerSettingsContext)
  const userInfo = useContext(UserContext)

  useEffect(() => {
    if (serverSettings?.taskColor)
      serverSettingsInfo.setColorPalette(serverSettings.taskColor)
  }, [serverSettings])

  useEffect(() => {
    if (user)
      userInfo.setUser(user)
    else
      userInfo.setUser(initializeUser)
  }, [user])

  useEffect(() => {
    if (userSettings)
      userInfo.setUserSettings(userSettings)
  }, [userSettings])

  return (
    <Wrapper bgcolor={userInfo?.userSettings?.bgColor || 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);'}>
      <Grid
        data-test="component-layout"
        gridTemplateColumns={['1fr', '0.5fr 1fr 0.5fr']}
      >
        <Box />
        <Flex
          flexDirection={['column', null, 'row']}
          justifyContent='center'
          alignItems='center'
        >
          <GlassBox
            display='flex'
            flexDirection={['column', null, 'row']}
            justifyContent='center'
            height={main ? '100%' : 'auto'}
          >
            {children}
          </GlassBox>
        </Flex>
        <Box />
      </Grid>
    </Wrapper>
  );
};

export default Layout;
