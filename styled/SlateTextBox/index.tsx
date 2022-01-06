import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, Descendant } from 'slate'
import { withHistory } from 'slate-history'
import { Toolbar } from './components'
import { AiOutlineBold, AiOutlineItalic, AiOutlineUnderline, AiFillYoutube } from 'react-icons/ai'
import { BsCode } from 'react-icons/bs'
import { MdFormatQuote, MdLooksOne, MdLooksTwo, MdImage } from 'react-icons/md'
import { ImListNumbered, ImList } from 'react-icons/im'
import { TaskProps } from 'lib/interface'
import { Element } from './utils'
import { Leaf, withEmbeds, HOTKEYS, toggleMark, SlateWrapper, MarkButton, YoutubeButton, ImageButton, BlockButton } from './utils'

interface Props {
  values?: Descendant[]
  onChange: (setInputVal: React.Dispatch<React.SetStateAction<TaskProps>>, e?: ChangeEvent<HTMLInputElement> | undefined, value?: string | undefined) => void;
  changeObject: React.Dispatch<React.SetStateAction<TaskProps>>;
}

const RichTextExample: React.FC<Props> = ({ values, onChange, changeObject }) => {
  try {
    const [value, setValue] = useState<Descendant[]>(values || initialValue)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withEmbeds(withHistory(withReact(createEditor()))), [])

    useEffect(() => {
      onChange(changeObject, undefined, JSON.stringify(value))
    }, [value])

    return (
      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <SlateWrapper>
          <Toolbar>
            <MarkButton format="bold" icon={<AiOutlineBold size='20px' />} />
            <MarkButton format="italic" icon={<AiOutlineItalic size='20px' />} />
            <MarkButton format="underline" icon={<AiOutlineUnderline size='20px' />} />
            <MarkButton format="code" icon={<BsCode size='20px' />} />
            <YoutubeButton format="youtube" icon={<AiFillYoutube size='20px' />} />
            <ImageButton format="image" icon={<MdImage size='20px' />} />
            <BlockButton format="heading-one" icon={<MdLooksOne size='20px' />} />
            <BlockButton format="heading-two" icon={<MdLooksTwo size='20px' />} />
            <BlockButton format="block-quote" icon={<MdFormatQuote size='20px' />} />
            <BlockButton format="numbered-list" icon={<ImListNumbered size='20px' />} />
            <BlockButton format="bulleted-list" icon={<ImList size='20px' />} />
          </Toolbar>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some text…"
            spellCheck
            autoFocus
            onKeyDown={event => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
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
  } catch (err) {
    console.log(err)
    return <></>
  }
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Here is you task content.' }],
  }
]

export default RichTextExample
