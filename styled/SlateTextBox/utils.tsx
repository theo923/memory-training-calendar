import { Editor, Transforms, Element as SlateElement, BaseEditor } from "slate"
import { ReactEditor, useSlate } from "slate-react"
import styled from "styled-components"
import Box from "styled/Box"
import tw from "twin.macro"
import { Button, Icon } from "./components"
import { CustomElement, ButtonInterface, CustomText, ElementInterface } from "./interface"

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

export const SlateWrapper = styled(Box)`
  position: 'relative';
  width: 100%;
  overflow-y: auto;
  word-break: break-all;
  white-space: pre-line;
    ${tw`border-2 border-black shadow-md rounded-md px-2 my-2`}
`

export const HOTKEYS: { [key: string]: string } = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

export const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const withEmbeds = (editor: Editor) => {
  editor.isVoid = (el: CustomElement) => el.type === 'youtube'
  return editor
}

export const toggleImage = (editor: Editor) => {
  const imageUrl = prompt('Please Enter any image link') || ''
  const imageRegex = /(https?:\/\/.*\.(?:png|jpg))/i
  const imageLink = imageUrl.match(imageRegex)
  if (imageLink == null) return

  Transforms.insertNodes(editor, [{
    type: 'image',
    imageLink: imageLink![1],
    children: [{ text: '' }]
  },
  {
    type: 'paragraph',
    children: [{ text: '' }]
  }])

}

export const toggleYoutube = (editor: Editor) => {
  const videoLink = prompt('Please Enter any youtube link') || ''
  const youtubeRegex = /^(?:(?:https?:)?\/\/)?(?:(?:www|m)\.)?(?:(?:youtube\.com|youtu.be))(?:\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(?:\S+)?$/
  const videoId = videoLink.match(youtubeRegex)
  if (videoId == null) return

  Transforms.insertNodes(editor, [{
    type: 'youtube',
    videoId: videoId![1],
    children: [{ text: '' }]
  },
  {
    type: 'paragraph',
    children: [{ text: '' }]
  }])

}

export const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })
  const newProperties: { type: string } = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block: CustomElement = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

export const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export const isBlockActive = (editor: Editor, format: string) => {
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

export const isMarkActive = (editor: Editor, format: string | number) => {
  const marks = Editor.marks(editor)
  if (!marks || !marks.hasOwnProperty(format)) return false
  return true
}

export const Element = ({ attributes, children, element }: ElementInterface) => {
  switch (element.type) {
    case 'image':
      return (
        <div {...attributes}
          style={{ userSelect: "none" }}
          contentEditable={false}
        >
          <img src={element.imageLink || ''} />
          {children}
        </div>
      )
    case 'youtube':
      return (
        <div {...attributes}>
          <div
            style={{ userSelect: "none" }}
            contentEditable={false}
          >
            <iframe
              src={`https://www.youtube.com/embed/${element.videoId}`}
              aria-label="Youtube video"
              frameBorder="0"
            ></iframe>
          </div>
          {children}
        </div>
      )
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

export const Leaf = ({ attributes, children, leaf }: ElementInterface) => {
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

export const ImageButton = ({ format, icon }: ButtonInterface) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(editor, format)}
      onClick={(event: { preventDefault: () => void }) => {
        event.preventDefault()
        toggleImage(editor)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

export const YoutubeButton = ({ format, icon }: ButtonInterface) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(editor, format)}
      onClick={(event: { preventDefault: () => void }) => {
        event.preventDefault()
        toggleYoutube(editor)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

export const BlockButton = ({ format, icon }: ButtonInterface) => {
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

export const MarkButton = ({ format, icon }: ButtonInterface) => {
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
