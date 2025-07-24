'use client';

import { get_user_mail_by_label, get_user_mails } from '@/utils/account';
import React, { useEffect, useState } from 'react'
import Search from './Search';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const label_colors = {
    "All": "bg-white",
    "Interested": "bg-green-600",
    "Not Interested": "bg-gray-500",
    "Spam": "bg-red-600",
    "Out Of Office": "bg-yellow-500",
    "Meeting Booked": "bg-blue-500"
}

const labels = ["All", "Interested", "Not Interested", "Spam", "Out Of Office", "Meeting Booked"]

function ListMail({ user }: {user: string}) {
    const [mails, setMails] = useState([]);
    const [activeLabel, setActiveLabel] = useState(labels[0]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        get_user_mails(user).then(res => {
            setMails(res.data.data.data.data.hits.hits)
            console.log(res.data.data.data.data.hits.hits)
        }).catch(err => console.log(err))
    }, [])

    function onFilterToggle(){
        setIsFilterOpen(prev => !prev)
    }

    function onSelectFilter(el){
        setActiveLabel(el)
        onFilterToggle()

        if(el == "All"){
            get_user_mails(user).then(res => {
                setMails(res.data.data.data.data.hits.hits)
                console.log(res.data.data.data.data.hits.hits)
            }).catch(err => console.log(err))
        }else{
            get_user_mail_by_label(user, el).then(res => {
                setMails(res.data.data.data.data.hits.hits)
            }).catch(err => console.log(err))
        }
    }

    return (
        <>
        <Search user={user} setMails={setMails} />
        
        <div className='mt-8'>
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between mb-4">
                <Link href={"/"} className='text-sm font-semibold underline flex items-center gap-4'>
                    <span className='inline'>
                        <ArrowLeft size={20} />
                    </span>
                    <span className='inline'>Mail: { decodeURIComponent(user) }</span>
                </Link>
                <div className="relative inline-block">
                    <button className="relative z-10 block px-4 py-2 card flex items-center gap-4 w-full" onClick={onFilterToggle}>
                        <span className={`w-3 aspect-square ${label_colors[activeLabel]} inline-block rounded-full`}></span>
                        <span className='hidden sm:inline'>{ activeLabel }</span>
                        <span>
                        <ChevronDown size={20} />
                        </span>
                    </button>

                    <div
                        className={`absolute right-0 z-20 w-48 origin-top-right card p-2 ${isFilterOpen ? "" : "hidden"}`}
                    >
                        {labels.map((el, index) => {
                            if(el != activeLabel){
                                return (
                                    <button
                                        className="text-start w-full block px-4 py-3 text-sm text-light-text capitalize transition-colors duration-300 transform hover:bg-dark-dp2"
                                        key={index}
                                        onClick={() => onSelectFilter(el)}
                                    >
                                        <span className={`w-3 aspect-square ${label_colors[el]} inline-block rounded-full me-4`}></span>
                                        { el }
                                    </button>
                                        )
                            }
                        })}
                    </div>
                </div>
            </div>
            <table className="card py-0 block">
                <tbody className="block">
                {mails.map((mail, index) => (
                    <tr className="py-4 border-b border-white/20 last:border-0 flex flex-col md:flex-row md:items-center gap-1 w-full" key={index}>
                        <td className={`w-3 aspect-square ${label_colors[mail["_source"]["label"]]} rounded-full me-3`}></td>
                        <td className='max-w-[200px] flex-1 font-semibold text-sm inline-block'>
                        
                            {mail["_source"]["from"][0]["name"]}
                        </td>
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