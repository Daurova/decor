'use client'
import Image from 'next/image'

import {useState, useEffect} from 'react'
import Link from 'next/link'

interface ILogo {
  src: string;
  alt: string;
  width: number;
  height?: number;
}
export function Logo({src, alt, width, height}:ILogo) {
  const [mounted, setMounted] = useState(false) 

  useEffect(() => setMounted(true), [])
  
    if (!mounted) return null // Предотвращаем гидратацию
    //TODO вынести роуты в отдельную функцию
    //TODO сделать width Auto
      console.log('Logo props:', { src, alt, width, height });

  return (
    <Link href="/" className="flex items-center"> 
      <Image
      src={src}
      className="hover:cursor-pointer"
      alt={alt}
      width={width}
      height={height}
      >
      </Image>
    </Link>
  )
}