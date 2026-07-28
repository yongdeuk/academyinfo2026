import { useEffect, useRef } from 'react'
import type { WorkspaceSvg } from 'blockly'
import * as Blockly from 'blockly'
import {
  createWorkspace,
  loadXml,
  updateToolbox,
  workspaceToPython,
} from '../lib/blocklySetup'
import type { TopicId } from '../types'

interface Props {
  xml?: string
  topicId: TopicId
  onCode: (code: string) => void
  /** 파이썬 편집기로 복사 */
  onCopyToPython?: (code: string) => void
  autoSync: boolean
}

export function BlocklyPane({
  xml,
  topicId,
  onCode,
  onCopyToPython,
  autoSync,
}: Props) {
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
    const ws = createWorkspace(hostRef.current, topicId)
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
    if (!ws) return
    updateToolbox(ws, topicId)
  }, [topicId])

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
              if (!ws) return
              const py = workspaceToPython(ws)
              onCode(py)
              onCopyToPython?.(py)
            }}
          >
            블록 → 파이썬
          </button>
        </div>
      </div>
      <div className="blockly-host" ref={hostRef} />
    </div>
  )
}
