import type { Topic } from '../types'

export const TOPICS: Topic[] = [
  {
    id: 'variables',
    label: '변수와 자료형',
    short: '변수',
    description:
      '값을 이름에 담아 두고 재사용하는 방법을 익힙니다. 정수·실수·문자열·논리값을 다룹니다.',
  },
  {
    id: 'operators',
    label: '연산자',
    short: '연산',
    description:
      '산술·비교·논리 연산자로 계산하고 조건을 만듭니다. 우선순위와 형 변환도 함께 봅니다.',
  },
  {
    id: 'lists',
    label: '리스트',
    short: '리스트',
    description:
      '여러 값을 순서대로 저장하고 인덱스로 접근·수정·순회하는 방법을 익힙니다.',
  },
  {
    id: 'selection',
    label: '선택 구조',
    short: '선택',
    description:
      'if / elif / else로 조건에 따라 다른 명령을 실행하는 분기 구조를 학습합니다.',
  },
  {
    id: 'loops',
    label: '반복 구조',
    short: '반복',
    description:
      'for·while로 같은 작업을 반복하고, range·continue로 흐름을 제어합니다.',
  },
  {
    id: 'functions',
    label: '함수',
    short: '함수',
    description:
      '기능을 묶고 매개변수·반환값으로 재사용 가능한 코드를 만듭니다.',
  },
]
