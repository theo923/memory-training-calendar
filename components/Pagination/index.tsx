import Button from "styled/Button";
import Flex from "styled/Flex";
import Box from "styled/Box";
import { NextRouter, useRouter } from "next/router";

interface Props {
  pageArray: number[]
  setPage: (page: number) => string
}

const Pagination: React.FC<Props> = ({
  pageArray,
  setPage
}): JSX.Element => {
  const router: NextRouter = useRouter()

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
          <Box key={`page_${item}`} mr='10px'>
            <Button
              key={item}
              onClick={() => router.push(setPage(item))}
              disabled={Boolean(item === parseInt(router.query['page'] as string))}
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
