# block2python

2022 개정 교육과정 **고등학교 정보** 실습 전 예습용 웹앱입니다.

- 블록 코딩(Blockly) ↔ 파이썬 나란히 비교
- 브라우저에서 파이썬 실행 (Pyodide)
- 줄 단위 디버깅(트레이스 재생) + 변수 감시
- 주제: 변수, 연산자, 리스트, 선택, 반복, 함수

## 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
npm run preview
```

## 기술

- Vite + React + TypeScript
- Blockly (블록 → Python 생성)
- Monaco Editor
- Pyodide (브라우저 Python)
