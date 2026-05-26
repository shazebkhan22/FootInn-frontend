import React from 'react'
import { LogoutButton } from '@/components/layout/logoutButton'

export default function TurfAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <LogoutButton />
      {children}
    </div>
  )
}
