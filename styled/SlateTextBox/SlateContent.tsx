import React from 'react'
import Prism from "prismjs";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-python";
import Box from 'styled/Box';

interface Props {
  httpString: string
}

const SlateContent: React.FC<Props> = ({ httpString }) => {

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll(Boolean(httpString));
    }
  }, []);

  return (
    <Box my='10px' dangerouslySetInnerHTML={{ __html: httpString }} />
  )
}

export default SlateContent

