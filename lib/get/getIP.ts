import publicIp from 'public-ip'
import { useState, useEffect, useCallback } from 'react'

export const getUserIP = (): string => {
  return '1'
}

export const retrieveUserIP = (): string => {
  const [IP, setIP] = useState<string>('')

  const handleGet = useCallback(async () => {
    setIP(await publicIp.v4())
  }, [IP])

  useEffect(() => {
    handleGet()
  }, [handleGet])

  return IP
}
