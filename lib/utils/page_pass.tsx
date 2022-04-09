import { useCallback, useEffect, useState } from "react"

const page_pass = (
  identifier: boolean,
  fail_func: () => void
) => {
  const [pass, setPass] = useState<boolean>(false)

  const callback = useCallback(() => {
    fail_func()
  }, [identifier])

  useEffect(() => {
    if (identifier)
      callback()
    else
      setPass(true)
  }, [callback])

  return pass
}

export default page_pass
