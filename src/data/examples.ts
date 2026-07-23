import type { Example } from '../types'

/** 최소 Blockly XML — 변수 설정 + 출력 패턴 */
const xml = (inner: string) =>
  `<xml xmlns="https://developers.google.com/blockly/xml">${inner}</xml>`

export const EXAMPLES: Example[] = [
  // ── 변수 ──
  {
    id: 'var-intro',
    topicId: 'variables',
    title: '변수에 값 담기',
    summary: '이름표(변수)에 숫자·문자·참거짓을 저장합니다.',
    learningPoints: ['변수 이름 짓기', '대입(=)', '자료형 확인 type()'],
    difficulty: '기초',
    python: `name = "보문"
score = 95
passed = True

print(name)
print(score)
print(passed)
print(type(name), type(score), type(passed))
`,
    blocklyXml: xml(`
      <block type="variables_set" x="20" y="20">
        <field name="VAR">name</field>
        <value name="VALUE"><block type="text"><field name="TEXT">보문</field></block></value>
        <next>
          <block type="variables_set">
            <field name="VAR">score</field>
            <value name="VALUE"><block type="math_number"><field name="NUM">95</field></block></value>
            <next>
              <block type="text_print">
                <value name="TEXT"><block type="variables_get"><field name="VAR">name</field></block></value>
                <next>
                  <block type="text_print">
                    <value name="TEXT"><block type="variables_get"><field name="VAR">score</field></block></value>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>`),
  },
  {
    id: 'var-swap',
    topicId: 'variables',
    title: '두 변수 값 바꾸기',
    summary: '임시 변수 또는 다중 대입으로 값을 교환합니다.',
    learningPoints: ['임시 변수', 'a, b = b, a', '값의 흐름 추적'],
    difficulty: '기초',
    python: `a = 10
b = 20
print("교환 전:", a, b)

# 방법 1: 임시 변수
temp = a
a = b
b = temp
print("임시변수 후:", a, b)

# 방법 2: 파이썬 다중 대입
a, b = b, a
print("다중대입 후:", a, b)
`,
    blocklyXml: xml(`
      <block type="variables_set" x="20" y="20">
        <field name="VAR">a</field>
        <value name="VALUE"><block type="math_number"><field name="NUM">10</field></block></value>
        <next>
          <block type="variables_set">
            <field name="VAR">b</field>
            <value name="VALUE"><block type="math_number"><field name="NUM">20</field></block></value>
          </block>
        </next>
      </block>`),
  },
  {
    id: 'var-input-cast',
    topicId: 'variables',
    title: '입력과 형 변환',
    summary: '입력은 문자열이므로 계산 전에 int/float로 바꿉니다.',
    learningPoints: ['input 대신 예시 값 사용', 'int(), float(), str()', '형 불일치 오류'],
    difficulty: '응용',
    python: `# 수업에서는 input()을 쓰지만, 여기서는 예시 값으로 연습합니다.
raw = "18"
age = int(raw)
height = float("172.5")

print("나이:", age, "형:", type(age))
print("키:", height, "형:", type(height))
print("내년 나이:", age + 1)
print("소개:", "키는 " + str(height) + "cm")
`,
    blocklyXml: xml(`
      <block type="variables_set" x="20" y="20">
        <field name="VAR">age</field>
        <value name="VALUE"><block type="math_number"><field name="NUM">18</field></block></value>
        <next>
          <block type="text_print">
            <value name="TEXT">
              <block type="text_join">
                <mutation items="2"></mutation>
                <value name="ADD0"><block type="text"><field name="TEXT">나이: </field></block></value>
                <value name="ADD1"><block type="variables_get"><field name="VAR">age</field></block></value>
              </block>
            </value>
          </block>
        </next>
      </block>`),
  },
  {
    id: 'var-naming',
    topicId: 'variables',
    title: '좋은 변수 이름',
    summary: '의미를 드러내는 이름을 쓰고, 예약어·숫자 시작을 피합니다.',
    learningPoints: ['snake_case', '의미 있는 이름', '상수 관례'],
    difficulty: '기초',
    python: `student_count = 30
average_score = 87.5
IS_OPEN = True  # 상수처럼 쓰는 값(관례)

# 나쁜 예 (실행은 되지만 읽기 어려움)
# s = 30
# x = 87.5

print(student_count, average_score, IS_OPEN)
`,
    blocklyXml: xml(`
      <block type="variables_set" x="20" y="20">
        <field name="VAR">student_count</field>
        <value name="VALUE"><block type="math_number"><field name="NUM">30</field></block></value>
      </block>`),
  },

  // ── 연산자 ──
  {
    id: 'op-arithmetic',
    topicId: 'operators',
    title: '산술 연산자',
    summary: '+ - * / // % ** 로 계산합니다.',
    learningPoints: ['정수 나눗셈 //', '나머지 %', '거듭제곱 **'],
    difficulty: '기초',
    python: `a = 17
b = 5

print("더하기:", a + b)
print("빼기:", a - b)
print("곱하기:", a * b)
print("나누기:", a / b)
print("몫:", a // b)
print("나머지:", a % b)
print("제곱:", a ** 2)
`,
    blocklyXml: xml(`
      <block type="text_print" x="20" y="20">
        <value name="TEXT">
          <block type="math_arithmetic">
            <field name="OP">ADD</field>
            <value name="A"><block type="math_number"><field name="NUM">17</field></block></value>
            <value name="B"><block type="math_number"><field name="NUM">5</field></block></value>
          </block>
        </value>
      </block>`),
  },
  {
    id: 'op-compare',
    topicId: 'operators',
    title: '비교 연산자',
    summary: '크고 작음·같음을 비교해 True/False를 만듭니다.',
    learningPoints: ['== vs =', '!= < > <= >=', '결과가 논리형'],
    difficulty: '기초',
    python: `score = 80

print(score == 80)
print(score != 100)
print(score >= 60)
print(score < 70)

# 문자열도 비교 가능
print("apple" < "banana")
`,
    blocklyXml: xml(`
      <block type="text_print" x="20" y="20">
        <value name="TEXT">
          <block type="logic_compare">
            <field name="OP">GTE</field>
            <value name="A"><block type="math_number"><field name="NUM">80</field></block></value>
            <value name="B"><block type="math_number"><field name="NUM">60</field></block></value>
          </block>
        </value>
      </block>`),
  },
  {
    id: 'op-logic',
    topicId: 'operators',
    title: '논리 연산자',
    summary: 'and / or / not으로 조건을 결합합니다.',
    learningPoints: ['and 둘 다 참', 'or 하나라도 참', 'not 반전'],
    difficulty: '응용',
    python: `age = 16
has_id = True

can_enter = age >= 15 and has_id
weekend = False
free_time = weekend or age >= 18

print("입장 가능:", can_enter)
print("여유 시간:", free_time)
print("입장 불가?:", not can_enter)
`,
    blocklyXml: xml(`
      <block type="text_print" x="20" y="20">
        <value name="TEXT">
          <block type="logic_operation">
            <field name="OP">AND</field>
            <value name="A"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></value>
            <value name="B"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></value>
          </block>
        </value>
      </block>`),
  },
  {
    id: 'op-priority',
    topicId: 'operators',
    title: '연산 우선순위',
    summary: '곱셈이 덧셈보다 먼저입니다. 괄호로 순서를 명확히 합니다.',
    learningPoints: ['*/ 가 +- 보다 우선', '괄호 ()', '가독성'],
    difficulty: '응용',
    python: `print(2 + 3 * 4)      # 14
print((2 + 3) * 4)    # 20

x = 10
print(x / 2 + x / 5)
print(x / (2 + x / 5))
`,
    blocklyXml: xml(`
      <block type="text_print" x="20" y="20">
        <value name="TEXT">
          <block type="math_arithmetic">
            <field name="OP">ADD</field>
            <value name="A"><block type="math_number"><field name="NUM">2</field></block></value>
            <value name="B">
              <block type="math_arithmetic">
                <field name="OP">MULTIPLY</field>
                <value name="A"><block type="math_number"><field name="NUM">3</field></block></value>
                <value name="B"><block type="math_number"><field name="NUM">4</field></block></value>
              </block>
            </value>
          </block>
        </value>
      </block>`),
  },
  {
    id: 'op-grade',
    topicId: 'operators',
    title: '평균·합계 계산',
    summary: '여러 점수의 합과 평균을 연산자로 구합니다.',
    learningPoints: ['합계', '평균', '실수 결과'],
    difficulty: '기초',
    python: `kor = 88
eng = 92
math = 76

total = kor + eng + math
avg = total / 3

print("합계:", total)
print("평균:", round(avg, 2))
`,
    blocklyXml: xml(`
      <block type="variables_set" x="20" y="20">
        <field name="VAR">total</field>
        <value name="VALUE">
          <block type="math_arithmetic">
            <field name="OP">ADD</field>
            <value name="A"><block type="math_number"><field name="NUM">88</field></block></value>
            <value name="B"><block type="math_number"><field name="NUM">92</field></block></value>
          </block>
        </value>
      </block>`),
  },

  // ── 리스트 ──
  {
    id: 'list-create',
    topicId: 'lists',
    title: '리스트 만들기와 인덱싱',
    summary: '대괄호로 목록을 만들고 [인덱스]로 값을 꺼냅니다.',
    learningPoints: ['인덱스 0부터', '음수 인덱스', 'len()'],
    difficulty: '기초',
    python: `fruits = ["사과", "바나나", "포도", "딸기"]

print(fruits[0])
print(fruits[-1])
print("개수:", len(fruits))

fruits[1] = "키위"
print(fruits)
`,
    blocklyXml: xml(`
      <block type="variables_set" x="20" y="20">
        <field name="VAR">fruits</field>
        <value name="VALUE">
          <block type="lists_create_with">
            <mutation items="3"></mutation>
            <value name="ADD0"><block type="text"><field name="TEXT">사과</field></block></value>
            <value name="ADD1"><block type="text"><field name="TEXT">바나나</field></block></value>
            <value name="ADD2"><block type="text"><field name="TEXT">포도</field></block></value>
          </block>
        </value>
        <next>
          <block type="text_print">
            <value name="TEXT">
              <block type="lists_getIndex">
                <mutation statement="false" at="true"></mutation>
                <field name="MODE">GET</field>
                <field name="WHERE">FROM_START</field>
                <value name="VALUE"><block type="variables_get"><field name="VAR">fruits</field></block></value>
                <value name="AT"><block type="math_number"><field name="NUM">1</field></block></value>
              </block>
            </value>
          </block>
        </next>
      </block>`),
  },
  {
    id: 'list-methods',
    topicId: 'lists',
    title: '추가·삭제·슬라이싱',
    summary: 'append, remove, 슬라이스로 리스트를 다룹니다.',
    learningPoints: ['append', 'remove/pop', '슬라이스 [a:b]'],
    difficulty: '응용',
    python: `nums = [10, 20, 30]
nums.append(40)
nums.append(50)
print("추가 후:", nums)

nums.remove(20)
print("remove 후:", nums)
last = nums.pop()
print("pop:", last, "남은 값:", nums)

scores = [70, 80, 90, 85, 95]
print("앞 3개:", scores[:3])
print("뒤 2개:", scores[-2:])
`,
    blocklyXml: xml(`
      <block type="variables_set" x="20" y="20">
        <field name="VAR">nums</field>
        <value name="VALUE">
          <block type="lists_create_with">
            <mutation items="3"></mutation>
            <value name="ADD0"><block type="math_number"><field name="NUM">10</field></block></value>
            <value name="ADD1"><block type="math_number"><field name="NUM">20</field></block></value>
            <value name="ADD2"><block type="math_number"><field name="NUM">30</field></block></value>
          </block>
        </value>
      </block>`),
  },
  {
    id: 'list-sum-avg',
    topicId: 'lists',
    title: '리스트 합과 평균',
    summary: '숫자 리스트의 합·평균·최댓값을 구합니다.',
    learningPoints: ['sum', 'max/min', '평균 계산'],
    difficulty: '기초',
    python: `scores = [88, 92, 76, 95, 81]

total = sum(scores)
avg = total / len(scores)

print("점수:", scores)
print("합계:", total)
print("평균:", round(avg, 1))
print("최고:", max(scores), "최저:", min(scores))
`,
    blocklyXml: xml(`
      <block type="variables_set" x="20" y="20">
        <field name="VAR">scores</field>
        <value name="VALUE">
          <block type="lists_create_with">
            <mutation items="3"></mutation>
            <value name="ADD0"><block type="math_number"><field name="NUM">88</field></block></value>
            <value name="ADD1"><block type="math_number"><field name="NUM">92</field></block></value>
            <value name="ADD2"><block type="math_number"><field name="NUM">76</field></block></value>
          </block>
        </value>
      </block>`),
  },
  {
    id: 'list-search',
    topicId: 'lists',
    title: '값 찾기와 포함 여부',
    summary: 'in 연산자와 index로 값을 찾습니다.',
    learningPoints: ['in / not in', 'index()', '개수 count()'],
    difficulty: '응용',
    python: `menu = ["김밥", "라면", "우동", "김밥", "돈가스"]

print("라면 있음?", "라면" in menu)
print("초밥 없음?", "초밥" not in menu)
print("김밥 위치:", menu.index("김밥"))
print("김밥 개수:", menu.count("김밥"))
`,
    blocklyXml: xml(`
      <block type="text_print" x="20" y="20">
        <value name="TEXT">
          <block type="lists_indexOf">
            <field name="END">FIRST</field>
            <value name="VALUE"><block type="variables_get"><field name="VAR">menu</field></block></value>
            <value name="FIND"><block type="text"><field name="TEXT">라면</field></block></value>
          </block>
        </value>
      </block>`),
  },

  // ── 선택 ──
  {
    id: 'sel-if',
    topicId: 'selection',
    title: '기본 if / else',
    summary: '조건이 참이면 if, 아니면 else를 실행합니다.',
    learningPoints: ['조건식', '들여쓰기', 'else'],
    difficulty: '기초',
    python: `score = 73

if score >= 60:
    print("합격")
else:
    print("불합격")
`,
    blocklyXml: xml(`
      <block type="controls_if" x="20" y="20">
        <mutation else="1"></mutation>
        <value name="IF0">
          <block type="logic_compare">
            <field name="OP">GTE</field>
            <value name="A"><block type="variables_get"><field name="VAR">score</field></block></value>
            <value name="B"><block type="math_number"><field name="NUM">60</field></block></value>
          </block>
        </value>
        <statement name="DO0">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">합격</field></block></value>
          </block>
        </statement>
        <statement name="ELSE">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">불합격</field></block></value>
          </block>
        </statement>
      </block>`),
  },
  {
    id: 'sel-elif',
    topicId: 'selection',
    title: '다중 분기 elif',
    summary: '여러 구간으로 성적을 나눕니다.',
    learningPoints: ['elif 순서', '위에서 아래로 검사', '상호 배타적 조건'],
    difficulty: '응용',
    python: `score = 87

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "D"

print("점수:", score, "등급:", grade)
`,
    blocklyXml: xml(`
      <block type="controls_if" x="20" y="20">
        <mutation elseif="1" else="1"></mutation>
        <value name="IF0">
          <block type="logic_compare">
            <field name="OP">GTE</field>
            <value name="A"><block type="variables_get"><field name="VAR">score</field></block></value>
            <value name="B"><block type="math_number"><field name="NUM">90</field></block></value>
          </block>
        </value>
        <statement name="DO0">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">A</field></block></value>
          </block>
        </statement>
        <value name="IF1">
          <block type="logic_compare">
            <field name="OP">GTE</field>
            <value name="A"><block type="variables_get"><field name="VAR">score</field></block></value>
            <value name="B"><block type="math_number"><field name="NUM">80</field></block></value>
          </block>
        </value>
        <statement name="DO1">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">B</field></block></value>
          </block>
        </statement>
        <statement name="ELSE">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">C 이하</field></block></value>
          </block>
        </statement>
      </block>`),
  },
  {
    id: 'sel-nested',
    topicId: 'selection',
    title: '중첩 조건',
    summary: '조건 안에 조건을 넣어 세밀하게 분기합니다.',
    learningPoints: ['중첩 if', '가독성', '논리 연산으로 단순화'],
    difficulty: '심화',
    python: `age = 16
has_ticket = True

if age >= 15:
    if has_ticket:
        print("입장하세요")
    else:
        print("티켓이 필요합니다")
else:
    print("나이 제한")

# 같은 논리 (단순화)
if age >= 15 and has_ticket:
    print("입장(단순화)")
`,
    blocklyXml: xml(`
      <block type="controls_if" x="20" y="20">
        <value name="IF0">
          <block type="logic_operation">
            <field name="OP">AND</field>
            <value name="A"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></value>
            <value name="B"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></value>
          </block>
        </value>
        <statement name="DO0">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">입장하세요</field></block></value>
          </block>
        </statement>
      </block>`),
  },
  {
    id: 'sel-even-odd',
    topicId: 'selection',
    title: '짝수·홀수 판별',
    summary: '나머지 연산과 선택 구조를 결합합니다.',
    learningPoints: ['% 2', '이진 분기', '디버깅 시 조건 확인'],
    difficulty: '기초',
    python: `n = 14

if n % 2 == 0:
    print(n, "은(는) 짝수")
else:
    print(n, "은(는) 홀수")
`,
    blocklyXml: xml(`
      <block type="controls_if" x="20" y="20">
        <mutation else="1"></mutation>
        <value name="IF0">
          <block type="logic_compare">
            <field name="OP">EQ</field>
            <value name="A">
              <block type="math_modulo">
                <value name="DIVIDEND"><block type="variables_get"><field name="VAR">n</field></block></value>
                <value name="DIVISOR"><block type="math_number"><field name="NUM">2</field></block></value>
              </block>
            </value>
            <value name="B"><block type="math_number"><field name="NUM">0</field></block></value>
          </block>
        </value>
        <statement name="DO0">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">짝수</field></block></value>
          </block>
        </statement>
        <statement name="ELSE">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">홀수</field></block></value>
          </block>
        </statement>
      </block>`),
  },

  // ── 반복 ──
  {
    id: 'loop-for-range',
    topicId: 'loops',
    title: 'for와 range',
    summary: '정해진 횟수만큼 반복합니다.',
    learningPoints: ['range(n)', 'range(a,b)', '반복 변수'],
    difficulty: '기초',
    python: `print("0~4:")
for i in range(5):
    print(i)

print("1~5 합:")
total = 0
for n in range(1, 6):
    total = total + n
print(total)
`,
    blocklyXml: xml(`
      <block type="controls_repeat_ext" x="20" y="20">
        <value name="TIMES"><block type="math_number"><field name="NUM">5</field></block></value>
        <statement name="DO">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">반복</field></block></value>
          </block>
        </statement>
      </block>`),
  },
  {
    id: 'loop-for-list',
    topicId: 'loops',
    title: '리스트 순회',
    summary: '리스트의 각 요소를 순서대로 처리합니다.',
    learningPoints: ['for item in list', '누적', 'enumerate'],
    difficulty: '기초',
    python: `names = ["민수", "서연", "지훈"]

for name in names:
    print("안녕,", name)

print("--- 번호와 함께 ---")
for i, name in enumerate(names, start=1):
    print(i, name)
`,
    blocklyXml: xml(`
      <block type="controls_forEach" x="20" y="20">
        <field name="VAR">name</field>
        <value name="LIST"><block type="variables_get"><field name="VAR">names</field></block></value>
        <statement name="DO">
          <block type="text_print">
            <value name="TEXT"><block type="variables_get"><field name="VAR">name</field></block></value>
          </block>
        </statement>
      </block>`),
  },
  {
    id: 'loop-while',
    topicId: 'loops',
    title: 'while 반복',
    summary: '조건이 참인 동안 반복합니다. 종료 조건을 꼭 만듭니다.',
    learningPoints: ['조건 갱신', '무한 루프 주의', '카운터'],
    difficulty: '응용',
    python: `count = 1
while count <= 5:
    print("count =", count)
    count = count + 1

print("종료")
`,
    blocklyXml: xml(`
      <block type="controls_whileUntil" x="20" y="20">
        <field name="MODE">WHILE</field>
        <value name="BOOL">
          <block type="logic_compare">
            <field name="OP">LTE</field>
            <value name="A"><block type="variables_get"><field name="VAR">count</field></block></value>
            <value name="B"><block type="math_number"><field name="NUM">5</field></block></value>
          </block>
        </value>
        <statement name="DO">
          <block type="text_print">
            <value name="TEXT"><block type="variables_get"><field name="VAR">count</field></block></value>
          </block>
        </statement>
      </block>`),
  },
  {
    id: 'loop-break-continue',
    topicId: 'loops',
    title: 'break와 continue',
    summary: '반복을 중간에 멈추거나 다음으로 건너뜁니다.',
    learningPoints: ['break 즉시 종료', 'continue 이번만 건너뜀', '흐름 추적'],
    difficulty: '심화',
    python: `print("continue: 홀수 건너뛰기")
for n in range(1, 8):
    if n % 2 == 1:
        continue
    print(n)

print("break: 5에서 중단")
for n in range(1, 10):
    if n == 5:
        break
    print(n)
`,
    blocklyXml: xml(`
      <block type="controls_repeat_ext" x="20" y="20">
        <value name="TIMES"><block type="math_number"><field name="NUM">3</field></block></value>
        <statement name="DO">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">반복 중</field></block></value>
          </block>
        </statement>
      </block>`),
  },
  {
    id: 'loop-nested',
    topicId: 'loops',
    title: '중첩 반복 (구구단)',
    summary: '반복 안에 반복을 넣어 표를 만듭니다.',
    learningPoints: ['바깥/안쪽 루프', '들여쓰기', '디버깅 시 변수 관찰'],
    difficulty: '응용',
    python: `for dan in range(2, 5):
    print(dan, "단")
    for n in range(1, 4):
        print(dan, "x", n, "=", dan * n)
    print("---")
`,
    blocklyXml: xml(`
      <block type="controls_for" x="20" y="20">
        <field name="VAR">dan</field>
        <value name="FROM"><block type="math_number"><field name="NUM">2</field></block></value>
        <value name="TO"><block type="math_number"><field name="NUM">4</field></block></value>
        <value name="BY"><block type="math_number"><field name="NUM">1</field></block></value>
        <statement name="DO">
          <block type="text_print">
            <value name="TEXT"><block type="variables_get"><field name="VAR">dan</field></block></value>
          </block>
        </statement>
      </block>`),
  },

  // ── 함수 ──
  {
    id: 'fn-basic',
    topicId: 'functions',
    title: '함수 정의와 호출',
    summary: '기능을 묶고 이름으로 다시 호출합니다.',
    learningPoints: ['def', '호출 ()', '들여쓰기'],
    difficulty: '기초',
    python: `def greet():
    print("안녕하세요!")
    print("정보 수업입니다.")

greet()
greet()
`,
    blocklyXml: xml(`
      <block type="procedures_defnoreturn" x="20" y="20">
        <field name="NAME">greet</field>
        <statement name="STACK">
          <block type="text_print">
            <value name="TEXT"><block type="text"><field name="TEXT">안녕하세요!</field></block></value>
          </block>
        </statement>
      </block>
      <block type="procedures_callnoreturn" x="20" y="140">
        <mutation name="greet"></mutation>
      </block>`),
  },
  {
    id: 'fn-param',
    topicId: 'functions',
    title: '매개변수와 반환값',
    summary: '입력을 받아 처리하고 return으로 결과를 돌려줍니다.',
    learningPoints: ['매개변수', 'return', '반환값 사용'],
    difficulty: '응용',
    python: `def add(a, b):
    return a + b

def average(a, b):
    return (a + b) / 2

print(add(3, 5))
print(average(80, 90))

result = add(10, 20)
print("결과:", result)
`,
    blocklyXml: xml(`
      <block type="procedures_defreturn" x="20" y="20">
        <mutation>
          <arg name="a"></arg>
          <arg name="b"></arg>
        </mutation>
        <field name="NAME">add</field>
        <statement name="STACK"></statement>
        <value name="RETURN">
          <block type="math_arithmetic">
            <field name="OP">ADD</field>
            <value name="A"><block type="variables_get"><field name="VAR">a</field></block></value>
            <value name="B"><block type="variables_get"><field name="VAR">b</field></block></value>
          </block>
        </value>
      </block>`),
  },
  {
    id: 'fn-default',
    topicId: 'functions',
    title: '기본값 매개변수',
    summary: '자주 쓰는 값은 기본값으로 둘 수 있습니다.',
    learningPoints: ['기본 인자', '호출 시 생략', '가독성'],
    difficulty: '응용',
    python: `def introduce(name, school="보문고"):
    print(name, "학생 /", school)

introduce("민수")
introduce("서연", "조선대부고")
`,
    blocklyXml: xml(`
      <block type="procedures_defnoreturn" x="20" y="20">
        <mutation>
          <arg name="name"></arg>
        </mutation>
        <field name="NAME">introduce</field>
        <statement name="STACK">
          <block type="text_print">
            <value name="TEXT"><block type="variables_get"><field name="VAR">name</field></block></value>
          </block>
        </statement>
      </block>`),
  },
  {
    id: 'fn-list-stats',
    topicId: 'functions',
    title: '리스트 통계 함수',
    summary: '합·평균·최댓값을 함수로 분리해 재사용합니다.',
    learningPoints: ['기능 분리', '하나의 함수 한 역할', '테스트하기 쉬움'],
    difficulty: '심화',
    python: `def total(nums):
    s = 0
    for n in nums:
        s = s + n
    return s

def mean(nums):
    return total(nums) / len(nums)

data = [70, 85, 90, 78]
print("합:", total(data))
print("평균:", round(mean(data), 2))
print("내장 max:", max(data))
`,
    blocklyXml: xml(`
      <block type="procedures_defreturn" x="20" y="20">
        <mutation>
          <arg name="nums"></arg>
        </mutation>
        <field name="NAME">total</field>
        <value name="RETURN">
          <block type="math_number"><field name="NUM">0</field></block>
        </value>
      </block>`),
  },
  {
    id: 'fn-debug-practice',
    topicId: 'functions',
    title: '디버깅 연습: 잘못된 평균',
    summary: '버그가 있는 코드를 한 줄씩 실행하며 변수를 관찰하세요.',
    learningPoints: ['디버거로 변수 확인', '오프바이원', '수정 후 재실행'],
    difficulty: '심화',
    python: `# 의도: 1~5 평균 = 3.0
# 버그: range 끝과 나눗셈을 확인해 보세요.

def broken_average():
    total = 0
    count = 0
    for i in range(1, 5):  # 버그? 1~4만 더함
        total = total + i
        count = count + 1
    return total / count

print(broken_average())

# 수정 예시
def fixed_average():
    total = 0
    count = 0
    for i in range(1, 6):
        total = total + i
        count = count + 1
    return total / count

print("수정:", fixed_average())
`,
    blocklyXml: xml(`
      <block type="text_print" x="20" y="20">
        <value name="TEXT"><block type="text"><field name="TEXT">디버거로 한 줄씩 실행해 보세요</field></block></value>
      </block>`),
  },
]

export function examplesByTopic(topicId: string): Example[] {
  return EXAMPLES.filter((e) => e.topicId === topicId)
}

export function getExample(id: string): Example | undefined {
  return EXAMPLES.find((e) => e.id === id)
}
