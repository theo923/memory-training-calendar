import { useEffect, useState } from "react"

const page_pass = (
  identifier: boolean,
  fail_func: () => void
) => {
  const [pass, setPass] = useState<boolean>(false)

  useEffect(() => {
    if (identifier)
      fail_func()
    else
      setPass(true)
  }, [])

  return pass
}

export default page_pass
