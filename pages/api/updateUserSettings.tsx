import { client, DEFAULT_HEADERS } from "lib/apollo"
import { getUserSettings } from "lib/get/getUserSettings"
import { UPDATE_USER_SETTINGS_MUTATION } from "lib/queries/update-user-settings"

const updateUserSettings = async (req: any, res: any) => {
  try {
    const {
      userID,
      bgColor
    } = req.body

    const userData = await getUserSettings(userID, req)
    const { id } = userData

    const { data } =
      await client.mutate({
        mutation: UPDATE_USER_SETTINGS_MUTATION,
        variables: {
          id,
          bgColor
        },
        context: DEFAULT_HEADERS(req.cookies['calendar-user-token'])
      })

    res.json({
      data,
      success: true
    })
  }
  catch (err) {
    console.log(err)
    res.json({ success: false })
  }
}

export default updateUserSettings
