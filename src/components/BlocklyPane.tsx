import { useEffect, useRef } from 'react'
import type { WorkspaceSvg } from 'blockly'
import * as Blockly from 'blockly'
import {
  createWorkspace,
  loadXml,
  workspaceToPython,
} from '../lib/blocklySetup'

interface Props {
  xml?: string
  onCode: (code: string) => void
  autoSync: boolean
  onRun?: () => void
  pyReady?: boolean
  busy?: boolean
}

export function BlocklyPane({ xml, onCode, autoSync, onRun, pyReady, busy }: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const workspaceRef = useRef<WorkspaceSvg | null>(null)
  const onCodeRef = useRef(onCode)
  const autoSyncRef = useRef(autoSync)

  useEffect(() => {
    onCodeRef.current = onCode
  }, [onCode])

  useEffect(() => {
    autoSyncRef.current = autoSync
  }, [autoSync])

  useEffect(() => {
    if (!hostRef.current) return
    const ws = createWorkspace(hostRef.current)
    workspaceRef.current = ws

    const sync = () => {
      if (autoSyncRef.current) onCodeRef.current(workspaceToPython(ws))
    }
    ws.addChangeListener(sync)

    const ro = new ResizeObserver(() => {
      Blockly.svgResize(ws)
    })
    ro.observe(hostRef.current)

    return () => {
      ro.disconnect()
      ws.dispose()
      workspaceRef.current = null
    }
  }, [])

  useEffect(() => {
    const ws = workspaceRef.current
    if (!ws || !xml) return
    try {
      loadXml(ws, xml)
      if (autoSyncRef.current) onCodeRef.current(workspaceToPython(ws))
      Blockly.svgResize(ws)
    } catch (e) {
      console.warn('Blockly XML load failed', e)
    }
  }, [xml])

  return (
    <div className="pane blockly-pane">
      <div className="pane-header">
        <span>블록 코딩</span>
        <div className="pane-actions">
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              const ws = workspaceRef.current
              if (ws) onCode(workspaceToPython(ws))
            }}
          >
            블록 → 파이썬
          </button>
          <button
            type="button"
            className="btn primary"
            disabled={!onRun || busy || !pyReady}
            onClick={onRun}
          >
            {busy ? '실행 중…' : '블록 실행'}
          </button>
        </div>
      </div>
      <div className="blockly-host" ref={hostRef} />
    </div>
  )
}
