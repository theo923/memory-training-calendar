import publicIp from 'public-ip'
import { useState, useEffect } from 'react'

export const getUserIP = (): string => {
  const [IP, setIP] = useState<string>('')
  useEffect(() => {
    handleGet()
  }, [IP])

  const handleGet = async () => {
    const ip = (await publicIp.v4()) || ''
    setIP(ip)
  }

  return IP
}
