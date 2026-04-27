// @ts-nocheck
"use client";

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VideoPage({ src }) {
  const router = useRouter()

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'Escape') router.back()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [router])

  return (
    <div id="menu-screen" className="relative w-full h-screen overflow-hidden">
      <video src={src} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
    </div>
  )
}
