import * as Blockly from 'blockly'
import { pythonGenerator } from 'blockly/python'
import type { WorkspaceSvg } from 'blockly'
import 'blockly/blocks'
import { ENTRY_COLORS, entryTheme } from './entryTheme'

export const TOOLBOX = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: '판단',
      categorystyle: 'logic_category',
      cssConfig: {
        container: 'blocklyToolboxCategory entry-cat entry-cat-judge',
      },
      contents: [
        { kind: 'block', type: 'logic_compare' },
        { kind: 'block', type: 'logic_operation' },
        { kind: 'block', type: 'logic_negate' },
        { kind: 'block', type: 'logic_boolean' },
      ],
    },
    {
      kind: 'category',
      name: '흐름',
      categorystyle: 'loop_category',
      cssConfig: {
        container: 'blocklyToolboxCategory entry-cat entry-cat-flow',
      },
      contents: [
        { kind: 'block', type: 'controls_if' },
        { kind: 'block', type: 'controls_repeat_ext' },
        { kind: 'block', type: 'controls_whileUntil' },
        { kind: 'block', type: 'controls_for' },
        { kind: 'block', type: 'controls_forEach' },
        { kind: 'block', type: 'controls_flow_statements' },
      ],
    },
    {
      kind: 'category',
      name: '계산',
      categorystyle: 'math_category',
      cssConfig: {
        container: 'blocklyToolboxCategory entry-cat entry-cat-calc',
      },
      contents: [
        { kind: 'block', type: 'math_number' },
        { kind: 'block', type: 'math_arithmetic' },
        { kind: 'block', type: 'math_modulo' },
        { kind: 'block', type: 'math_single' },
        { kind: 'block', type: 'math_number_property' },
      ],
    },
    {
      kind: 'category',
      name: '문자열',
      categorystyle: 'text_category',
      cssConfig: {
        container: 'blocklyToolboxCategory entry-cat entry-cat-text',
      },
      contents: [
        { kind: 'block', type: 'text' },
        { kind: 'block', type: 'text_print' },
        { kind: 'block', type: 'text_join' },
        { kind: 'block', type: 'text_length' },
      ],
    },
    {
      kind: 'category',
      name: '리스트',
      categorystyle: 'list_category',
      cssConfig: {
        container: 'blocklyToolboxCategory entry-cat entry-cat-list',
      },
      contents: [
        { kind: 'block', type: 'lists_create_with' },
        { kind: 'block', type: 'lists_repeat' },
        { kind: 'block', type: 'lists_length' },
        { kind: 'block', type: 'lists_isEmpty' },
        { kind: 'block', type: 'lists_indexOf' },
        { kind: 'block', type: 'lists_getIndex' },
        { kind: 'block', type: 'lists_setIndex' },
      ],
    },
    {
      kind: 'category',
      name: '자료',
      categorystyle: 'variable_category',
      cssConfig: {
        container: 'blocklyToolboxCategory entry-cat entry-cat-variable',
      },
      custom: 'VARIABLE',
    },
    {
      kind: 'category',
      name: '함수',
      categorystyle: 'procedure_category',
      cssConfig: {
        container: 'blocklyToolboxCategory entry-cat entry-cat-func',
      },
      custom: 'PROCEDURE',
    },
  ],
} as const

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

export function createWorkspace(container: HTMLElement): WorkspaceSvg {
  return Blockly.inject(container, {
    toolbox: TOOLBOX as unknown as Blockly.utils.toolbox.ToolboxDefinition,
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
