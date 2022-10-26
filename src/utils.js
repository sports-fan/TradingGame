export const getForBalance = (balanceA, priceA, priceB) => {
  return balanceA * priceA / priceB 
}

export const formatDate = date => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join(' / ')
}

export const getProductionRate = (currentDate, initial_rates) => {
  if (currentDate === new Date('2022/6/5')) {
    return {
      ...initial_rates,
      spring: initial_rates.spring / 2
    }
  } else if (currentDate === new Date('2025/6/5')) {
    return {
      ...initial_rates,
      summer: initial_rates.summer / 2
    }
  } else if (currentDate === new Date('2028/6/5')) {
    return {
      ...initial_rates,
      autumn: initial_rates.autumn / 2
    }
  } else if (currentDate === new Date('2031/6/5')) {
    return {
      ...initial_rates,
      winter: initial_rates.winter / 2
    }
  } else
    return initial_rates
}
