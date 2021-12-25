export const getHiddenWords = (word: string) =>
  Array(word.length).fill('*').join('')
