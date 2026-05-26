import React from 'react'
import { LogoutButton } from '@/components/layout/logoutButton'

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <LogoutButton />
      {children}
    </div>
  )
}
