'use client'

import { logoutAction } from "@/actions/auth"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
  return (
    <Button 
      variant="destructive" 
      onClick={() => logoutAction()}
    >
      Log Out
    </Button>
  )
}