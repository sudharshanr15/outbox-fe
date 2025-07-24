import ListMail from '@/components/User/ListMail'
import Search from '@/components/User/Search'
import React from 'react'

async function User({ params }: {
    params: Promise<{user: string}>
}) {

    const { user } = await params

    return (
        <div className="min-h-screen w-full flex justify-center">
            <div className="container w-full m-4">
                <Search />
                <ListMail user={user} />
            </div>
        </div>
    )
}

export default User