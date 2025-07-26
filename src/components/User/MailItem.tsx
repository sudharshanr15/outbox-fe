import React from 'react'

const label_colors = {
    "All": "bg-white",
    "Interested": "bg-green-600",
    "Not Interested": "bg-gray-500",
    "Spam": "bg-red-600",
    "Out Of Office": "bg-yellow-500",
    "Meeting Booked": "bg-blue-500"
}

function MailItem({ mail }) {
    return (
        <tr className="py-4 border-b border-white/20 last:border-0 flex flex-col md:flex-row md:items-center gap-1 w-full">
            <td className={`w-3 aspect-square ${label_colors[mail["_source"]["label"]]} rounded-full me-3`}></td>
            <td className='max-w-[200px] flex-1 font-semibold text-sm inline-block'>
            
                {mail["_source"]["from"][0]["name"]}
            </td>
            <td className='flex-1 text-wrap break-all text-sm'>{mail["_source"]["subject"]}</td>
            <td className='text-right text-xs font-semibold'>
                {mail['received'] && <span className='px-3 py-2 bg-green-700 rounded-full'>now</span>}
                {!mail['received'] && new Date(mail["_source"]['date']).toLocaleDateString('en-GB', {"month": "long", day: "numeric"}) }
            </td>
        </tr>
    )
}

export default MailItem