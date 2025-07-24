'use client';

import { get_user_mails } from '@/utils/account';
import React, { useEffect, useState } from 'react'
import Search from './Search';

function ListMail({ user }: {user: string}) {
    const [mails, setMails] = useState([]);

    useEffect(() => {
        get_user_mails(user).then(res => {
            setMails(res.data.data.data.data.hits.hits)
            console.log(res.data.data.data.data.hits.hits)
        }).catch(err => console.log(err))
    }, [])

    return (
        <>
        <Search user={user} setMails={setMails} />
        
        <div className='mt-8'>
            <table className="card py-0 block">
                <tbody className="block">
                {mails.map((mail, index) => (
                    <tr className="py-4 border-b border-white/20 last:border-0 flex flex-col md:flex-row md:items-center gap-2 w-full" key={index}>
                        <td className='max-w-[200px] flex-1 font-semibold text-sm'>{mail["_source"]["from"][0]["name"]}</td>
                        <td className='flex-1 text-wrap break-all text-sm'>{mail["_source"]["subject"]}</td>
                        <td className='text-right text-xs font-semibold'>{ new Date(mail["_source"]['date']).toLocaleDateString('en-GB', {"month": "long", day: "numeric"}) }</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default ListMail