import React, {useCallback, useEffect} from "react"
import useCodeMirror from "./use-codemirror"
import "./editor.css"

interface Props {
  initialDoc: string,
  onChange: (doc: string) => void
}

const Editor: React.FC<Props> = (props) => {
  const { onChange, initialDoc } = props

  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: "I love Thaís da Rosa",
    onChange: () => {}
  })

  useEffect(() => {
    if (editorView) {
      // Do nothing for now
    }
  }, [editorView])


  return <div className="editor-wrapper" ref={refContainer}></div>
}

export default Editor
