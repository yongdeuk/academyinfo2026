import { useCallback, useEffect, useMemo, useState } from 'react'
import { TOPICS } from './data/topics'
import { EXAMPLES, examplesByTopic } from './data/examples'
import { BlocklyPane } from './components/BlocklyPane'
import { PythonPane } from './components/PythonPane'
import { ConsoleDebugger } from './components/ConsoleDebugger'
import { debugPython, getPyodide, runPython } from './lib/pyodideRunner'
import type { AppSettings, DebugFrame, TopicId } from './types'
import './styles.css'

const DEFAULT_SETTINGS: AppSettings = {
  fontSize: 15,
  autoSyncBlocks: true,
  showLineNumbers: true,
  debugCaptureStdout: true,
  theme: 'light',
  editorTabSize: 4,
}

export default function App() {
  const [topicId, setTopicId] = useState<TopicId>('variables')
  const [exampleId, setExampleId] = useState(EXAMPLES[0].id)
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
  const example = EXAMPLES.find((e) => e.id === exampleId) ?? topicExamples[0]

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

  const loadExample = useCallback((id: string) => {
    const ex = EXAMPLES.find((e) => e.id === id)
    if (!ex) return
    setExampleId(ex.id)
    setTopicId(ex.topicId)
    setCode(ex.python)
    setBlockXml(ex.blocklyXml)
    setStdout('')
    setStderr('')
    setFrames([])
    setFrameIndex(0)
    setDebugging(false)
  }, [])

  const onTopic = (id: TopicId) => {
    setTopicId(id)
    const list = examplesByTopic(id)
    if (list[0]) loadExample(list[0].id)
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
          <span>중·고 정보 연계 · 블록↔파이썬 · 실행·디버깅</span>
        </div>
        <div className="actions">
          <button
            type="button"
            className="btn primary"
            disabled={busy || !pyReady}
            onClick={handleRun}
          >
            {busy ? '실행 중…' : pyReady ? '▶ 실행' : '엔진 로딩…'}
          </button>
          <button
            type="button"
            className="btn"
            disabled={busy || !pyReady}
            onClick={handleDebug}
          >
            🐞 디버그
          </button>
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
        </aside>

        <main className="main">
          {example ? (
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

          <section className="editors">
            <BlocklyPane
              xml={blockXml}
              autoSync={settings.autoSyncBlocks}
              onCode={setCode}
            />
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
            파이썬은 브라우저(Pyodide)에서 실행됩니다. 디버그는 줄 단위 트레이스를
            수집한 뒤 스텝으로 재생합니다.
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
