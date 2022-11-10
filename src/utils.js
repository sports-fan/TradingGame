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

const boxMullerTransform = () => {
  const u1 = Math.random();
  const u2 = Math.random();
  
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
  
  return { z0, z1 };
}

export const getNormallyDistributedRandomNumber = (mean, stddev) => {
  const { z0, } = boxMullerTransform();
  
  return z0 * stddev + mean;
}
