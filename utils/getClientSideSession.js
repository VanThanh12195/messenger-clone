'use client'

import { useSession } from "next-auth/react"


export default function getClientSideSession() {

    const { data: session } = useSession();


  return session
}
