import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate, ReactEditor } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
  BaseEditor,
} from 'slate'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string; bold?: true }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

import { withHistory } from 'slate-history'

import { Button, Icon, Toolbar } from './components'
import { AiOutlineBold, AiOutlineItalic, AiOutlineUnderline } from 'react-icons/ai'
import { BsCode } from 'react-icons/bs'
import { MdFormatQuote, MdLooksOne, MdLooksTwo } from 'react-icons/md'
import { ImListNumbered, ImList } from 'react-icons/im'
import styled from 'styled-components'
import Box from 'styled/Box'
import tw from 'twin.macro'
import ReactDOMServer from 'react-dom/server';
import { TaskProps } from 'lib/interface'
import { serialize } from './serialize'

const SlateWrapper = styled(Box)`
  position: 'relative';
  width: 100%;
  height: 400px;
  overflow-y: auto;
  word-break: break-all;
  white-space: pre-line;
    ${tw`border-2 border-black shadow-md rounded-md px-2 my-2`}
`

const HOTKEYS: any = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

interface Props {
  onChange: (setInputVal: React.Dispatch<React.SetStateAction<TaskProps>>, e?: ChangeEvent<HTMLInputElement> | undefined, value?: string | undefined) => void;
  changeObject: React.Dispatch<React.SetStateAction<TaskProps>>;
}

const RichTextExample: React.FC<Props> = ({ onChange, changeObject }) => {
  const [value, setValue] = useState<Descendant[]>(initialValue)
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const returnVal = ReactDOMServer.renderToStaticMarkup(
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  )

  useEffect(() => {
    onChange(changeObject, undefined, serialize(returnVal))
  }, [returnVal])

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <SlateWrapper>
        <Toolbar>
          <MarkButton format="bold" icon={<AiOutlineBold size='20px' />}></MarkButton>
          <MarkButton format="italic" icon={<AiOutlineItalic size='20px' />} />
          <MarkButton format="underline" icon={<AiOutlineUnderline size='20px' />} />
          <MarkButton format="code" icon={<BsCode size='20px' />} />
          <BlockButton format="heading-one" icon={<MdLooksOne size='20px' />} />
          <BlockButton format="heading-two" icon={<MdLooksTwo size='20px' />} />
          <BlockButton format="block-quote" icon={<MdFormatQuote size='20px' />} />
          <BlockButton format="numbered-list" icon={<ImListNumbered size='20px' />} />
          <BlockButton format="bulleted-list" icon={<ImList size='20px' />} />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onKeyDown={event => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
              }
            }
          }}
        />
      </SlateWrapper>
    </Slate>
  )
}

const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })
  const newProperties: any = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block: any = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor: Editor, format: string) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  )

  return !!match
}

const isMarkActive = (editor: Editor, format: string | number) => {
  const marks: any = Editor.marks(editor)
  return marks ? marks![format] === true : false
}

const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }: any) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event: { preventDefault: () => void }) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const MarkButton = ({ format, icon }: any) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: { preventDefault: () => void }) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const initialValue: any = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
]

export default RichTextExample
