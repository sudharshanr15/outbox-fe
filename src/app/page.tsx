'use client';

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

    useEffect(() => {
        console.log(userExists)
    }, [userExists])

    if(!userExists){        
        return (
            <div>
                <UserInputModal isUserExists={isUserExists} />
            </div>
        )
    }

    return (
        <>
        sdf
        </>
    )

}

export default page