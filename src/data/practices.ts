import type { PracticeProblem, TopicId } from '../types'

export const PRACTICES: PracticeProblem[] = [
  {
    id: 'prac-var-greeting',
    topicId: 'variables',
    title: '인사말 만들기',
    description:
      '목표: greeting(name) 함수를 만들어 인사 문장을 반환하세요.\n\n입력 예: name = "보문"\n출력 예: "안녕, 보문!"\n\n작성 순서\n1) def greeting(name): 로 함수를 만듭니다.\n2) "안녕, " + name + "!" 처럼 문자열을 이어 붙입니다.\n3) return으로 그 결과를 돌려줍니다.\n4) 자동 채점을 눌러 테스트 3개를 통과하는지 확인합니다.',
    difficulty: '기초',
    mode: 'function',
    functionName: 'greeting',
    starterCode: `def greeting(name):
    # 예: "안녕, 보문!" 형태를 만들어 return 하세요
    pass
`,
    solution: `def greeting(name):
    return "안녕, " + name + "!"
`,
    tests: [
      { id: 't1', description: 'greeting("보문") → 안녕, 보문!', args: ['보문'], expected: '안녕, 보문!' },
      { id: 't2', description: 'greeting("정보") → 안녕, 정보!', args: ['정보'], expected: '안녕, 정보!' },
      { id: 't3', description: 'greeting("AI") → 안녕, AI!', args: ['AI'], expected: '안녕, AI!' },
    ],
    tips: [
      '문자열은 + 로 이어 붙일 수 있습니다.',
      'f-string도 가능합니다: return f"안녕, {name}!"',
      'print가 아니라 return이어야 채점에 통과합니다.',
    ],
    tags: ['변수', '문자열'],
  },
  {
    id: 'prac-var-scoreboard',
    topicId: 'variables',
    title: '점수판 합계',
    description:
      '목표: 세 과목 점수 a, b, c의 합을 구하는 total_score(a, b, c)를 작성하세요.\n\n예: total_score(80, 90, 70) → 240\n\n작성 순서\n1) 세 매개변수를 받습니다.\n2) a + b + c 를 계산합니다.\n3) 그 값을 return 합니다.',
    difficulty: '기초',
    mode: 'function',
    functionName: 'total_score',
    starterCode: `def total_score(a, b, c):
    # 세 점수의 합을 return
    pass
`,
    solution: `def total_score(a, b, c):
    return a + b + c
`,
    tests: [
      { id: 't1', description: '80+90+70 = 240', args: [80, 90, 70], expected: 240 },
      { id: 't2', description: '100+100+100 = 300', args: [100, 100, 100], expected: 300 },
      { id: 't3', description: '0+50+25 = 75', args: [0, 50, 25], expected: 75 },
    ],
    tips: ['변수에 담지 않고 바로 return a + b + c 해도 됩니다.'],
    tags: ['변수', '합계'],
  },
  {
    id: 'prac-op-bmi',
    topicId: 'operators',
    title: 'BMI 계산',
    description:
      '목표: BMI를 계산하는 bmi(weight, height)를 작성하세요.\n\n공식: BMI = 체중(kg) ÷ (키(m) × 키(m))\n결과는 소수 첫째 자리까지 반올림 (round 사용)\n\n예: bmi(70, 1.75) → 22.9\n\n작성 순서\n1) height * height 또는 height ** 2 로 키의 제곱을 구합니다.\n2) weight를 그 값으로 나눕니다.\n3) round(값, 1)로 반올림해 return 합니다.',
    difficulty: '응용',
    mode: 'function',
    functionName: 'bmi',
    starterCode: `def bmi(weight, height):
    # BMI = weight / (height * height)
    # round(..., 1)로 소수 첫째 자리까지
    pass
`,
    solution: `def bmi(weight, height):
    return round(weight / (height * height), 1)
`,
    tests: [
      { id: 't1', description: '70kg, 1.75m → 22.9', args: [70, 1.75], expected: 22.9 },
      { id: 't2', description: '60kg, 1.7m → 20.8', args: [60, 1.7], expected: 20.8 },
      { id: 't3', description: '80kg, 1.8m → 24.7', args: [80, 1.8], expected: 24.7 },
    ],
    tips: ['키 단위는 m입니다. 175cm면 1.75로 넣습니다.', 'round(숫자, 1) → 소수 첫째 자리'],
    tags: ['연산', 'BMI'],
  },
  {
    id: 'prac-op-change',
    topicId: 'operators',
    title: '거스름돈 계산',
    description:
      '목표: 받은 돈에서 물건 값을 뺀 거스름돈을 구하는 change(paid, price)를 작성하세요.\n\n예: change(10000, 7500) → 2500\n(받은 금액이 가격보다 크거나 같다고 가정합니다.)\n\n작성 순서\n1) paid - price 를 계산합니다.\n2) 그 값을 return 합니다.',
    difficulty: '기초',
    mode: 'function',
    functionName: 'change',
    starterCode: `def change(paid, price):
    # 거스름돈 = 받은 돈 - 가격
    pass
`,
    solution: `def change(paid, price):
    return paid - price
`,
    tests: [
      { id: 't1', description: '10000 - 7500 = 2500', args: [10000, 7500], expected: 2500 },
      { id: 't2', description: '5000 - 5000 = 0', args: [5000, 5000], expected: 0 },
      { id: 't3', description: '3000 - 1200 = 1800', args: [3000, 1200], expected: 1800 },
    ],
    tips: ['뺄셈 연산자 - 를 사용합니다.'],
    tags: ['연산', '뺄셈'],
  },
  {
    id: 'prac-list-avg',
    topicId: 'lists',
    title: '점수 평균',
    description:
      '목표: 점수 리스트의 평균을 구하는 average(scores)를 작성하세요.\n\n예: average([80, 90, 100]) → 90\n빈 리스트 [] 이면 0을 반환합니다.\n\n작성 순서\n1) len(scores)가 0이면 return 0\n2) 아니면 sum(scores) / len(scores) 를 return',
    difficulty: '기초',
    mode: 'function',
    functionName: 'average',
    starterCode: `def average(scores):
    # 빈 리스트면 0, 아니면 합/개수
    pass
`,
    solution: `def average(scores):
    if len(scores) == 0:
        return 0
    return sum(scores) / len(scores)
`,
    tests: [
      { id: 't1', description: '[80, 90, 100] 평균 90', args: [[80, 90, 100]], expected: 90 },
      { id: 't2', description: '[50] 평균 50', args: [[50]], expected: 50 },
      { id: 't3', description: '[] → 0', args: [[]], expected: 0 },
    ],
    tips: ['sum(리스트)는 합, len(리스트)는 개수입니다.', '0으로 나누지 않도록 빈 리스트를 먼저 처리하세요.'],
    tags: ['리스트', '평균'],
  },
  {
    id: 'prac-list-max',
    topicId: 'lists',
    title: '최고 점수 찾기',
    description:
      '목표: 리스트에서 가장 큰 점수를 찾는 best_score(scores)를 작성하세요.\n\n예: best_score([70, 95, 88]) → 95\n(리스트는 비어 있지 않다고 가정합니다.)\n\n작성 순서\n1) max(scores)를 사용하거나\n2) for로 하나씩 비교하며 최댓값을 갱신합니다.',
    difficulty: '기초',
    mode: 'function',
    functionName: 'best_score',
    starterCode: `def best_score(scores):
    # 가장 큰 값을 return
    pass
`,
    solution: `def best_score(scores):
    return max(scores)
`,
    tests: [
      { id: 't1', description: '[70, 95, 88] → 95', args: [[70, 95, 88]], expected: 95 },
      { id: 't2', description: '[10, 10, 10] → 10', args: [[10, 10, 10]], expected: 10 },
      { id: 't3', description: '[1, 2, 3, 100] → 100', args: [[1, 2, 3, 100]], expected: 100 },
    ],
    tips: ['내장 함수 max(리스트)를 그대로 써도 됩니다.'],
    tags: ['리스트', '최댓값'],
  },
  {
    id: 'prac-sel-oddeven',
    topicId: 'selection',
    title: '홀수·짝수 판별',
    description:
      '목표: 정수 n이 짝수면 "짝수", 홀수면 "홀수" 문자열을 반환하는 odd_even(n)을 작성하세요.\n\n판별 방법: n을 2로 나눈 나머지(%)가 0이면 짝수입니다.\n예: odd_even(4) → "짝수", odd_even(7) → "홀수"\n\n작성 순서\n1) if n % 2 == 0: return "짝수"\n2) else: return "홀수"\n※ 반환 문자열은 정확히 "짝수"/"홀수"여야 합니다.',
    difficulty: '기초',
    mode: 'function',
    functionName: 'odd_even',
    starterCode: `def odd_even(n):
    # n % 2 == 0 이면 짝수
    pass
`,
    solution: `def odd_even(n):
    if n % 2 == 0:
        return "짝수"
    else:
        return "홀수"
`,
    tests: [
      { id: 't1', description: '4 → 짝수', args: [4], expected: '짝수' },
      { id: 't2', description: '7 → 홀수', args: [7], expected: '홀수' },
      { id: 't3', description: '0 → 짝수', args: [0], expected: '짝수' },
      { id: 't4', description: '-3 → 홀수', args: [-3], expected: '홀수' },
    ],
    tips: ['% 는 나머지 연산자입니다.', '예시 학습의 「홀수·짝수 판별」을 먼저 실행해 보세요.'],
    relatedExampleId: 'sel-oddeven',
    tags: ['선택', '홀짝'],
  },
  {
    id: 'prac-sel-rps',
    topicId: 'selection',
    title: '가위바위보 승패',
    description:
      '목표: 나와 상대의 선택으로 승패를 판정하는 rps(a, b)를 작성하세요.\na, b는 "가위", "바위", "보" 중 하나입니다.\n\n규칙\n- 같으면 "무승부"\n- 가위는 보를 이김, 바위는 가위를 이김, 보는 바위를 이김 → "승리"\n- 그 외는 "패배"\n\n예: rps("가위", "보") → "승리"\n\n작성 순서\n1) a == b 이면 return "무승부"\n2) 내가 이기는 세 경우를 or로 묶어 return "승리"\n3) 나머지는 return "패배"',
    difficulty: '응용',
    mode: 'function',
    functionName: 'rps',
    starterCode: `def rps(a, b):
    # 가위>보, 바위>가위, 보>바위
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
      { id: 't1', description: '가위 vs 보 → 승리', args: ['가위', '보'], expected: '승리' },
      { id: 't2', description: '바위 vs 보 → 패배', args: ['바위', '보'], expected: '패배' },
      { id: 't3', description: '보 vs 보 → 무승부', args: ['보', '보'], expected: '무승부' },
      { id: 't4', description: '바위 vs 가위 → 승리', args: ['바위', '가위'], expected: '승리' },
      { id: 't5', description: '가위 vs 바위 → 패배', args: ['가위', '바위'], expected: '패배' },
    ],
    tips: ['먼저 무승부를 처리하면 코드가 단순해집니다.', '예시 「가위바위보 게임」을 함께 보세요.'],
    relatedExampleId: 'sel-rps',
    tags: ['선택', '가위바위보'],
  },
  {
    id: 'prac-sel-grade',
    topicId: 'selection',
    title: '학점 판정',
    description:
      '목표: 점수에 따라 학점 문자를 반환하는 letter_grade(score)를 작성하세요.\n\n기준 (위에서부터 순서대로 검사)\n- 90 이상 → "A"\n- 80 이상 → "B"\n- 70 이상 → "C"\n- 60 이상 → "D"\n- 그 외 → "F"\n\n예: letter_grade(85) → "B"\n\nif / elif / else를 사용하세요. 경계값(90, 80…)도 포함입니다 (>=).',
    difficulty: '기초',
    mode: 'function',
    functionName: 'letter_grade',
    starterCode: `def letter_grade(score):
    # 90 이상 A, 80 이상 B, ...
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
      { id: 't2', description: '80 → B (경계)', args: [80], expected: 'B' },
      { id: 't3', description: '70 → C', args: [70], expected: 'C' },
      { id: 't4', description: '60 → D', args: [60], expected: 'D' },
      { id: 't5', description: '59 → F', args: [59], expected: 'F' },
    ],
    tips: ['큰 점수부터 if → elif 순서로 써야 합니다.', '80점은 B입니다 (>= 80).'],
    tags: ['선택', '학점'],
  },
  {
    id: 'prac-loop-updown',
    topicId: 'loops',
    title: '업앤다운 힌트',
    description:
      '목표: 비밀 숫자와 추측을 비교해 힌트를 주는 updown(secret, guess)를 작성하세요.\n\n규칙\n- guess < secret → "업" (더 큰 수를 말하라는 뜻)\n- guess > secret → "다운"\n- 같으면 → "정답"\n\n예: updown(50, 30) → "업"\n\n이 함수는 한 번의 비교만 합니다. (반복은 예시 학습에서 확인)',
    difficulty: '기초',
    mode: 'function',
    functionName: 'updown',
    starterCode: `def updown(secret, guess):
    # 작으면 업, 크면 다운, 같으면 정답
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
      { id: 't1', description: 'secret 50, guess 30 → 업', args: [50, 30], expected: '업' },
      { id: 't2', description: 'secret 50, guess 80 → 다운', args: [50, 80], expected: '다운' },
      { id: 't3', description: 'secret 50, guess 50 → 정답', args: [50, 50], expected: '정답' },
    ],
    tips: ['예시 「업앤다운 게임」에서 여러 번 추측하는 흐름을 먼저 보세요.'],
    relatedExampleId: 'loop-updown',
    tags: ['반복', '업앤다운'],
  },
  {
    id: 'prac-loop-sum',
    topicId: 'loops',
    title: '1부터 n까지 합',
    description:
      '목표: 1부터 n까지 정수를 모두 더한 값을 반환하는 sum_to(n)을 작성하세요.\n\n예: sum_to(10) → 55 (1+2+…+10)\n\n작성 순서\n1) total = 0\n2) for i in range(1, n + 1): total += i\n3) return total\n\n공식 n*(n+1)//2 를 써도 되지만, 이 단원에서는 for 반복 연습을 권장합니다.',
    difficulty: '기초',
    mode: 'function',
    functionName: 'sum_to',
    starterCode: `def sum_to(n):
    # for로 1부터 n까지 더하기
    pass
`,
    solution: `def sum_to(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total
`,
    tests: [
      { id: 't1', description: 'sum_to(10) → 55', args: [10], expected: 55 },
      { id: 't2', description: 'sum_to(1) → 1', args: [1], expected: 1 },
      { id: 't3', description: 'sum_to(100) → 5050', args: [100], expected: 5050 },
    ],
    tips: ['range(1, n+1)은 1, 2, …, n 까지입니다.', '디버그로 total이 커지는 과정을 관찰해 보세요.'],
    tags: ['반복', '합'],
  },
  {
    id: 'prac-loop-count-even',
    topicId: 'loops',
    title: '짝수 개수 세기',
    description:
      '목표: 정수 리스트에서 짝수 개수를 세는 count_even(nums)를 작성하세요.\n\n예: count_even([1, 2, 3, 4, 5]) → 2\n\n작성 순서\n1) count = 0\n2) for n in nums: 에서 n % 2 == 0 이면 count += 1\n3) return count',
    difficulty: '응용',
    mode: 'function',
    functionName: 'count_even',
    starterCode: `def count_even(nums):
    # 짝수일 때마다 count를 1 증가
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
      { id: 't1', description: '[1,2,3,4,5] → 2', args: [[1, 2, 3, 4, 5]], expected: 2 },
      { id: 't2', description: '[2,4,6] → 3', args: [[2, 4, 6]], expected: 3 },
      { id: 't3', description: '[1,3,5] → 0', args: [[1, 3, 5]], expected: 0 },
    ],
    tips: ['홀짝 판별과 리스트 for 순회를 합친 문제입니다.'],
    tags: ['반복', '홀짝'],
  },
  {
    id: 'prac-fn-absdiff',
    topicId: 'functions',
    title: '절댓값 차이',
    description:
      '목표: 두 수의 차이를 절댓값으로 구하는 abs_diff(a, b)를 작성하세요.\n\n예: abs_diff(10, 3) → 7, abs_diff(3, 10) → 7\n\n작성 방법\n- return abs(a - b)\n- 또는 d = a - b 후 d가 음수면 -d를 return',
    difficulty: '기초',
    mode: 'function',
    functionName: 'abs_diff',
    starterCode: `def abs_diff(a, b):
    # |a - b| 를 return
    pass
`,
    solution: `def abs_diff(a, b):
    d = a - b
    if d < 0:
        return -d
    return d
`,
    tests: [
      { id: 't1', description: '|10-3| = 7', args: [10, 3], expected: 7 },
      { id: 't2', description: '|3-10| = 7', args: [3, 10], expected: 7 },
      { id: 't3', description: '|5-5| = 0', args: [5, 5], expected: 0 },
    ],
    tips: ['abs(a - b) 한 줄로도 충분합니다.'],
    tags: ['함수'],
  },
  {
    id: 'prac-fn-fizz',
    topicId: 'functions',
    title: '3·5 배수 판정',
    description:
      '목표: 고전적인 FizzBuzz 규칙을 함수로 구현하세요. fizzbuzz(n)\n\n규칙 (순서 중요)\n1) 3과 5의 공배수(15의 배수) → "FizzBuzz"\n2) 3의 배수 → "Fizz"\n3) 5의 배수 → "Buzz"\n4) 그 외 → 숫자를 문자열로 (예: 7 → "7")\n\n예: fizzbuzz(15) → "FizzBuzz", fizzbuzz(9) → "Fizz"',
    difficulty: '심화',
    mode: 'function',
    functionName: 'fizzbuzz',
    starterCode: `def fizzbuzz(n):
    # 15의 배수를 먼저 검사하세요
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
      { id: 't1', description: '15 → FizzBuzz', args: [15], expected: 'FizzBuzz' },
      { id: 't2', description: '9 → Fizz', args: [9], expected: 'Fizz' },
      { id: 't3', description: '10 → Buzz', args: [10], expected: 'Buzz' },
      { id: 't4', description: '7 → "7"', args: [7], expected: '7' },
    ],
    tips: ['15의 배수를 나중에 검사하면 Fizz만 나와 오답입니다.', '숫자는 str(n)으로 문자열 변환합니다.'],
    tags: ['함수', '조건'],
  },
  {
    id: 'prac-fn-rps-score',
    topicId: 'functions',
    title: '가위바위보 점수화',
    description:
      '목표: 여러 판 결과 리스트로 점수를 합산하는 rps_score(results)를 작성하세요.\n\n점수 규칙\n- "승리" → +2\n- "무승부" → +1\n- "패배" → +0\n\n예: rps_score(["승리", "패배", "무승부"]) → 3\n\n작성 순서\n1) score = 0\n2) for r in results: 로 각 결과를 확인\n3) 조건에 따라 score를 올리고 마지막에 return',
    difficulty: '응용',
    mode: 'function',
    functionName: 'rps_score',
    starterCode: `def rps_score(results):
    # 승리 +2, 무승부 +1, 패배 0
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
        description: '승리+패배+무승부 → 3',
        args: [['승리', '패배', '무승부']],
        expected: 3,
      },
      { id: 't2', description: '패배만 → 0', args: [['패배', '패배']], expected: 0 },
      { id: 't3', description: '승리 3회 → 6', args: [['승리', '승리', '승리']], expected: 6 },
    ],
    tips: ['리스트와 선택 구조를 함께 쓰는 종합 문제입니다.'],
    tags: ['함수', '가위바위보'],
  },
]

export function practicesByTopic(topicId: TopicId): PracticeProblem[] {
  return PRACTICES.filter((p) => p.topicId === topicId)
}

export function getPractice(id: string): PracticeProblem | undefined {
  return PRACTICES.find((p) => p.id === id)
}
