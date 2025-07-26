'use client';

import Accounts from '@/components/Home/Accounts';
import UserInputModal from '@/components/UserInputModal';
import React, { useEffect, useState } from 'react'

function page() {
    const [userExists, isUserExists] = useState(true)

    useEffect(() => {
        if(localStorage.getItem("users") == undefined){
            isUserExists(false)
        }else{
            isUserExists(true)
        }
    }, [])


    if(!userExists){        
        return (
            <div>
                <UserInputModal userExists={userExists} isUserExists={isUserExists} />
            </div>
        )
    }

    return (
        <Accounts />
    )

}

export default page