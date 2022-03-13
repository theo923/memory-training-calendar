export const control_string_length = (l: string, limit: number) => {
  if (l.length > limit) {
    return [false, l.substring(0, limit)]
  }

  return [true, l]
}
