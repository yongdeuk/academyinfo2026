import type { GradeResult, PracticeProblem } from '../types'

interface Props {
  problem: PracticeProblem
  grade: GradeResult | null
  showSolution: boolean
  onToggleSolution: () => void
  onLoadSolution: () => void
  onResetStarter: () => void
  onGrade: () => void
  busy: boolean
  pyReady: boolean
}

export function PracticePanel({
  problem,
  grade,
  showSolution,
  onToggleSolution,
  onLoadSolution,
  onResetStarter,
  onGrade,
  busy,
  pyReady,
}: Props) {
  return (
    <section className="practice-panel">
      <div className="practice-head">
        <div>
          <h1>{problem.title}</h1>
          <p className="practice-desc">{problem.description}</p>
          {problem.tips && problem.tips.length > 0 ? (
            <ul className="points">
              {problem.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="practice-actions">
          <span className={`diff ${problem.difficulty}`}>{problem.difficulty}</span>
          <button
            type="button"
            className="btn primary"
            disabled={busy || !pyReady}
            onClick={onGrade}
          >
            {busy ? '채점 중…' : '✓ 자동 채점'}
          </button>
          <button type="button" className="btn ghost" onClick={onResetStarter}>
            초기 코드
          </button>
          <button type="button" className="btn ghost" onClick={onToggleSolution}>
            {showSolution ? '모범답안 숨기기' : '모범답안'}
          </button>
          {showSolution ? (
            <button type="button" className="btn" onClick={onLoadSolution}>
              모범답안 불러오기
            </button>
          ) : null}
        </div>
      </div>

      {showSolution ? (
        <pre className="solution-box">{problem.solution}</pre>
      ) : null}

      {grade ? (
        <div className={`grade-box ${grade.ok ? 'pass' : 'fail'}`}>
          <div className="grade-summary">
            {grade.compileError
              ? `실행 오류: ${grade.compileError}`
              : `채점 결과 ${grade.passed}/${grade.total} 통과`}
          </div>
          <ul className="grade-cases">
            {grade.cases.map((c) => (
              <li key={c.id} className={c.passed ? 'ok' : 'ng'}>
                <strong>{c.passed ? 'PASS' : 'FAIL'}</strong>
                <span>{c.description}</span>
                {!c.passed ? (
                  <code>
                    기대 {c.expected} / 결과 {c.actual || '(없음)'}
                    {c.error ? ` / 오류: ${c.error}` : ''}
                  </code>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="muted small">
          함수를 완성한 뒤 <strong>자동 채점</strong>을 누르면 테스트 케이스로 검사합니다.
        </p>
      )}
    </section>
  )
}
