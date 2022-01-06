export const serialize = (node: any) => {
  let newString = node
  if (node.includes('contenteditable'))
    newString = node.replace('contenteditable="true"', '')
  return newString
}
