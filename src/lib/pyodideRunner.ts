import type { DebugFrame, RunResult } from '../types'

type PyodideInterface = {
  runPythonAsync: (code: string) => Promise<unknown>
  runPython: (code: string) => unknown
  setStdout: (opts: { batched: (s: string) => void }) => void
  setStderr: (opts: { batched: (s: string) => void }) => void
  globals: { get: (name: string) => unknown; set: (name: string, value: unknown) => void }
}

let pyodidePromise: Promise<PyodideInterface> | null = null

declare global {
  interface Window {
    loadPyodide: (opts: { indexURL: string }) => Promise<PyodideInterface>
  }
}

async function loadScript(src: string): Promise<void> {
  if (document.querySelector(`script[src="${src}"]`)) return
  await new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(s)
  })
}

export async function getPyodide(): Promise<PyodideInterface> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      const indexURL = 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/'
      await loadScript(`${indexURL}pyodide.js`)
      return window.loadPyodide({ indexURL })
    })()
  }
  return pyodidePromise
}

export async function runPython(code: string): Promise<RunResult> {
  const py = await getPyodide()
  let stdout = ''
  let stderr = ''
  py.setStdout({ batched: (s) => { stdout += s } })
  py.setStderr({ batched: (s) => { stderr += s } })

  try {
    await py.runPythonAsync(code)
    return { ok: true, stdout, stderr }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return { ok: false, stdout, stderr: stderr || msg }
  }
}

/** 줄 단위 트레이스를 수집한 뒤 스텝 재생 */
export async function debugPython(code: string): Promise<RunResult> {
  const py = await getPyodide()
  let stdout = ''
  let stderr = ''
  py.setStdout({ batched: (s) => { stdout += s } })
  py.setStderr({ batched: (s) => { stderr += s } })

  try {
    await py.runPythonAsync(`
import sys, json

_frames = []
_stdout_chunks = []

class _Capture:
    def write(self, s):
        if s:
            _stdout_chunks.append(s)
    def flush(self):
        pass

def _fmt(v):
    try:
        if isinstance(v, (int, float, bool, str, type(None))):
            return repr(v)
        if isinstance(v, (list, tuple, dict, set)):
            t = repr(v)
            return t if len(t) < 120 else t[:117] + "..."
        return type(v).__name__
    except Exception:
        return "?"

def _tracer(frame, event, arg):
    if event not in ("line", "call", "return", "exception"):
        return _tracer
    if frame.f_code.co_filename != "<user>":
        return _tracer
    locs = {}
    for k, v in list(frame.f_locals.items()):
        if str(k).startswith("_"):
            continue
        locs[str(k)] = _fmt(v)
    _frames.append({
        "line": int(frame.f_lineno),
        "event": event,
        "locals": locs,
        "stdout": "".join(_stdout_chunks),
    })
    return _tracer
`)
    py.globals.set('_user_src', code)
    await py.runPythonAsync(`
_real_stdout = sys.stdout
sys.stdout = _Capture()
sys.settrace(_tracer)
_err = None
try:
    code_obj = compile(_user_src, "<user>", "exec")
    exec(code_obj, {"__name__": "__main__"})
except Exception as e:
    _err = e
    _frames.append({
        "line": int(getattr(e, "lineno", 0) or 0),
        "event": "exception",
        "locals": {"error": repr(e)},
        "stdout": "".join(_stdout_chunks),
    })
finally:
    sys.settrace(None)
    sys.stdout = _real_stdout

_debug_json = json.dumps({"frames": _frames, "stdout": "".join(_stdout_chunks)}, ensure_ascii=False)
if _err is not None:
    raise _err
`)
    const raw = py.runPython('_debug_json') as string
    const parsed = JSON.parse(raw) as { frames: DebugFrame[]; stdout: string }
    return { ok: true, stdout: parsed.stdout, stderr: '', frames: parsed.frames }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    try {
      const raw = py.runPython('_debug_json') as string
      const parsed = JSON.parse(raw) as { frames: DebugFrame[]; stdout: string }
      return {
        ok: false,
        stdout: parsed.stdout || stdout,
        stderr: msg,
        frames: parsed.frames,
      }
    } catch {
      return { ok: false, stdout, stderr: stderr || msg, frames: [] }
    }
  }
}
