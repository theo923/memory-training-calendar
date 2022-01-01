import { client } from 'lib/apollo'
import { SERVER_SETTINGS_QUERY } from 'lib/queries/server-settings'

export const getServerSettings = async () => {
  const {
    data: {
      colorPalette: {
        data: {
          attributes: { color_static, color_gradient },
        },
      },
    },
  } = await client.query({
    query: SERVER_SETTINGS_QUERY,
  })

  return {
    taskColor: {
      color_static,
      color_gradient,
    },
    bgColor: {
      color_gradient,
    },
  }
}
