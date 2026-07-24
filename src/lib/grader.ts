import type { GradeCaseResult, GradeResult, PracticeProblem } from '../types'
import { getPyodide } from './pyodideRunner'

function normalizeStdout(s: string): string {
  return s.replace(/\r\n/g, '\n').replace(/\s+$/g, '')
}

/** 학생 코드를 Pyodide에서 실행하고 테스트 케이스로 자동 채점 */
export async function gradePractice(
  problem: PracticeProblem,
  studentCode: string,
): Promise<GradeResult> {
  const py = await getPyodide()
  const cases: GradeCaseResult[] = []

  try {
    if (problem.mode === 'function') {
      const fn = problem.functionName
      if (!fn) {
        return {
          ok: false,
          passed: 0,
          total: problem.tests.length,
          cases: [],
          compileError: '채점 함수 이름이 설정되지 않았습니다.',
        }
      }

      py.globals.set('_student_src', studentCode)
      py.globals.set('_fn_name', fn)

      try {
        await py.runPythonAsync(`
import json
_ns = {}
exec(_student_src, _ns)
if _fn_name not in _ns or not callable(_ns[_fn_name]):
    raise NameError(f"함수 {_fn_name}() 을(를) 정의해야 합니다.")
_grade_fn = _ns[_fn_name]
`)
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        return {
          ok: false,
          passed: 0,
          total: problem.tests.length,
          cases: [],
          compileError: msg,
        }
      }

      for (const t of problem.tests) {
        const argsJson = JSON.stringify(t.args ?? [])
        const expectedJson = JSON.stringify(t.expected)
        try {
          py.globals.set('_args_json', argsJson)
          const raw = py.runPython(`
import json
_args = json.loads(_args_json)
_got = _grade_fn(*_args)
json.dumps(_got, ensure_ascii=False)
`) as string
          const actual = JSON.parse(raw)
          const expected = JSON.parse(expectedJson)
          const passed = JSON.stringify(actual) === JSON.stringify(expected)
          cases.push({
            id: t.id,
            description: t.description,
            passed,
            expected: expectedJson,
            actual: raw,
          })
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e)
          cases.push({
            id: t.id,
            description: t.description,
            passed: false,
            expected: expectedJson,
            actual: '',
            error: msg,
          })
        }
      }
    } else {
      for (const t of problem.tests) {
        const inputs = t.inputs ?? []
        const expected = normalizeStdout(t.expectedStdout ?? '')
        let stdout = ''
        let stderr = ''
        py.setStdout({ batched: (s) => { stdout += s } })
        py.setStderr({ batched: (s) => { stderr += s } })

        try {
          py.globals.set('_grade_inputs', JSON.stringify(inputs))
          py.globals.set('_student_src', studentCode)
          await py.runPythonAsync(`
import builtins, json
_inputs = json.loads(_grade_inputs)
_input_i = 0
def _mock_input(prompt=''):
    global _input_i
    if _input_i >= len(_inputs):
        raise EOFError('입력값이 부족합니다')
    v = _inputs[_input_i]
    _input_i += 1
    return v
builtins.input = _mock_input
exec(_student_src, {})
`)
          const actual = normalizeStdout(stdout)
          cases.push({
            id: t.id,
            description: t.description,
            passed: actual === expected,
            expected,
            actual,
            error: stderr || undefined,
          })
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e)
          cases.push({
            id: t.id,
            description: t.description,
            passed: false,
            expected,
            actual: normalizeStdout(stdout),
            error: stderr || msg,
          })
        }
      }
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return {
      ok: false,
      passed: 0,
      total: problem.tests.length,
      cases: [],
      compileError: msg,
    }
  }

  const passed = cases.filter((c) => c.passed).length
  return {
    ok: passed === cases.length && cases.length > 0,
    passed,
    total: cases.length,
    cases,
  }
}
