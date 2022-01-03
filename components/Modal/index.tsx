import styled from 'styled-components'
import Box from 'styled/Box'
import Flex from "styled/Flex"

const ModalWrapper = styled(Flex)`
  position: absolute;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  top: 0; 
  left: 0;
  right: 0; 
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 50;
`

const ContentWrapper = styled(Flex)`
  border-radius: 50px;
  padding: 20px;
  top: 0; 
  left: 0;
  right: 0; 
  bottom: 0;
  max-width: 50vw;
  max-height: 50vh;
  background-color: #fff;
  z-index: 50;
  word-break: break-all;
  white-space: pre-line;
`

interface Props {
  show?: boolean
  children?: React.ReactNode
}

const Modal: React.FC<Props> = ({ show = false, children }) => {
  return (
    <ModalWrapper data-test='component-modal' display={show ? 'block' : 'none'}>
      <ContentWrapper>
        <Box>
          {children}
        </Box>
      </ContentWrapper>
    </ModalWrapper>
  )
}

export default Modal

