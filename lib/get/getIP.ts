import { useState, useEffect } from 'react'
import publicIp from 'public-ip'

const getUserIP = (): string => {
  const [IP, setIP] = useState<string>('')
  useEffect(() => {
    handleGet()
  }, [IP])

  const handleGet = async () => {
    setIP(await publicIp.v4())
  }

  return IP
}

export default getUserIP
