import type { DebugFrame } from '../types'

interface Props {
  blockStdout: string
  blockStderr: string
  pythonStdout: string
  pythonStderr: string
  frames: DebugFrame[]
  frameIndex: number
  debugging: boolean
  onFrameIndex: (i: number) => void
}

export function ConsoleDebugger({
  blockStdout,
  blockStderr,
  pythonStdout,
  pythonStderr,
  frames,
  frameIndex,
  debugging,
  onFrameIndex,
}: Props) {
  const frame = frames[frameIndex]
  const locals = frame?.locals ?? {}

  return (
    <div className="console-debug">
      <div className="console-col">
        <div className="pane-header">
          <span>블록 실행 결과</span>
        </div>
        <pre className={`console-out ${blockStderr ? 'has-error' : ''}`}>
          {blockStdout || (blockStderr ? '' : '블록 실행 결과가 여기에 표시됩니다.')}
          {blockStderr ? `\n[오류]\n${blockStderr}` : ''}
        </pre>
      </div>
      <div className="console-col">
        <div className="pane-header">
          <span>파이썬 실행 결과</span>
          {debugging && frames.length > 0 ? (
            <span className="muted">
              스텝 {frameIndex + 1}/{frames.length}
              {frame ? ` · ${frame.event} · L${frame.line}` : ''}
            </span>
          ) : null}
        </div>
        <pre className={`console-out ${pythonStderr ? 'has-error' : ''}`}>
          {pythonStdout || (pythonStderr ? '' : '파이썬 실행 결과가 여기에 표시됩니다.')}
          {pythonStderr ? `\n[오류]\n${pythonStderr}` : ''}
        </pre>
        {debugging && frames.length > 0 ? (
          <div className="step-controls">
            <button
              type="button"
              className="btn ghost"
              disabled={frameIndex <= 0}
              onClick={() => onFrameIndex(Math.max(0, frameIndex - 1))}
            >
              ← 이전
            </button>
            <input
              type="range"
              min={0}
              max={Math.max(0, frames.length - 1)}
              value={frameIndex}
              onChange={(e) => onFrameIndex(Number(e.target.value))}
            />
            <button
              type="button"
              className="btn ghost"
              disabled={frameIndex >= frames.length - 1}
              onClick={() =>
                onFrameIndex(Math.min(frames.length - 1, frameIndex + 1))
              }
            >
              다음 →
            </button>
          </div>
        ) : null}
      </div>
      <div className="vars-col">
        <div className="pane-header">
          <span>변수 감시</span>
        </div>
        <div className="vars-body">
          {Object.keys(locals).length === 0 ? (
            <p className="muted">디버그 실행 시 지역 변수가 표시됩니다.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>값</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(locals).map(([k, v]) => (
                  <tr key={k}>
                    <td>{k}</td>
                    <td>
                      <code>{v}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
