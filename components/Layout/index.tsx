import { childNode, ServerSettingsProps, UserProps, UserSettingsProps } from "lib/interface";
import React, { useContext, useMemo } from "react";
import Box from "styled/Box";
import styled, { css } from "styled-components";
import { UserContext } from "components/User";
import { ServerSettingsContext } from "components/ServerSettings";
import { initializeUser } from "lib/initialize";
import publicIp from "public-ip";

const Wrapper = styled(Box) <{ bgcolor: string }>`
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

  useMemo(() => {
    if (serverSettings?.taskColor)
      serverSettingsInfo.setColorPalette(serverSettings.taskColor)
  }, [serverSettings])

  useMemo(async () => {
    let ip
    try {
      ip = await publicIp.v4()
    } catch (err) {
      ip = ''
    }
    if (user)
      userInfo.setUser({
        ...user,
        ip
      })
    else
      userInfo.setUser({
        ...initializeUser,
        ip
      })
  }, [user])

  useMemo(() => {
    if (userSettings)
      userInfo.setUserSettings(userSettings)
  }, [userSettings])

  return (
    <Wrapper
      data-test="component-layout"
      bgcolor={userInfo?.userSettings?.bgColor || 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);'}
    >
      <Box
        display='flex'
        flexDirection={['column', null, 'row']}
        height={main ? '100%' : 'auto'}
        minHeight={['auto', 'auto', 'auto', '1119px']}
        minWidth={["20px", '573px', "780px", "921px"]}
      >
        {children}
      </Box>
    </Wrapper>
  );
};

export default Layout;
