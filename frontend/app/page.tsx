'use client'

import Home from "@/components/custom/Home"
import ProtectRoute from "@/components/custom/ProtectRoute"



export default function HomePage() {
  return (
    <ProtectRoute>
      <Home/>
    </ProtectRoute>
  )
}
