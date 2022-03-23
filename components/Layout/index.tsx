import { childNode, ServerSettingsProps, UserProps, UserSettingsProps } from "lib/interface";
import React, { useContext, useEffect } from "react";
import Box from "styled/Box";
import GlassBox from "styled/GlassBox";
import styled, { css } from "styled-components";
import { UserContext } from "components/User";
import { ServerSettingsContext } from "components/ServerSettings";
import { initializeUser } from "lib/initialize";

const Wrapper = styled(Box) <{ bgcolor: string }>`
  min-height: 100vh;
  min-width: 100vw;

  @media only screen and (max-width: 768px) {
    min-width: auto;
  }
  
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
    <Wrapper
      data-test="component-layout"
      bgcolor={userInfo?.userSettings?.bgColor || 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);'}
    >
      <GlassBox
        display='flex'
        flexDirection={['column', null, 'row']}
        height={main ? '100%' : 'auto'}
      >
        {children}
      </GlassBox>
    </Wrapper>
  );
};

export default Layout;
