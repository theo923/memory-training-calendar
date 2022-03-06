export const slug_converter = (title: string): string =>
  title?.replace(/ /g, '-').toLocaleLowerCase() || title

export const verify_answer = (current: string, answer: string): boolean =>
  slug_converter(current) === slug_converter(answer)
