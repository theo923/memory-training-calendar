import { UserContext } from 'components/User';
import { childNode } from 'lib/interface';
import React, { useContext } from 'react'
import styled, { css } from 'styled-components';
import Box from 'styled/Box';

interface Props {
  children?: childNode;
}

const MainComponentLayout = styled(Box) <{ bgcolor: string }>`
  height: 100%; 

  ${({ bgcolor }) => css`
    background: ${bgcolor}
  `}
`

const MainComponent: React.FC<Props> = ({
  children
}) => {
  const userInfo = useContext(UserContext)
  
  return (
    <MainComponentLayout
      data-test='component-mainComponent'
      position='relative'
      bgcolor={userInfo?.userSettings?.bgColor || 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);'}
      minHeight={['auto', 'auto', 'auto', '1119px']}
      minWidth={["20px", '573px', "780px", "921px"]}
      px={['0', '20px']}
      mx={['0', null, 'auto']}
    >
      {children}
    </MainComponentLayout>
  )
}

export default MainComponent
