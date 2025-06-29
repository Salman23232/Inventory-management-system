'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

interface ProtectRouteProps {
  children: React.ReactNode
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
  const user = useAuthStore((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login') // redirect to login if not authenticated
    }
  }, [user, router])

  // Optional: show loading or null while checking auth
  if (!user) {
    return null
  }

  return <>{children}</>
}

export default ProtectRoute
