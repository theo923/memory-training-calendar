import { client, DEFAULT_HEADERS } from 'lib/apollo'
import { USER_INFO_QUERY } from 'lib/queries/user-info'

export const getUserInfo = async (req: any) => {
  const {
    data: {
      me: { id, username },
    },
  } = await client.query({
    query: USER_INFO_QUERY,
    context: DEFAULT_HEADERS(req.cookies['calendar-user-token']),
  })

  return {
    user: {
      id,
      username,
    },
  }
}
