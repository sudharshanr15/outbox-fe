import { get_user_mail_by_label, get_user_mails } from '@/utils/account';
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

const label_colors = {
    "All": "bg-white",
    "Interested": "bg-green-600",
    "Not Interested": "bg-gray-500",
    "Spam": "bg-red-600",
    "Out Of Office": "bg-yellow-500",
    "Meeting Booked": "bg-blue-500"
}

const labels = ["All", "Interested", "Not Interested", "Spam", "Out Of Office", "Meeting Booked"]

function MailFilter({ setMails, setTotalCount, load_mails, user }) {
    const [activeLabel, setActiveLabel] = useState(labels[0]);
    const [toggleFilter, setToggleFilter] = useState(false);

    function onFilterToggle(){
        setToggleFilter(prev => !prev)
    }

    function onSelectFilter(label){
        setActiveLabel(label)
        onFilterToggle()

        if(label == "All"){
            load_mails()
        }else{
            get_user_mail_by_label(user, label).then(res => {
                setTotalCount(res.data.data.hits.total.value)
                setMails(res.data.data.hits.hits)
            }).catch(err => console.log(err))
        }
    }

    return (
        <div className="relative inline-block">
            <button className="relative z-10 block px-4 py-2 card flex items-center gap-4 w-full" onClick={onFilterToggle}>
                <span className={`w-3 aspect-square ${label_colors[activeLabel]} inline-block rounded-full`}></span>
                <span className='hidden sm:inline'>{ activeLabel }</span>
                <span>
                <ChevronDown size={20} />
                </span>
            </button>
            <div
                className={`absolute right-0 z-20 w-48 origin-top-right card p-2 ${toggleFilter ? "" : "hidden"}`}
            >
                {labels.map((label, index) => {
                    if(label != activeLabel){
                        return (
                            <button
                                className="text-start w-full block px-4 py-3 text-sm text-light-text capitalize transition-colors duration-300 transform hover:bg-dark-dp2"
                                key={index}
                                onClick={() => onSelectFilter(label)}
                            >
                                <span className={`w-3 aspect-square ${label_colors[label]} inline-block rounded-full me-4`}></span>
                                { label }
                            </button>
                                )
                    }
                })}
            </div>
        </div>
    )
}

export default MailFilter