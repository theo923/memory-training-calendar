import axios from "axios"
import { NEXT_PUBLIC_API_URL, GET_AUTH } from "lib/env"

const authorization = async (req: any, res: any) => {
  try {
    const { identifier, password } = req.body
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}${GET_AUTH}`, {
      identifier,
      password
    })
    res.json({
      data: response.data,
      success: true
    })
  }
  catch (err) {
    console.log(err)
    res.json({ success: false })
  }
}

export default authorization
