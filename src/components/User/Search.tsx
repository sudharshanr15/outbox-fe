'use client';

import { get_user_mails, search_user_mails } from '@/utils/account';
import React, { useEffect, useRef } from 'react'

function Search({ load_mails, user, setMails, setTotalCount }) {
    const search = useRef(null);

    function onSearch(e: MouseEvent){
        e.preventDefault()
        let input = search.current.value;

        if(input.length == 0){
            load_mails()
        }else{
            search_user_mails(user, search.current.value).then(res => {
                setMails(res.data.data.hits.hits)
                setTotalCount(res.data.data.hits.total.value)
            }).catch(err => console.log(err))
        }
    }

    return (
        <form onSubmit={onSearch}>
            <input type="text" name='search' className='input p-4' placeholder='Search...' ref={search} />
        </form>
    )
}

export default Search