'use client'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { LOGO } from '../config/constants'
import {useState, useEffect} from 'react'


export function Logo() {
  const [mounted, setMounted] = useState(false) 
  const { theme } = useTheme()
  const src = theme === 'dark'? LOGO.DARK : LOGO.LIGHT

  useEffect(() => setMounted(true), [])
  
    if (!mounted) return null // Предотвращаем гидратацию
  return (
    <Image
      src={src}
      className="hover:cursor-pointer"
      alt={LOGO.ALT}
      width={LOGO.WIDTH}
      height={LOGO.HEIGHT}
    >
    </Image>
  )
}