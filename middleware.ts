import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Client, Account } from 'appwrite'

export async function middleware(request: NextRequest) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

  const account = new Account(client)

  try {
    const session = await account.get()
    const memberships = await account.listMemberships()
    const isAdmin = memberships.memberships.some((m) => m.teamId === 'admin')

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  } catch (err) {
    console.error('Middleware error:', err)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
