import * as Blockly from 'blockly'
import { pythonGenerator } from 'blockly/python'
import type { WorkspaceSvg } from 'blockly'
import 'blockly/blocks'
import { ENTRY_COLORS, entryTheme } from './entryTheme'
import type { TopicId } from '../types'

type ToolboxJson = Blockly.utils.toolbox.ToolboxDefinition

const cat = (
  name: string,
  style: string,
  css: string,
  contents: object[],
) => ({
  kind: 'category',
  name,
  categorystyle: style,
  cssConfig: { container: `blocklyToolboxCategory entry-cat ${css}` },
  contents,
})

const varCat = {
  kind: 'category',
  name: '변수',
  categorystyle: 'variable_category',
  cssConfig: {
    container: 'blocklyToolboxCategory entry-cat entry-cat-variable',
  },
  custom: 'VARIABLE',
}

const funcCat = {
  kind: 'category',
  name: '함수',
  categorystyle: 'procedure_category',
  cssConfig: {
    container: 'blocklyToolboxCategory entry-cat entry-cat-func',
  },
  custom: 'PROCEDURE',
}

const valueBlocks = [
  { kind: 'block', type: 'math_number' },
  { kind: 'block', type: 'text' },
  { kind: 'block', type: 'logic_boolean' },
]

const printBlock = { kind: 'block', type: 'text_print' }

/** 주제별 최소 툴박스 — 학습에 필요한 블록만 */
export function getToolboxForTopic(topicId: TopicId): ToolboxJson {
  switch (topicId) {
    case 'variables':
      return {
        kind: 'categoryToolbox',
        contents: [
          varCat,
          cat('값', 'math_category', 'entry-cat-calc', valueBlocks),
          cat('출력', 'text_category', 'entry-cat-text', [printBlock]),
        ],
      }

    case 'operators':
      return {
        kind: 'categoryToolbox',
        contents: [
          varCat,
          cat('계산', 'math_category', 'entry-cat-calc', [
            { kind: 'block', type: 'math_number' },
            { kind: 'block', type: 'math_arithmetic' },
            { kind: 'block', type: 'math_modulo' },
            { kind: 'block', type: 'math_single' },
          ]),
          cat('비교', 'logic_category', 'entry-cat-judge', [
            { kind: 'block', type: 'logic_compare' },
            { kind: 'block', type: 'logic_operation' },
            { kind: 'block', type: 'logic_negate' },
            { kind: 'block', type: 'logic_boolean' },
          ]),
          cat('출력', 'text_category', 'entry-cat-text', [
            { kind: 'block', type: 'text' },
            printBlock,
          ]),
        ],
      }

    case 'lists':
      return {
        kind: 'categoryToolbox',
        contents: [
          varCat,
          cat('리스트', 'list_category', 'entry-cat-list', [
            { kind: 'block', type: 'lists_create_with' },
            { kind: 'block', type: 'lists_repeat' },
            { kind: 'block', type: 'lists_length' },
            { kind: 'block', type: 'lists_isEmpty' },
            { kind: 'block', type: 'lists_getIndex' },
            { kind: 'block', type: 'lists_setIndex' },
          ]),
          cat('값', 'math_category', 'entry-cat-calc', [
            { kind: 'block', type: 'math_number' },
            { kind: 'block', type: 'text' },
          ]),
          cat('출력', 'text_category', 'entry-cat-text', [printBlock]),
        ],
      }

    case 'selection':
      return {
        kind: 'categoryToolbox',
        contents: [
          varCat,
          cat('선택', 'loop_category', 'entry-cat-flow', [
            { kind: 'block', type: 'controls_if' },
          ]),
          cat('판단', 'logic_category', 'entry-cat-judge', [
            { kind: 'block', type: 'logic_compare' },
            { kind: 'block', type: 'logic_operation' },
            { kind: 'block', type: 'logic_negate' },
            { kind: 'block', type: 'logic_boolean' },
            { kind: 'block', type: 'math_number_property' },
          ]),
          cat('계산', 'math_category', 'entry-cat-calc', [
            { kind: 'block', type: 'math_number' },
            { kind: 'block', type: 'math_arithmetic' },
            { kind: 'block', type: 'math_modulo' },
          ]),
          cat('출력', 'text_category', 'entry-cat-text', [
            { kind: 'block', type: 'text' },
            printBlock,
          ]),
        ],
      }

    case 'loops':
      return {
        kind: 'categoryToolbox',
        contents: [
          varCat,
          cat('반복', 'loop_category', 'entry-cat-flow', [
            { kind: 'block', type: 'controls_repeat_ext' },
            { kind: 'block', type: 'controls_whileUntil' },
            { kind: 'block', type: 'controls_for' },
            { kind: 'block', type: 'controls_forEach' },
            { kind: 'block', type: 'controls_flow_statements' },
          ]),
          cat('선택', 'loop_category', 'entry-cat-flow', [
            { kind: 'block', type: 'controls_if' },
          ]),
          cat('판단', 'logic_category', 'entry-cat-judge', [
            { kind: 'block', type: 'logic_compare' },
            { kind: 'block', type: 'logic_boolean' },
            { kind: 'block', type: 'math_number_property' },
          ]),
          cat('계산', 'math_category', 'entry-cat-calc', [
            { kind: 'block', type: 'math_number' },
            { kind: 'block', type: 'math_arithmetic' },
            { kind: 'block', type: 'math_modulo' },
          ]),
          cat('리스트', 'list_category', 'entry-cat-list', [
            { kind: 'block', type: 'lists_create_with' },
          ]),
          cat('출력', 'text_category', 'entry-cat-text', [
            { kind: 'block', type: 'text' },
            printBlock,
          ]),
        ],
      }

    case 'functions':
      return {
        kind: 'categoryToolbox',
        contents: [
          funcCat,
          varCat,
          cat('선택', 'loop_category', 'entry-cat-flow', [
            { kind: 'block', type: 'controls_if' },
          ]),
          cat('판단', 'logic_category', 'entry-cat-judge', [
            { kind: 'block', type: 'logic_compare' },
            { kind: 'block', type: 'logic_boolean' },
            { kind: 'block', type: 'math_number_property' },
          ]),
          cat('계산', 'math_category', 'entry-cat-calc', [
            { kind: 'block', type: 'math_number' },
            { kind: 'block', type: 'math_arithmetic' },
            { kind: 'block', type: 'math_modulo' },
          ]),
          cat('리스트', 'list_category', 'entry-cat-list', [
            { kind: 'block', type: 'lists_create_with' },
          ]),
          cat('출력', 'text_category', 'entry-cat-text', [
            { kind: 'block', type: 'text' },
            printBlock,
            { kind: 'block', type: 'text_join' },
          ]),
        ],
      }
  }
}

