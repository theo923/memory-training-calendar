export const split_array = (a: any[], chunk: number = 10) => {
  let i, j, temporary
  const returnArr = []
  for (i = 0, j = a.length; i < j; i += chunk) {
    temporary = a.slice(i, i + chunk)
    returnArr.push(temporary)
  }
  return [returnArr, returnArr.length]
}
