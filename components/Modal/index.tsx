import { useContext } from 'react'
import styled from 'styled-components'
import Box from 'styled/Box'
import Flex from "styled/Flex"
import { ModalContext } from './ModalContext'

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

const ContentWrapper = styled(Box)`
  border-radius: 50px;
  padding: 20px;
  top: 0; 
  left: 0;
  right: 0; 
  bottom: 0;
  background-color: #fff;
  z-index: 50;
  word-break: break-all;
  white-space: pre-line;
`

const Modal = () => {
  const modalContext = useContext(ModalContext)
  return (
    <Box
      data-test='component-modal'
      display={modalContext.modalIsOpen ? 'block' : 'none'}
    >
      <ModalWrapper>
        <ContentWrapper
          minHeight={['auto', null, '70vh']}
          minWidth={['auto', null, '70vw']}
          maxHeight={['auto', null, '70vh']}
          maxWidth={['auto', null, '70vw']}
        >
          <Box>
            {
              //@ts-ignore
              modalContext?.modalContent?.props?.children
            }
          </Box>
        </ContentWrapper>
      </ModalWrapper>
    </Box>
  )
}

export default Modal

