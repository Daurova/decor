'use client'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { LOGO } from '../config/constants'
import {useState, useEffect} from 'react'
import Link from 'next/link'


export function Logo() {
  const [mounted, setMounted] = useState(false) 
  const { theme } = useTheme()
  const src = theme === 'dark'? LOGO.DARK : LOGO.LIGHT

  useEffect(() => setMounted(true), [])
  
    if (!mounted) return null // Предотвращаем гидратацию
    //TODO вынести роуты в отдельную функцию
    //TODO сделать width Auto
  return (
    <Link href="/" className="flex items-center"> 
      <Image
      src={src}
      className="hover:cursor-pointer"
      alt={LOGO.ALT}
      width={LOGO.WIDTH}
      height={LOGO.HEIGHT}
      >
      </Image>
    </Link>
  )
}