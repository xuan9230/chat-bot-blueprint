export function getMoneyNumber(string) {
  if (typeof string === "number") return string
  if (!string || string === "none") return undefined
  return Number(string.replace(/\$/g, "").replace(/,/g, ""))
}

export function calculateRetirementBalance({
  annualSalary,
  currentSuper,
  currentAge,
  retirementAge,
  superContribution,
  voluntaryContribution = 0,
}) {
  const taxOnSuper = 0.15
  const wageInflatation = 0.04
  const fractionTargetRetirementIncome = 0.6
  // const taxAfterThreshold = 0.15;
  // const incomeThreshold = 250000;
  // const increaseReturnAfterRetirementAge = 0.005;
  let riskLevel = "high"
  let age = currentAge
  let balance = currentSuper
  let income = 0
  let totalSuper

  if (superContribution?.includes("%")) superContribution.replace("%", "")
  if (superContribution > 1) superContribution = superContribution / 100
  if (!superContribution) superContribution = 0.12

  if (age <= 55) riskLevel = "high"
  if (age >= 56 && age <= 64) riskLevel = "medium"
  if (age >= 65) riskLevel = "low"

  const riskReturn = {
    high: 0.065, // ages up to 55
    medium: 0.06, // ages 56-64
    low: 0.05, // ages 65+
  }

  const ageCoordinates = []
  const balanceCoordinates = []
  const incomeCoordinates = []

  while (age <= retirementAge) {
    balance =
      ((balance + voluntaryContribution + annualSalary * superContribution * (1 - taxOnSuper)) *
        (1 + riskReturn[riskLevel])) /
      (1 + wageInflatation)
    ageCoordinates.push(age)
    balanceCoordinates.push(Math.round(balance))
    incomeCoordinates.push(income)
    if (age === retirementAge) {
      totalSuper = balance
      income = annualSalary * fractionTargetRetirementIncome
    }
    age++
  }

  while (balance >= income) {
    balance = (balance * (1 + riskReturn[riskLevel]) - income) / (1 + wageInflatation)
    ageCoordinates.push(age)
    balanceCoordinates.push(Math.round(balance))
    incomeCoordinates.push(Math.round(income))
    age++
  }

  return {
    x: ageCoordinates,
    balance: balanceCoordinates,
    income: incomeCoordinates,
    totalSuper: Math.round(totalSuper),
  }
}

export function getChartData({ basicInfo, setBasicInfo }) {
  if (!(basicInfo?.age && basicInfo?.retirement_age && basicInfo?.annual_income && basicInfo?.super_balance))
    return null

  const annualSalary = getMoneyNumber(basicInfo?.annual_income) ?? 100000
  const currentSuper = getMoneyNumber(basicInfo?.super_balance) ?? 85000
  const currentAge = basicInfo.age
  const retirementAge = basicInfo.retirement_age

  const { x, balance, income, totalSuper } = calculateRetirementBalance({
    annualSalary,
    currentSuper,
    currentAge,
    retirementAge,
    superContribution: basicInfo.super_contribution,
    voluntaryContribution: getMoneyNumber(basicInfo.voluntary_contribution),
  })

  const info = basicInfo || {}
  Object.assign(info, {
    total_super: totalSuper,
    retirement_income: Math.round(income[income.length - 2]),
    retirement_age: retirementAge,
    annual_income: annualSalary,
    super_balance: currentSuper,
    age: currentAge,
  })

  setBasicInfo(info)

  return {
    x,
    balance,
    income,
    totalSuper,
    retirementAge,
  }
}
