import SocketInit from '@/components/SocketInit'
import ListMail from '@/components/User/ListMail'
import ListMailNew from '@/components/User/ListMailNew'
import { join_mail_room } from '@/utils/socket'
import React from 'react'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: "Mails",
} 

async function User({ params }: {
    params: Promise<{user: string}>
}) {

    const { user } = await params

    return (
        <div className="min-h-screen w-full flex justify-center">
            <div className="container w-full m-4">
                <ListMailNew user={user} />
            </div>
        </div>
    )
}

export default User