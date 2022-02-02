import { client } from "lib/apollo"
import { REFRESH_TOKEN_MUTATION } from "lib/queries/refresh-token"
import { write_logs } from "lib/utils/write_logs"

const authorization = async (req: any, res: any) => {
  const { ip } = req.body
  try {
    const { identifier, password } = req.body
    const { data: { login } } =
      await client.mutate({
        mutation: REFRESH_TOKEN_MUTATION,
        variables: {
          identifier,
          password
        }
      })

    await write_logs('login', 'App', login.user.id, login.user.username, ip, login.user, '')

    res.json({
      data: login,
      success: true
    })
  }
  catch (err) {
    console.log(err)
    console.log('error in authorize user')
    res.json({ success: false })
  }
}

export default authorization
