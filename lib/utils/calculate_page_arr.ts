export const calculatePageArray = (current: number, max: number) => {
  let pageArray: number[] = []
  if (current <= 3) {
    for (let i = 1; i <= 5; i++) {
      if (i <= max) {
        pageArray.push(i)
      }
    }
  } else if (current + 2 >= max) {
    for (let i = max - 4; i <= max; i++) {
      if (i == 0) continue
      pageArray.push(i)
    }
  } else {
    for (let i = current - 2; i <= current + 2; i++) {
      if (i == 0) continue
      pageArray.push(i)
    }
  }
  return pageArray
}
