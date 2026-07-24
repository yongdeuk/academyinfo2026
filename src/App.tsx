import { useCallback, useEffect, useMemo, useState } from 'react'
import { TOPICS } from './data/topics'
import { EXAMPLES, examplesByTopic } from './data/examples'
import { PRACTICES, practicesByTopic } from './data/practices'
import { BlocklyPane } from './components/BlocklyPane'
import { PythonPane } from './components/PythonPane'
import { ConsoleDebugger } from './components/ConsoleDebugger'
import { PracticePanel } from './components/PracticePanel'
import { debugPython, getPyodide, runPython } from './lib/pyodideRunner'
import { gradePractice } from './lib/grader'
import type { AppSettings, DebugFrame, GradeResult, TopicId } from './types'
import './styles.css'

const DEFAULT_SETTINGS: AppSettings = {
  fontSize: 15,
  autoSyncBlocks: true,
  showLineNumbers: true,
  debugCaptureStdout: true,
  theme: 'light',
  editorTabSize: 4,
}

type ViewMode = 'example' | 'practice'

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('example')
  const [topicId, setTopicId] = useState<TopicId>('variables')
  const [exampleId, setExampleId] = useState(EXAMPLES[0].id)
  const [practiceId, setPracticeId] = useState(PRACTICES[0].id)
  const [code, setCode] = useState(EXAMPLES[0].python)
  const [blockXml, setBlockXml] = useState(EXAMPLES[0].blocklyXml)
  const [stdout, setStdout] = useState('')
  const [stderr, setStderr] = useState('')
  const [frames, setFrames] = useState<DebugFrame[]>([])
  const [frameIndex, setFrameIndex] = useState(0)
  const [debugging, setDebugging] = useState(false)
  const [busy, setBusy] = useState(false)
  const [pyReady, setPyReady] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [grade, setGrade] = useState<GradeResult | null>(null)
  const [showSolution, setShowSolution] = useState(false)
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const raw = localStorage.getItem('b2p-settings')
      return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS
    } catch {
      return DEFAULT_SETTINGS
    }
  })

  const topic = TOPICS.find((t) => t.id === topicId)!
  const topicExamples = useMemo(() => examplesByTopic(topicId), [topicId])
  const topicPractices = useMemo(() => practicesByTopic(topicId), [topicId])
  const example = EXAMPLES.find((e) => e.id === exampleId) ?? topicExamples[0]
  const practice = PRACTICES.find((p) => p.id === practiceId) ?? topicPractices[0]

  useEffect(() => {
    localStorage.setItem('b2p-settings', JSON.stringify(settings))
    document.documentElement.dataset.theme = settings.theme
  }, [settings])

  useEffect(() => {
    getPyodide()
      .then(() => setPyReady(true))
      .catch((e) => {
        console.error(e)
        setStderr('Pyodide 로드 실패: 네트워크를 확인하세요.')
      })
  }, [])

  const clearRunState = () => {
    setStdout('')
    setStderr('')
    setFrames([])
    setFrameIndex(0)
    setDebugging(false)
    setGrade(null)
    setShowSolution(false)
  }

  const loadExample = useCallback((id: string) => {
    const ex = EXAMPLES.find((e) => e.id === id)
    if (!ex) return
    setViewMode('example')
    setExampleId(ex.id)
    setTopicId(ex.topicId)
    setCode(ex.python)
    setBlockXml(ex.blocklyXml)
    clearRunState()
  }, [])

  const loadPractice = useCallback((id: string) => {
    const p = PRACTICES.find((x) => x.id === id)
    if (!p) return
    setViewMode('practice')
    setPracticeId(p.id)
    setTopicId(p.topicId)
    setCode(p.starterCode)
    setBlockXml('<xml xmlns="https://developers.google.com/blockly/xml"></xml>')
    clearRunState()
  }, [])

  const onTopic = (id: TopicId) => {
    setTopicId(id)
    if (viewMode === 'practice') {
      const list = practicesByTopic(id)
      if (list[0]) loadPractice(list[0].id)
    } else {
      const list = examplesByTopic(id)
      if (list[0]) loadExample(list[0].id)
    }
  }

  const handleRun = async () => {
    setBusy(true)
    setDebugging(false)
    setFrames([])
    setFrameIndex(0)
    try {
      const result = await runPython(code)
      setStdout(result.stdout)
      setStderr(result.stderr)
    } finally {
      setBusy(false)
    }
  }

  const handleDebug = async () => {
    setBusy(true)
    try {
      const result = await debugPython(code)
      setStdout(result.stdout)
      setStderr(result.stderr)
      setFrames(result.frames ?? [])
      setFrameIndex(0)
      setDebugging(true)
      if (result.frames?.[0]) {
        setStdout(result.frames[0].stdout || result.stdout)
      }
    } finally {
      setBusy(false)
    }
  }

  const handleGrade = async () => {
    if (!practice) return
    setBusy(true)
    setDebugging(false)
    try {
      const result = await gradePractice(practice, code)
      setGrade(result)
      setStdout(
        result.compileError
          ? ''
          : `채점: ${result.passed}/${result.total} 통과`,
      )
      setStderr(result.compileError ?? '')
    } finally {
      setBusy(false)
    }
  }

  const onFrameIndex = (i: number) => {
    setFrameIndex(i)
    const f = frames[i]
    if (f) setStdout(f.stdout)
  }

  const highlightLine = debugging ? frames[frameIndex]?.line ?? null : null

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <strong>block2python</strong>
          <span>중·고 정보 연계 · 예시 학습 · 실습 자동채점</span>
        </div>
        <div className="actions">
          <div className="mode-toggle" role="group" aria-label="모드">
            <button
              type="button"
              className={viewMode === 'example' ? 'active' : ''}
              onClick={() => {
                if (example) loadExample(example.id)
                else setViewMode('example')
              }}
            >
              예시 학습
            </button>
            <button
              type="button"
              className={viewMode === 'practice' ? 'active' : ''}
              onClick={() => {
                if (practice) loadPractice(practice.id)
                else setViewMode('practice')
              }}
            >
              실습 문제
            </button>
          </div>
          <button
            type="button"
            className="btn primary"
            disabled={busy || !pyReady}
            onClick={viewMode === 'practice' ? handleGrade : handleRun}
          >
            {busy
              ? '처리 중…'
              : !pyReady
                ? '엔진 로딩…'
                : viewMode === 'practice'
                  ? '✓ 채점'
                  : '▶ 실행'}
          </button>
          {viewMode === 'example' ? (
            <button
              type="button"
              className="btn"
              disabled={busy || !pyReady}
              onClick={handleDebug}
            >
              🐞 디버그
            </button>
          ) : (
            <button
              type="button"
              className="btn"
              disabled={busy || !pyReady}
              onClick={handleRun}
            >
              ▶ 실행
            </button>
          )}
          <button
            type="button"
            className="btn ghost"
            onClick={() => setSettingsOpen((v) => !v)}
          >
            설정
          </button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <h2>2022 개정 · 정보</h2>
          <nav className="topics">
            {TOPICS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={t.id === topicId ? 'active' : ''}
                onClick={() => onTopic(t.id)}
              >
                {t.short}
              </button>
            ))}
          </nav>

          <div className="topic-info">
            <h3>{topic.label}</h3>
            <p>{topic.description}</p>
          </div>

          {viewMode === 'example' ? (
            <>
              <h2>예시</h2>
              <ul className="examples">
                {topicExamples.map((ex) => (
                  <li key={ex.id}>
                    <button
                      type="button"
                      className={ex.id === exampleId ? 'active' : ''}
                      onClick={() => loadExample(ex.id)}
                    >
                      <span className="ex-title">{ex.title}</span>
                      <span className={`diff ${ex.difficulty}`}>{ex.difficulty}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h2>실습 문제</h2>
              <ul className="examples">
                {topicPractices.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className={p.id === practiceId ? 'active' : ''}
                      onClick={() => loadPractice(p.id)}
                    >
                      <span className="ex-title">{p.title}</span>
                      <span className={`diff ${p.difficulty}`}>{p.difficulty}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>

        <main className="main">
          {viewMode === 'example' && example ? (
            <section className="lesson">
              <div className="lesson-head">
                <h1>{example.title}</h1>
                <p>{example.summary}</p>
                <ul className="points">
                  {example.learningPoints.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {viewMode === 'practice' && practice ? (
            <PracticePanel
              problem={practice}
              grade={grade}
              showSolution={showSolution}
              onToggleSolution={() => setShowSolution((v) => !v)}
              onLoadSolution={() => {
                setCode(practice.solution)
                setGrade(null)
              }}
              onResetStarter={() => {
                setCode(practice.starterCode)
                setGrade(null)
              }}
              onGrade={handleGrade}
              busy={busy}
              pyReady={pyReady}
            />
          ) : null}

          <section className={`editors ${viewMode === 'practice' ? 'practice-editors' : ''}`}>
            {viewMode === 'example' ? (
              <BlocklyPane
                xml={blockXml}
                autoSync={settings.autoSyncBlocks}
                onCode={setCode}
              />
            ) : null}
            <PythonPane
              value={code}
              onChange={setCode}
              fontSize={settings.fontSize}
              tabSize={settings.editorTabSize}
              theme={settings.theme}
              highlightLine={highlightLine}
              readOnly={debugging && busy}
            />
          </section>

          <ConsoleDebugger
            stdout={stdout}
            stderr={stderr}
            frames={frames}
            frameIndex={frameIndex}
            debugging={debugging}
            onFrameIndex={onFrameIndex}
          />
        </main>
      </div>

      {settingsOpen ? (
        <div className="settings-drawer">
          <h3>설정</h3>
          <label>
            글자 크기
            <input
              type="range"
              min={12}
              max={22}
              value={settings.fontSize}
              onChange={(e) =>
                setSettings((s) => ({ ...s, fontSize: Number(e.target.value) }))
              }
            />
            <span>{settings.fontSize}px</span>
          </label>
          <label>
            탭 크기
            <input
              type="number"
              min={2}
              max={8}
              value={settings.editorTabSize}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  editorTabSize: Number(e.target.value),
                }))
              }
            />
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={settings.autoSyncBlocks}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  autoSyncBlocks: e.target.checked,
                }))
              }
            />
            블록 변경 시 파이썬 자동 동기화
          </label>
          <label>
            테마
            <select
              value={settings.theme}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  theme: e.target.value as 'light' | 'dark',
                }))
              }
            >
              <option value="light">라이트</option>
              <option value="dark">다크</option>
            </select>
          </label>
          <p className="muted small">
            실습 문제는 함수 반환값을 테스트 케이스로 자동 채점합니다. 파이썬은
            브라우저(Pyodide)에서 실행됩니다.
          </p>
          <button
            type="button"
            className="btn ghost"
            onClick={() => setSettingsOpen(false)}
          >
            닫기
          </button>
        </div>
      ) : null}
    </div>
  )
}
