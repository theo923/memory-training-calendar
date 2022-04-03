import router from 'next/router'

export const refreshData = (
  location: string = `/calendar/${router.query['year'] as string}`,
  method: string = 'replace'
): void => {
  if (method === 'reload') router.reload()
  if (method === 'replace')
    router.replace({
      pathname: location,
    })
  if (method === 'push')
    router.push({
      pathname: location,
    })
  if (method === 'back') router.back()
}