/** 엔트리처럼 if/분기 블록을 흐름(FLOW) 색으로 */
function applyEntryBlockStyles(): void {
  for (const type of ['controls_if', 'controls_ifelse']) {
    const block = Blockly.Blocks[type]
    if (!block) continue
    const original = block.init
    block.init = function (this: Blockly.Block) {
      original.call(this)
      this.setStyle('loop_blocks')
    }
  }
}

applyEntryBlockStyles()

export function createWorkspace(
  container: HTMLElement,
  topicId: TopicId = 'variables',
): WorkspaceSvg {
  return Blockly.inject(container, {
    toolbox: getToolboxForTopic(topicId),
    theme: entryTheme,
    renderer: 'zelos',
    grid: {
      spacing: 25,
      length: 2,
      colour: ENTRY_COLORS.FLOW.secondary,
      snap: true,
    },
    zoom: { controls: true, wheel: true, startScale: 0.85 },
    trashcan: true,
    move: { scrollbars: true, drag: true, wheel: true },
  })
}

export function updateToolbox(workspace: WorkspaceSvg, topicId: TopicId): void {
  workspace.updateToolbox(getToolboxForTopic(topicId))
}

export function workspaceToPython(workspace: WorkspaceSvg): string {
  const code = pythonGenerator.workspaceToCode(workspace)
  return code.trim() ? code : '# 블록을 조립하면 파이썬 코드가 생성됩니다.\n'
}

export function loadXml(workspace: WorkspaceSvg, xmlText: string): void {
  workspace.clear()
  const xml = Blockly.utils.xml.textToDom(xmlText)
  Blockly.Xml.domToWorkspace(xml, workspace)
}

export function clearWorkspace(workspace: WorkspaceSvg): void {
  workspace.clear()
}
