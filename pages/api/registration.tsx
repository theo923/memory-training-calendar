import { client } from "lib/apollo"
import { REGISTRATION_USER_QUERY, REGISTRATION_USER_INFO_QUERY } from "lib/queries/registration"

const registration = async (req: any, res: any) => {
  try {
    const { email, username, password } = req.body
    const { data: { register: { jwt, user: { id } } } } =
      await client.query({
        query: REGISTRATION_USER_QUERY,
        variables: {
          username,
          email,
          password
        }
      })

    await client.query({
      query: REGISTRATION_USER_INFO_QUERY,
      variables: {
        userID: id,
        userName: username,
        publishedAt: new Date()
      }
    })

    res.json({
      data: { jwt },
      success: true
    })
  }
  catch (err) {
    console.log(err)
    res.json({
      success: false
    })
  }
}

export default registration
