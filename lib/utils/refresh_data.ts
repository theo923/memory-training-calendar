import { NextRouter } from 'next/router'

export const refreshData = (
  router: NextRouter,
  location: string = `/year/${router.query['year'] as string}`,
  method: string = 'replace'
): void => {
  if (method === 'replace')
    router.replace({
      pathname: location,
    })
  if (method === 'push')
    router.push({
      pathname: location,
    })
}
