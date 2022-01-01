import { client, DEFAULT_HEADERS } from 'lib/apollo'
import { READ_USER_SETTINGS } from 'lib/queries/read-user-settings'

export const getUserSettings = async (userID: string, req: any) => {
  const {
    data: {
      userSettings: { data },
    },
  } = await client.query({
    query: READ_USER_SETTINGS,
    variables: {
      userID,
    },
    context: DEFAULT_HEADERS(req.cookies['calendar-user-token']),
  })

  if (data.length > 0) {
    return {
      id: data[0]?.id,
      ...data[0]?.attributes,
    }
  }

  return {}
}
