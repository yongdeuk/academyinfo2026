interface Props {
  stdout: string
  stderr: string
  running?: boolean
  onStart?: () => void
  pyReady?: boolean
  busy?: boolean
}

/** 엔트리 실행화면 스타일의 블록 결과 스테이지 */
export function EntryStage({
  stdout,
  stderr,
  running,
  onStart,
  pyReady,
  busy,
}: Props) {
  const lines = stdout
    .split(/\r?\n/)
    .map((l) => l.trimEnd())
    .filter((l) => l.length > 0)
  const bubbles = lines.slice(-4)

  return (
    <div className="pane entry-stage-pane">
      <div className="pane-header">
        <span>실행 화면</span>
        <div className="pane-actions">
          <button
            type="button"
            className="btn entry-start"
            disabled={!onStart || busy || !pyReady}
            onClick={onStart}
          >
            {busy || running ? '실행 중…' : '시작하기'}
          </button>
        </div>
      </div>

      <div className="entry-stage">
        <div className="entry-stage-grid" aria-hidden />
        <div className="entry-stage-coords">x: 0 · y: 0</div>

        <div className="entry-actor">
          <div className="entry-sprite" aria-hidden>
            <svg viewBox="0 0 80 90" width="72" height="80">
              <ellipse cx="40" cy="78" rx="18" ry="5" fill="rgba(0,0,0,0.12)" />
              <circle cx="40" cy="36" r="22" fill="#ffb84d" />
              <circle cx="32" cy="32" r="3.2" fill="#2c313d" />
              <circle cx="48" cy="32" r="3.2" fill="#2c313d" />
              <path
                d="M32 44 Q40 50 48 44"
                fill="none"
                stroke="#2c313d"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <ellipse cx="24" cy="58" rx="8" ry="12" fill="#ff9f2e" />
              <ellipse cx="56" cy="58" rx="8" ry="12" fill="#ff9f2e" />
              <ellipse cx="40" cy="62" rx="14" ry="16" fill="#ffb84d" />
            </svg>
          </div>

          {bubbles.length > 0 ? (
            <div className="entry-bubbles">
              {bubbles.map((line, i) => (
                <div key={`${i}-${line}`} className="entry-bubble">
                  {line}
                </div>
              ))}
            </div>
          ) : (
            <div className="entry-bubble entry-bubble-empty">
              {stderr
                ? '실행 중 오류가 발생했습니다.'
                : '시작하기를 누르면 결과가 여기에 나타납니다.'}
            </div>
          )}
        </div>

        {stderr ? (
          <div className="entry-stage-error">
            <strong>오류</strong>
            <pre>{stderr}</pre>
          </div>
        ) : null}
      </div>

      <div className="entry-stage-footer">
        <span>엔트리 스타일 실행 화면</span>
        <span className="muted">출력은 말풍선으로 표시됩니다</span>
      </div>
    </div>
  )
}
