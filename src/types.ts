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
