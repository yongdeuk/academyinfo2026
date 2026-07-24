import type { PracticeProblem, TopicId } from '../types'

export const PRACTICES: PracticeProblem[] = [
  // ── 변수 ──
  {
    id: 'prac-var-greeting',
    topicId: 'variables',
    title: '인사말 만들기',
    description:
      '이름(name)을 받아 "안녕, {이름}!" 형식의 문자열을 반환하는 함수 greeting(name)을 작성하세요.',
    difficulty: '기초',
    mode: 'function',
    functionName: 'greeting',
    starterCode: `def greeting(name):
    # 여기에 코드를 작성하세요
    pass
`,
    solution: `def greeting(name):
    return "안녕, " + name + "!"
`,
    tests: [
      { id: 't1', description: 'greeting("보문")', args: ['보문'], expected: '안녕, 보문!' },
      { id: 't2', description: 'greeting("정보")', args: ['정보'], expected: '안녕, 정보!' },
      { id: 't3', description: 'greeting("AI")', args: ['AI'], expected: '안녕, AI!' },
    ],
    tips: ['문자열은 + 로 이어 붙일 수 있습니다.', 'f-string: f"안녕, {name}!"'],
    tags: ['변수', '문자열'],
  },
  {
    id: 'prac-var-scoreboard',
    topicId: 'variables',
    title: '점수판 합계',
    description:
      '세 과목 점수 a, b, c를 받아 합계를 반환하는 total_score(a, b, c)를 작성하세요.',
    difficulty: '기초',
    mode: 'function',
    functionName: 'total_score',
    starterCode: `def total_score(a, b, c):
    # 세 점수의 합을 반환
    pass
`,
    solution: `def total_score(a, b, c):
    return a + b + c
`,
    tests: [
      { id: 't1', description: '80, 90, 70', args: [80, 90, 70], expected: 240 },
      { id: 't2', description: '100, 100, 100', args: [100, 100, 100], expected: 300 },
      { id: 't3', description: '0, 50, 25', args: [0, 50, 25], expected: 75 },
    ],
    tags: ['변수', '합계'],
  },

  // ── 연산자 ──
  {
    id: 'prac-op-bmi',
    topicId: 'operators',
    title: 'BMI 계산',
    description:
      '체중(kg), 키(m)를 받아 BMI = 체중 / (키*키) 를 계산해 소수 첫째 자리까지 반올림한 값을 반환하는 bmi(weight, height)를 작성하세요. (round 사용)',
    difficulty: '응용',
    mode: 'function',
    functionName: 'bmi',
    starterCode: `def bmi(weight, height):
    # BMI를 계산해 round(..., 1)로 반환
    pass
`,
    solution: `def bmi(weight, height):
    return round(weight / (height * height), 1)
`,
    tests: [
      { id: 't1', description: '70kg, 1.75m', args: [70, 1.75], expected: 22.9 },
      { id: 't2', description: '60kg, 1.7m', args: [60, 1.7], expected: 20.8 },
      { id: 't3', description: '80kg, 1.8m', args: [80, 1.8], expected: 24.7 },
    ],
    tips: ['거듭제곱은 height ** 2 도 가능합니다.'],
    tags: ['연산', 'BMI'],
  },
  {
    id: 'prac-op-change',
    topicId: 'operators',
    title: '거스름돈 계산',
    description:
      '받은 금액 paid와 물건 가격 price를 받아 거스름돈을 반환하는 change(paid, price)를 작성하세요. (paid >= price 가정)',
    difficulty: '기초',
    mode: 'function',
    functionName: 'change',
    starterCode: `def change(paid, price):
    pass
`,
    solution: `def change(paid, price):
    return paid - price
`,
    tests: [
      { id: 't1', description: '10000 - 7500', args: [10000, 7500], expected: 2500 },
      { id: 't2', description: '5000 - 5000', args: [5000, 5000], expected: 0 },
      { id: 't3', description: '3000 - 1200', args: [3000, 1200], expected: 1800 },
    ],
    tags: ['연산', '뺄셈'],
  },

  // ── 리스트 ──
  {
    id: 'prac-list-avg',
    topicId: 'lists',
    title: '점수 평균',
    description:
      '점수 리스트 scores를 받아 평균을 반환하는 average(scores)를 작성하세요. 빈 리스트면 0을 반환합니다.',
    difficulty: '기초',
    mode: 'function',
    functionName: 'average',
    starterCode: `def average(scores):
    # 빈 리스트면 0
    pass
`,
    solution: `def average(scores):
    if len(scores) == 0:
        return 0
    return sum(scores) / len(scores)
`,
    tests: [
      { id: 't1', description: '[80, 90, 100]', args: [[80, 90, 100]], expected: 90 },
      { id: 't2', description: '[50]', args: [[50]], expected: 50 },
      { id: 't3', description: '[]', args: [[]], expected: 0 },
    ],
    tips: ['sum(리스트), len(리스트)를 활용하세요.'],
    tags: ['리스트', '평균'],
  },
  {
    id: 'prac-list-max',
    topicId: 'lists',
    title: '최고 점수 찾기',
    description: '점수 리스트에서 가장 큰 값을 반환하는 best_score(scores)를 작성하세요. (비어 있지 않음)',
    difficulty: '기초',
    mode: 'function',
    functionName: 'best_score',
    starterCode: `def best_score(scores):
    pass
`,
    solution: `def best_score(scores):
    return max(scores)
`,
    tests: [
      { id: 't1', description: '[70, 95, 88]', args: [[70, 95, 88]], expected: 95 },
      { id: 't2', description: '[10, 10, 10]', args: [[10, 10, 10]], expected: 10 },
      { id: 't3', description: '[1, 2, 3, 100]', args: [[1, 2, 3, 100]], expected: 100 },
    ],
    tags: ['리스트', '최댓값'],
  },

  // ── 선택: 홀짝, 가위바위보 ──
  {
    id: 'prac-sel-oddeven',
    topicId: 'selection',
    title: '홀수·짝수 판별',
    description:
      '정수 n을 받아 짝수이면 "짝수", 홀수이면 "홀수"를 반환하는 odd_even(n)을 작성하세요.',
    difficulty: '기초',
    mode: 'function',
    functionName: 'odd_even',
    starterCode: `def odd_even(n):
    # n % 2 를 이용하세요
    pass
`,
    solution: `def odd_even(n):
    if n % 2 == 0:
        return "짝수"
    else:
        return "홀수"
`,
    tests: [
      { id: 't1', description: 'odd_even(4)', args: [4], expected: '짝수' },
      { id: 't2', description: 'odd_even(7)', args: [7], expected: '홀수' },
      { id: 't3', description: 'odd_even(0)', args: [0], expected: '짝수' },
      { id: 't4', description: 'odd_even(-3)', args: [-3], expected: '홀수' },
    ],
    tips: ['나머지 연산자 %', '짝수: n % 2 == 0'],
    relatedExampleId: 'sel-oddeven',
    tags: ['선택', '홀짝'],
  },
  {
    id: 'prac-sel-rps',
    topicId: 'selection',
    title: '가위바위보 승패',
    description:
      '플레이어 a와 상대 b의 선택("가위"|"바위"|"보")을 받아 결과를 반환하는 rps(a, b)를 작성하세요.\n- 같으면 "무승부"\n- a가 이기면 "승리"\n- a가 지면 "패배"',
    difficulty: '응용',
    mode: 'function',
    functionName: 'rps',
    starterCode: `def rps(a, b):
    # 가위 > 보, 바위 > 가위, 보 > 바위
    pass
`,
    solution: `def rps(a, b):
    if a == b:
        return "무승부"
    if (a == "가위" and b == "보") or (a == "바위" and b == "가위") or (a == "보" and b == "바위"):
        return "승리"
    return "패배"
`,
    tests: [
      { id: 't1', description: '가위 vs 보', args: ['가위', '보'], expected: '승리' },
      { id: 't2', description: '바위 vs 보', args: ['바위', '보'], expected: '패배' },
      { id: 't3', description: '보 vs 보', args: ['보', '보'], expected: '무승부' },
      { id: 't4', description: '바위 vs 가위', args: ['바위', '가위'], expected: '승리' },
      { id: 't5', description: '가위 vs 바위', args: ['가위', '바위'], expected: '패배' },
    ],
    relatedExampleId: 'sel-rps',
    tags: ['선택', '가위바위보'],
  },
  {
    id: 'prac-sel-grade',
    topicId: 'selection',
    title: '학점 판정',
    description:
      '점수(0~100)를 받아 학점을 반환하는 letter_grade(score)를 작성하세요.\n90이상 A, 80이상 B, 70이상 C, 60이상 D, 그 외 F',
    difficulty: '기초',
    mode: 'function',
    functionName: 'letter_grade',
    starterCode: `def letter_grade(score):
    pass
`,
    solution: `def letter_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"
`,
    tests: [
      { id: 't1', description: '95 → A', args: [95], expected: 'A' },
      { id: 't2', description: '80 → B', args: [80], expected: 'B' },
      { id: 't3', description: '70 → C', args: [70], expected: 'C' },
      { id: 't4', description: '60 → D', args: [60], expected: 'D' },
      { id: 't5', description: '59 → F', args: [59], expected: 'F' },
    ],
    tags: ['선택', '학점'],
  },

  // ── 반복: 업앤다운 등 ──
  {
    id: 'prac-loop-updown',
    topicId: 'loops',
    title: '업앤다운 힌트',
    description:
      '비밀 숫자 secret과 추측 guess를 비교해 힌트를 반환하는 updown(secret, guess)를 작성하세요.\n- guess < secret → "업"\n- guess > secret → "다운"\n- 같으면 "정답"',
    difficulty: '기초',
    mode: 'function',
    functionName: 'updown',
    starterCode: `def updown(secret, guess):
    pass
`,
    solution: `def updown(secret, guess):
    if guess < secret:
        return "업"
    elif guess > secret:
        return "다운"
    else:
        return "정답"
`,
    tests: [
      { id: 't1', description: 'secret=50, guess=30', args: [50, 30], expected: '업' },
      { id: 't2', description: 'secret=50, guess=80', args: [50, 80], expected: '다운' },
      { id: 't3', description: 'secret=50, guess=50', args: [50, 50], expected: '정답' },
    ],
    relatedExampleId: 'loop-updown',
    tags: ['반복', '업앤다운'],
  },
  {
    id: 'prac-loop-sum',
    topicId: 'loops',
    title: '1부터 n까지 합',
    description: '양의 정수 n에 대해 1+2+...+n 합을 반환하는 sum_to(n)을 작성하세요.',
    difficulty: '기초',
    mode: 'function',
    functionName: 'sum_to',
    starterCode: `def sum_to(n):
    # for 또는 while 사용
    pass
`,
    solution: `def sum_to(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total
`,
    tests: [
      { id: 't1', description: 'sum_to(10)', args: [10], expected: 55 },
      { id: 't2', description: 'sum_to(1)', args: [1], expected: 1 },
      { id: 't3', description: 'sum_to(100)', args: [100], expected: 5050 },
    ],
    tips: ['range(1, n+1)'],
    tags: ['반복', '합'],
  },
  {
    id: 'prac-loop-count-even',
    topicId: 'loops',
    title: '짝수 개수 세기',
    description: '정수 리스트에서 짝수 개수를 반환하는 count_even(nums)를 작성하세요.',
    difficulty: '응용',
    mode: 'function',
    functionName: 'count_even',
    starterCode: `def count_even(nums):
    pass
`,
    solution: `def count_even(nums):
    count = 0
    for n in nums:
        if n % 2 == 0:
            count += 1
    return count
`,
    tests: [
      { id: 't1', description: '[1,2,3,4,5]', args: [[1, 2, 3, 4, 5]], expected: 2 },
      { id: 't2', description: '[2,4,6]', args: [[2, 4, 6]], expected: 3 },
      { id: 't3', description: '[1,3,5]', args: [[1, 3, 5]], expected: 0 },
    ],
    tags: ['반복', '홀짝'],
  },

  // ── 함수 ──
  {
    id: 'prac-fn-absdiff',
    topicId: 'functions',
    title: '절댓값 차이',
    description: '두 수 a, b의 차의 절댓값을 반환하는 abs_diff(a, b)를 작성하세요.',
    difficulty: '기초',
    mode: 'function',
    functionName: 'abs_diff',
    starterCode: `def abs_diff(a, b):
    pass
`,
    solution: `def abs_diff(a, b):
    d = a - b
    if d < 0:
        return -d
    return d
`,
    tests: [
      { id: 't1', description: 'abs_diff(10, 3)', args: [10, 3], expected: 7 },
      { id: 't2', description: 'abs_diff(3, 10)', args: [3, 10], expected: 7 },
      { id: 't3', description: 'abs_diff(5, 5)', args: [5, 5], expected: 0 },
    ],
    tips: ['abs(a - b)도 가능합니다.'],
    tags: ['함수'],
  },
  {
    id: 'prac-fn-fizz',
    topicId: 'functions',
    title: '3·5 배수 판정',
    description:
      '정수 n에 대해 3과 5의 공배수면 "FizzBuzz", 3의 배수면 "Fizz", 5의 배수면 "Buzz", 아니면 숫자 문자열을 반환하는 fizzbuzz(n)을 작성하세요.',
    difficulty: '심화',
    mode: 'function',
    functionName: 'fizzbuzz',
    starterCode: `def fizzbuzz(n):
    pass
`,
    solution: `def fizzbuzz(n):
    if n % 15 == 0:
        return "FizzBuzz"
    if n % 3 == 0:
        return "Fizz"
    if n % 5 == 0:
        return "Buzz"
    return str(n)
`,
    tests: [
      { id: 't1', description: '15', args: [15], expected: 'FizzBuzz' },
      { id: 't2', description: '9', args: [9], expected: 'Fizz' },
      { id: 't3', description: '10', args: [10], expected: 'Buzz' },
      { id: 't4', description: '7', args: [7], expected: '7' },
    ],
    tags: ['함수', '조건'],
  },
  {
    id: 'prac-fn-rps-score',
    topicId: 'functions',
    title: '가위바위보 점수화',
    description:
      '여러 판의 결과 리스트(각 원소는 "승리"|"패배"|"무승부")를 받아 점수 합을 반환하는 rps_score(results)를 작성하세요.\n승리 +2, 무승부 +1, 패배 0',
    difficulty: '응용',
    mode: 'function',
    functionName: 'rps_score',
    starterCode: `def rps_score(results):
    pass
`,
    solution: `def rps_score(results):
    score = 0
    for r in results:
        if r == "승리":
            score += 2
        elif r == "무승부":
            score += 1
    return score
`,
    tests: [
      {
        id: 't1',
        description: '승리, 패배, 무승부',
        args: [['승리', '패배', '무승부']],
        expected: 3,
      },
      { id: 't2', description: '전부 패배', args: [['패배', '패배']], expected: 0 },
      { id: 't3', description: '승리 3회', args: [['승리', '승리', '승리']], expected: 6 },
    ],
    tags: ['함수', '가위바위보'],
  },
]

export function practicesByTopic(topicId: TopicId): PracticeProblem[] {
  return PRACTICES.filter((p) => p.topicId === topicId)
}

export function getPractice(id: string): PracticeProblem | undefined {
  return PRACTICES.find((p) => p.id === id)
}
