'use client';

import { get_user_mails } from '@/utils/account';
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import MailItem from './MailItem';
import Pagination from './Pagination';
import MailFilter from './MailFilter';
import Search from './Search';
import { useSocket } from '@/app/hooks/useSocket';
import { join_mail_room } from '@/utils/socket';

function ListMailNew({ user }) {

    const [mails, setMails] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const mailsRef = useRef(mails)

    useEffect(() => {
        load_mails(user)
    }, [])

    useEffect(() => {
        const socket = useSocket()
        join_mail_room(socket, btoa(decodeURIComponent(user)));
        
        socket.on("receive-mail", (message) => {
            let mail = message.hits.hits
            console.log(message)
            if(mail.length > 0){
                mail = mail[0];
                mail.received = true;
                setMails([mail, ...mailsRef.current])
            }
        })

        return () => {
            socket.off("receive-mail");
        };
    }, [])

    useEffect(() => {
        mailsRef.current = mails;
    }, [mails])

    async function load_mails(user: string, from = 0){
        const user_mails = await get_user_mails(user, from)
        if(user_mails.success == false){
            console.log("Error fetching emails")
            return
        }

        setTotalCount(user_mails.data.data.hits.total.value)
        setMails(user_mails.data.data.hits.hits)
    }

    return (
        <>
            <Search load_mails={() => load_mails(user)} user={user} setMails={setMails} setTotalCount={setTotalCount} />

            <div className="mt-8">
                <Link href={"/"} className='inline-flex items-center gap-4 mb-4 underline font-semibold'>
                    <span className='inline'>
                        <ArrowLeft size={20} />
                    </span>
                    <span className='inline'>Mail: { decodeURIComponent(user) }</span>
                </Link>
                <div className='flex items-center justify-between mb-4'>
                    <Pagination totalCount={totalCount} load_mails={(from) => load_mails(user, from)} />
                    <MailFilter user={user} load_mails={() => load_mails(user)} setMails={setMails} setTotalCount={setTotalCount} />
                </div>
                <table className="card py-0 block">
                    <tbody className="block">
                        {mails.map((mail, index) => (
                            <MailItem mail={mail} key={index} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListMailNew