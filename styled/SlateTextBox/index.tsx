import { useCallback, useMemo, useState } from "react"
import { createEditor, Editor, Transforms } from 'slate'
import { withReact, Slate, Editable, ReactEditor } from "slate-react"
import styled from "styled-components"
import Box from "styled/Box"
import tw from "twin.macro"
// import { Node } from 'slate';
import { BaseEditor } from 'slate'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string; bold?: true }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const SlateWrapper = styled(Box)`
  position: 'relative';
  width: 100%;
  height: 400px;
  overflow-y: auto;
  word-break: break-all;
  white-space: pre-line;
    ${tw`border-2 border-black shadow-md rounded-md px-2 my-2`}
`

const ControlWording = styled(Box)`
    position: relative;
    outline: none;
    white-space: pre-wrap;
    overflow-wrap: break-word;
`

const SlateTextBox = () => {
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), [])
  // Add the initial value when setting up our state.
  const [value, setValue] = useState<any>([
    {
      type: 'code',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  return (
    <SlateWrapper>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue: any) => setValue(newValue)}
      >
        <Editable
          renderElement={renderElement}
          onKeyDown={event => {
            if (event.key === '`' && event.ctrlKey) {
              event.preventDefault()
              // Determine whether any of the currently selected blocks are code blocks.
              //@ts-ignore
              const [match] = Editor.nodes(editor, {
                match: (n: any) => n.type === 'code',
              })
              // Toggle the block type depending on whether there's already a match.
              Transforms.setNodes(
                editor,
                //@ts-ignore
                { type: match ? 'paragraph' : 'code' },
                { match: n => Editor.isBlock(editor, n) }
              )
            }
          }}
        />
      </Slate>
    </SlateWrapper>
  )
}


const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>
        <ControlWording>
          {props.children}
        </ControlWording>
      </code>
    </pre>
  )
}

const DefaultElement = (props: any) => {
  return <ControlWording {...props.attributes}>{props.children}</ControlWording>
}

export default SlateTextBox
