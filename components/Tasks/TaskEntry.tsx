import { setTextColor, setBooleanColor } from "lib/controller/controlColor";
import { TaskProps } from "lib/interface";
import { useState } from "react";
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import styled, { css } from "styled-components";
import Box from "styled/Box";
import Button from "styled/Button";
import Flex from "styled/Flex";
import GlassBox from "styled/GlassBox";
import ReadSlateText from "styled/ReadSlateText";
import Text from "styled/Text";
import tw from "twin.macro";

type FinishedIdentifier = {
  finished: boolean
}

const FinishedIdentifier = styled(Flex) <FinishedIdentifier>`
  width: 20px;
   ${tw`rounded-sm`}

  ${({ finished }) => css`
    background-color: ${setBooleanColor(finished)};
  `}
`;

const TaskEntryTitle = styled(GlassBox) <{ setTaskColor: string }>`
  display: flex;
  border-radius: 5px;
  font-weight: 700;
  white-space: pre-line;
  justify-content: space-between;


  ${({ setTaskColor }) => css`
    background: ${setTaskColor || ''}
  `}
`

const TaskEntryDescription = styled(GlassBox) <{ setTaskColor: string }>`
  display: flex;
  border-radius: 5px;
  font-weight: 700;
  white-space: pre-line;
  overflow-y: auto;

  ${({ setTaskColor }) => css`
    background: ${setTaskColor || ''}
  `}
`

interface Props {
  task: TaskProps
}

const TaskEntry: React.FC<Props> = ({
  task,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Box
      data-test="calendar-TaskEntry"
      mx='20px'
    >
      <TaskEntryTitle
        my={['10px']}
        mx={['10px', '0px']}
        setTaskColor={'#fff'}
      >
        <FinishedIdentifier
          finished={task?.targetedDate.filter(tk => tk.t_finished === true)?.length > 0}
        />
        <Box
          mx='3px'
          my='8px'
          p={['3px']}
        >
          <Text
            fontSize='18px'
            color={setTextColor(7)}
          >
            {task?.taskTitle}
          </Text>
        </Box>
        {open &&
          <Button onClick={() => setOpen(prev => !prev)}>
            <FaCompressArrowsAlt size='20px' />
          </Button>
        }
        {!open &&
          <Button onClick={() => setOpen(prev => !prev)}>
            <FaExpandArrowsAlt size='20px' />
          </Button>
        }
      </TaskEntryTitle>
      {open &&
        <TaskEntryDescription
          my={['10px']}
          mx={['10px', '0px']}
          setTaskColor={'#fff'}
        >
          <Box
            mx='10px'
            my='8px'
            p={['3px']}
            maxHeight='300px'
            width='auto'
            maxWidth={['400px', '600px', '425px']}
          >
            <Text
              fontSize='18px'
              color={setTextColor(7)}
            >
              <ReadSlateText
                values={JSON.parse(task?.taskDescription)}
              />
            </Text>
          </Box>
        </TaskEntryDescription>
      }
    </Box>
  )
}

export default TaskEntry
