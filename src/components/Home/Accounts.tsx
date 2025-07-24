import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import UserInputModal from '../UserInputModal'
import { get_user_accounts } from '@/utils/local_storage';

function Accounts() {

    const [accounts, setAccounts] = useState([])
    const [accountModal, setAccountModal] = useState(false);

    useEffect(() => {
        const res = get_user_accounts()
        if(res.success){
            setAccounts(res.data)
            console.log(res.data)
        }
    }, [])

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='container p-4'>
                <div className="flex items-center justify-between mb-4">
                    <h1 className='text-xl md:text-3xl font-semibold'>Your Accounts</h1>
                    <button onClick={() => setAccountModal(prev => !prev)} className='button px-2 md:px-4'>
                        Add Account
                    </button>
                </div>
                <div className="card py-0">
                    {Object.values(accounts).map((acc, index) => (
                        <Link href={"/user/" + acc.user} className='hover:bg-dark-dp3/50 py-4 flex w-full justify-between border-b border-white/20 last:border-0' key={index}>
                            <div>
                                <span className='h-7 aspect-square inline-flex items-center justify-center bg-red-400 rounded-full text-xs text-black font-semibold'>{ acc!.user[0].toUpperCase() }</span>
                                <span className='ms-4'>{ acc.user }</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            { accountModal && <UserInputModal onClose={() => setAccountModal(false)} isUserExists={undefined} /> }
        </div>
    )
}

export default Accounts