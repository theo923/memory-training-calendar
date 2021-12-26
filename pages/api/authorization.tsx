import { client } from "lib/apollo"
import { REFRESH_TOKEN_MUTATION } from "lib/queries/refresh-token"

const authorization = async (req: any, res: any) => {
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
    res.json({
      data: login,
      success: true
    })
  }
  catch (err) {
    console.log(err)
    res.json({ success: false })
  }
}

export default authorization
