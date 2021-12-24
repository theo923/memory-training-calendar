import { useState, useEffect } from 'react'

const getWindowDimensions = () => {
  const isClient = typeof window === 'object'
  if (!isClient)
    return {
      width: 0,
      height: 0,
    }
  const { innerWidth: width, innerHeight: height } = window || global
  return {
    width,
    height,
  }
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
