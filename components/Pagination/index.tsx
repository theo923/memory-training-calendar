import { Dispatch } from "react";
import Button from "styled/Button";
import Flex from "styled/Flex";
import Box from "styled/Box";

interface Props {
  pageArray: number[]
  page: number
  setPage: Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<Props> = ({
  pageArray,
  // page,
  setPage
}): JSX.Element => {
  return (
    <Flex
      data-test="component-pagination"
      flexWrap='wrap'
      justifyContent='center'
      alignItems='center'
      mt='2.5rem'
    >
      {pageArray.map((item: number) => {
        return (
          <Box mr='10px'>
            <Button
              key={item}
              onClick={() => setPage(item)}
            >
              {item}
            </Button>
          </Box>
        );
      })
      }
    </Flex>
  );
};

export default Pagination;
