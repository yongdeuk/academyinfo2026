# 블록투파이썬 (Block2Python)

2022 개정 교육과정 **고등학교 정보** 실습 전 예습용 웹앱입니다.

- 블록 코딩(Blockly) ↔ 파이썬 나란히 비교
- 엔트리 스타일 실행 화면
- 브라우저에서 파이썬 실행 (Pyodide)
- 줄 단위 디버깅(트레이스 재생) + 변수 감시
- 주제: 변수, 연산자, 리스트, 선택, 반복, 함수
- 게임형 예시: 홀짝 판별, 가위바위보, 업앤다운, BMI 등
- **실습 문제 + 자동 채점** (함수 반환값 테스트)

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
- Blockly (엔트리 색상 테마 + zelos)
- Monaco Editor
- Pyodide (브라우저 Python / 자동채점)
