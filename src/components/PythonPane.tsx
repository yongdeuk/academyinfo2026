import Editor from '@monaco-editor/react'

interface Props {
  value: string
  onChange: (v: string) => void
  fontSize: number
  tabSize: number
  theme: 'light' | 'dark'
  highlightLine?: number | null
  readOnly?: boolean
}

export function PythonPane({
  value,
  onChange,
  fontSize,
  tabSize,
  theme,
  highlightLine,
  readOnly,
}: Props) {
  return (
    <div className="pane python-pane">
      <div className="pane-header">
        <span>파이썬 코드</span>
        {highlightLine ? <em className="line-badge">라인 {highlightLine}</em> : null}
      </div>
      <Editor
        height="100%"
        language="python"
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        value={value}
        onChange={(v) => onChange(v ?? '')}
        options={{
          fontSize,
          tabSize,
          minimap: { enabled: false },
          fontFamily: "'IBM Plex Mono', Consolas, monospace",
          lineNumbers: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          readOnly: !!readOnly,
          glyphMargin: true,
          renderLineHighlight: 'line',
        }}
        onMount={(editor, monaco) => {
          const updateDecoration = () => {
            const line = highlightLine
            if (!line) {
              editor.deltaDecorations(
                (editor as unknown as { __dbg?: string[] }).__dbg ?? [],
                [],
              )
              return
            }
            const deco = editor.deltaDecorations(
              (editor as unknown as { __dbg?: string[] }).__dbg ?? [],
              [
                {
                  range: new monaco.Range(line, 1, line, 1),
                  options: {
                    isWholeLine: true,
                    className: 'debug-line',
                    glyphMarginClassName: 'debug-glyph',
                  },
                },
              ],
            )
            ;(editor as unknown as { __dbg?: string[] }).__dbg = deco
            editor.revealLineInCenter(line)
          }
          updateDecoration()
          ;(editor as unknown as { __updateDbg?: () => void }).__updateDbg =
            updateDecoration
        }}
        key={`${theme}-${highlightLine ?? 0}-${readOnly ? 1 : 0}`}
      />
    </div>
  )
}
