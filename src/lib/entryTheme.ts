import * as Blockly from 'blockly'

/**
 * 엔트리(Entry) 공식 블록 색상
 * @see https://github.com/entrylabs/entryjs/blob/master/extern/util/static.js
 */
export const ENTRY_COLORS = {
  START: { primary: '#00b400', secondary: '#3bce3b', tertiary: '#009400' },
  FLOW: { primary: '#19baea', secondary: '#6dddfe', tertiary: '#1498c0' },
  MOVING: { primary: '#ad3efb', secondary: '#bd65fb', tertiary: '#8b19db' },
  LOOKS: { primary: '#ff3a61', secondary: '#ff5577', tertiary: '#c72042' },
  BRUSH: { primary: '#ff9b00', secondary: '#ffb250', tertiary: '#fc6500' },
  TEXT: { primary: '#e43500', secondary: '#ff6739', tertiary: '#ad2800' },
  SOUND: { primary: '#67b100', secondary: '#7ecc12', tertiary: '#508a00' },
  JUDGE: { primary: '#4562f5', secondary: '#99adff', tertiary: '#1b3ad8' },
  CALC: { primary: '#f4af18', secondary: '#ffde82', tertiary: '#ff7f00' },
  VARIABLE: { primary: '#dd47d8', secondary: '#f778f3', tertiary: '#b819b3' },
  FUNC: { primary: '#de5c04', secondary: '#ff7b22', tertiary: '#a14100' },
  ANALYSIS: { primary: '#25aeff', secondary: '#d6e9f4', tertiary: '#1592ff' },
} as const

function style(c: { primary: string; secondary: string; tertiary: string }) {
  return {
    colourPrimary: c.primary,
    colourSecondary: c.secondary,
    colourTertiary: c.tertiary,
  }
}

/** 엔트리 스타일 Blockly 테마 (zelos 렌더러와 함께 사용) */
export const entryTheme = Blockly.Theme.defineTheme('entry', {
  name: 'entry',
  base: Blockly.Themes.Zelos,
  blockStyles: {
    logic_blocks: style(ENTRY_COLORS.JUDGE),
    loop_blocks: style(ENTRY_COLORS.FLOW),
    math_blocks: style(ENTRY_COLORS.CALC),
    text_blocks: style(ENTRY_COLORS.TEXT),
    list_blocks: style(ENTRY_COLORS.VARIABLE),
    variable_blocks: style(ENTRY_COLORS.VARIABLE),
    variable_dynamic_blocks: style(ENTRY_COLORS.VARIABLE),
    procedure_blocks: style(ENTRY_COLORS.FUNC),
    hat_blocks: style(ENTRY_COLORS.START),
  },
  categoryStyles: {
    logic_category: { colour: ENTRY_COLORS.JUDGE.primary },
    loop_category: { colour: ENTRY_COLORS.FLOW.primary },
    math_category: { colour: ENTRY_COLORS.CALC.primary },
    text_category: { colour: ENTRY_COLORS.TEXT.primary },
    list_category: { colour: ENTRY_COLORS.VARIABLE.primary },
    variable_category: { colour: ENTRY_COLORS.VARIABLE.primary },
    procedure_category: { colour: ENTRY_COLORS.FUNC.primary },
  },
  componentStyles: {
    workspaceBackgroundColour: '#e2f0f8',
    toolboxBackgroundColour: '#ffffff',
    toolboxForegroundColour: '#2c313d',
    flyoutBackgroundColour: '#f4f9fc',
    flyoutForegroundColour: '#2c313d',
    flyoutOpacity: 1,
    scrollbarColour: '#a8c4d6',
    scrollbarOpacity: 0.55,
    insertionMarkerColour: '#19baea',
    insertionMarkerOpacity: 0.45,
    markerColour: '#00b400',
    cursorColour: '#de5c04',
  },
  fontStyle: {
    family: "'Nanum Gothic', 'Malgun Gothic', Dotum, sans-serif",
    weight: 'bold',
    size: 12,
  },
  startHats: true,
})
