export const slug_converter = (title: string) =>
  title.replace(/ /g, '-').toLocaleLowerCase()
