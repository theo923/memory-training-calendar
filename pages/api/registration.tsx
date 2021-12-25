import { client } from "lib/apollo"
import { REGISTRATION_QUERY } from "lib/queries/registration"

const registration = async (req: any, res: any) => {
  try {
    const { email, username, password } = req.body
    const { data: { register: { jwt } } } =
      await client.query({
        query: REGISTRATION_QUERY,
        variables: {
          username,
          email,
          password
        }
      })
    res.json({
      data: { jwt },
      success: true
    })
  }
  catch (err) {
    console.log(err)
    res.json({ success: false })
  }
}

export default registration
