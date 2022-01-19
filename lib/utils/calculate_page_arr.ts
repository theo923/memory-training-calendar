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
      pageArray.push(i)
    }
  } else {
    for (let i = current - 2; i <= current + 2; i++) {
      pageArray.push(i)
    }
  }
  return pageArray
}
