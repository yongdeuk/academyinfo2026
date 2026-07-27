import Editor from '@monaco-editor/react'

interface Props {
  value: string
  onChange: (v: string) => void
  fontSize: number
  tabSize: number
  theme: 'light' | 'dark'
  highlightLine?: number | null
  readOnly?: boolean
  onRun?: () => void
  pyReady?: boolean
  busy?: boolean
}

export function PythonPane({
  value,
  onChange,
  fontSize,
  tabSize,
  theme,
  highlightLine,
  readOnly,
  onRun,
  pyReady,
  busy,
}: Props) {
  return (
    <div className="pane python-pane">
      <div className="pane-header">
        <span>파이썬 코드</span>
        <div className="pane-actions">
          {highlightLine ? <em className="line-badge">라인 {highlightLine}</em> : null}
          <button
            type="button"
            className="btn primary"
            disabled={!onRun || busy || !pyReady}
            onClick={onRun}
          >
            {busy ? '실행 중…' : '▶ 파이썬 실행'}
          </button>
        </div>
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
