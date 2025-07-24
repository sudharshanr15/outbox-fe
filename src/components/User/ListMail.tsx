'use client';

import { get_user_mail_by_label, get_user_mails, load_user_mails } from '@/utils/account';
import React, { use, useEffect, useState } from 'react'
import Search from './Search';
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { get_item } from '@/utils/local_storage';

const label_colors = {
    "All": "bg-white",
    "Interested": "bg-green-600",
    "Not Interested": "bg-gray-500",
    "Spam": "bg-red-600",
    "Out Of Office": "bg-yellow-500",
    "Meeting Booked": "bg-blue-500"
}

const labels = ["All", "Interested", "Not Interested", "Spam", "Out Of Office", "Meeting Booked"]

const page_size = 50;

function ListMail({ user }: {user: string}) {
    user = decodeURIComponent(user)
    const [mails, setMails] = useState([]);
    const [activeLabel, setActiveLabel] = useState(labels[0]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [totalValue, setTotalValue] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageStart, setCurrentPageStart] = useState(0);
    const [currentPageEnd, setCurrentPageEnd] = useState(0);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await load_and_store_mails(user);
            setIsLoading(false);
        })()
    }, [])

    async function load_and_store_mails(user: string){
        const user_mails = await get_user_mails(user)
        console.log(user_mails)
        if(user_mails.success == false){
            // const account = get_item("users")
            // console.log({"users": account.data})
            // let param = {
            //     "users": account.data
            // }
            // const load_mail = await load_user_mails( param )
            // if(load_mail.success == false){
            //     console.error("Failed to load user mails:");
            // }else{
            //     const new_mails = await get_user_mails(user)
            //     if(new_mails.success){
            //         setMails(new_mails.data.data.data.hits.hits);
            //         setTotalValue(new_mails.data.data.data.hits.total.value);
            //     }
            // }
            console.log("error")
        }else{
            setMails(user_mails.data.data.data.hits.hits);
            setTotalValue(user_mails.data.data.data.hits.total.value);
        }
    }

    function onFilterToggle(){
        setIsFilterOpen(prev => !prev)
    }

    function onSelectFilter(el){
        setActiveLabel(el)
        onFilterToggle()

        if(el == "All"){
            get_user_mails(user).then(res => {
                console.log(res.data.data.data.hits.hits)
                setMails(res.data.data.data.hits.hits)
            }).catch(err => console.log(err))
        }else{
            get_user_mail_by_label(user, el).then(res => {
                setMails(res.data.data.data.data.hits.hits)
            }).catch(err => console.log(err))
        }
    }

    useEffect(() => {
        setCurrentPageStart(((currentPage - 1) * page_size) + 1);
        setCurrentPageEnd(Math.min(page_size * currentPage, totalValue));
    }, [currentPage, mails])

    function pageIncrement(){
        if(currentPageEnd >= totalValue){
            return;
        }
        let page = currentPage + 1;
        setCurrentPage(page)
        get_user_mails(user, currentPageEnd).then(res => {
            setMails(res.data.data.data.hits.hits)
        }).catch(err => console.log(err))
    }

    function pageDecrement(){
        if(currentPage <= 1){
            setCurrentPageStart(1)
            return 
        }
        get_user_mails(user, currentPageStart).then(res => {
            setMails(res.data.data.data.hits.hits)
        }).catch(err => console.log(err))


        setCurrentPage(prev => prev - 1)
    }

    return (
        <>
        <Search user={user} setMails={setMails} />
        
        <div className='mt-8'>
            <Link href={"/"} className='flex items-center gap-4 mb-4 underline font-semibold'>
                <span className='inline'>
                    <ArrowLeft size={20} />
                </span>
                <span className='inline'>Mail: { decodeURIComponent(user) }</span>
            </Link>
            <div className="flex items-center justify-between mb-4">
                <div className='text-sm flex items-center gap-4'>
                    <span>Showing {currentPageStart} to {currentPageEnd} of {totalValue} results</span>
                    <div>
                        <button onClick={pageDecrement}>
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={pageIncrement} className='ms-4'>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
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
            {isLoading && <div className='text-center text-light-text mt-8'>Loading...</div>}
            {!isLoading && mails.length == 0 && <div className='text-center text-light-text mt-8'>No mails found</div>}

        </div>
        </>
    )
}

export default ListMail