import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, Descendant } from 'slate'
import { Element } from 'styled/SlateTextBox/utils'
import { withHistory } from 'slate-history'
import { Leaf, withEmbeds, HOTKEYS, toggleMark } from 'styled/SlateTextBox/utils'

interface Props {
  values?: Descendant[]
}

const ReadSlateText: React.FC<Props> = ({ values }) => {
  try {
    const [value, setValue] = useState<Descendant[]>(values || initialValue)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withEmbeds(withHistory(withReact(createEditor()))), [])

    return (
      <Slate editor={editor} value={value} onChange={value => setValue(value)} >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          autoFocus
          readOnly
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

export default ReadSlateText
