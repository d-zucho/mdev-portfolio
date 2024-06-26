'use client'

import { NavLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Navigation = () => {
  const [isRouting, setIsRouting] = useState<boolean>(false)
  const path = usePathname()
  const [prevPath, setPrevPath] = useState<React.SetStateAction<string>>('/')

  useEffect(() => {
    if (prevPath !== path) {
      setIsRouting(true)
    }
  }, [path, prevPath])

  useEffect(() => {
    if (isRouting) {
      setPrevPath(path)
      const timeout = setTimeout(() => {
        setIsRouting(false)
      }, 1200)

      return () => clearTimeout(timeout) // this is a cleanup function
    }
  }, [isRouting])

  return (
    <div
      className='absolute z-50 -bottom-20 w-1/2 md:w-[20%] max-h-[150px] rounded-full flex justify-between items-center border border-white py-7'
      style={{ left: '20%' }}
    >
      {NavLinks.map((nav) => (
        <Link key={nav.name} href={nav.link} className='mb-16 pl-4 min-w-[20%]'>
          <nav.icon
            className={`w-[24px] h-[24px] ${
              path === nav.name ? 'text-purple-800' : 'text-white'
            }`}
          />
        </Link>
      ))}
    </div>
  )
}

export default Navigation
