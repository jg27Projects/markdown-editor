import { useEffect, useState, useRef } from "react"
import { EditorState } from "@codemirror/state"
import { EditorView, keymap, highlightActiveLine } from "@codemirror/view"
import { defaultKeymap } from "@codemirror/commands"
import { history, historyKeymap } from "@codemirror/history"
import { indentOnInput } from "@codemirror/language"
import { bracketMatching } from "@codemirror/matchbrackets"
import { lineNumbers, highlightActiveLineGutter } from "@codemirror/gutter"
import { defaultHighlightStyle } from "@codemirror/highlight"
import { javascript } from "@codemirror/lang-javascript"
import type React from "react"

// Props do componente useCodeMirror
interface Props{
  initialDoc: string,
  onChange: (state: EditorState) => void
}

const useCodeMirror = <T extends HTMLElement>(props: Props): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()
  const {onChange} = props

  useEffect(() => {
    // Se o refContainer não estiver definido, não faz nada
    if (!refContainer.current) return

    // Cria o estado inicial do editor'
    const startState = EditorState.create({
      doc: props.initialDoc, // Define o conteúdo inicial do editor
      extensions:[
        lineNumbers(), // Adiciona suporte a números de linha
        highlightActiveLineGutter(), // Adiciona suporte a highlight da linha ativa no gutter
        history(), // Adiciona suporte a undo e redo com ctrl+z e ctrl+y
        bracketMatching(), // Adiciona suporte a bracket matching
        highlightActiveLine(), // Adiciona suporte a highlight da linha ativa
        indentOnInput(), // Adiciona suporte a indentação
        defaultHighlightStyle.fallback, // Adiciona suporte a syntax highlight
        javascript(), // Adiciona suporte a javascript
        EditorView.lineWrapping, // Adiciona quebra de linha
        // updateListener é um listener que é chamado toda vez que o editor é atualizado
        EditorView.updateListener.of(update => {
          // Se houver mudanças no editor, chama a função onChange passando o novo estado
          if (update.changes) {
            onChange && onChange(update.state)
          }
        })
      ]
    })

    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    })
    setEditorView(view)
  }, [refContainer])

  return [refContainer, editorView]
}

export default useCodeMirror
