export type TopicId =
  | 'variables'
  | 'operators'
  | 'lists'
  | 'selection'
  | 'loops'
  | 'functions'

export interface Topic {
  id: TopicId
  label: string
  short: string
  description: string
  /** 학생용 학습 순서 안내 */
  howto?: string[]
}

export interface Example {
  id: string
  topicId: TopicId
  title: string
  summary: string
  learningPoints: string[]
  python: string
  blocklyXml: string
  difficulty: '기초' | '응용' | '심화'
}

export interface DebugFrame {
  line: number
  event: string
  locals: Record<string, string>
  stdout: string
}

export interface RunResult {
  ok: boolean
  stdout: string
  stderr: string
  frames?: DebugFrame[]
}

export interface AppSettings {
  fontSize: number
  autoSyncBlocks: boolean
  showLineNumbers: boolean
  debugCaptureStdout: boolean
  theme: 'light' | 'dark'
  editorTabSize: number
}

export type PracticeMode = 'function' | 'stdout'

export interface PracticeTestCase {
  id: string
  description: string
  /** function 모드: 함수 인자 */
  args?: unknown[]
  /** function 모드: 기대 반환값 */
  expected?: unknown
  /** stdout 모드: input()에 넣을 줄들 */
  inputs?: string[]
  /** stdout 모드: 기대 출력(개행 정규화 후 비교) */
  expectedStdout?: string
}

export interface PracticeProblem {
  id: string
  topicId: TopicId
  title: string
  description: string
  difficulty: '기초' | '응용' | '심화'
  mode: PracticeMode
  /** function 모드에서 채점할 함수 이름 */
  functionName?: string
  starterCode: string
  solution: string
  tests: PracticeTestCase[]
  tips?: string[]
  relatedExampleId?: string
  tags?: string[]
}

export interface GradeCaseResult {
  id: string
  description: string
  passed: boolean
  expected: string
  actual: string
  error?: string
}

export interface GradeResult {
  ok: boolean
  passed: number
  total: number
  cases: GradeCaseResult[]
  compileError?: string
}
