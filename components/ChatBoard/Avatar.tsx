import styled from "styled-components"
import Flex from "styled/Flex"
import Text from "styled/Text"

const AvatarIcon = styled(Flex)`
  justify-content: center;
  align-items:  center;
  background-color: white;
  border: .2px solid transparent;
`

interface Props {
  user: string
  width?: string[]
  height?: string[]
  radius?: string;
}

const Avatar: React.FC<Props> = ({
  user,
  width = ['30px'],
  height = ['30px'],
  radius = '30px',
}) => {
  return (
    <AvatarIcon
      width={width}
      height={height}
      borderRadius={radius}
    >
      <Text>
        {user.substr(0, 2).toUpperCase()}
      </Text>
    </AvatarIcon>
  )
}

export default Avatar

