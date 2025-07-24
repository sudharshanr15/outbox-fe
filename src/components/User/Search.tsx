'use client';

import React, { useEffect, useRef } from 'react'

function Search() {
    const search = useRef(null);

    return (
        <div>
            <input type="text" name='search' className='input p-4' placeholder='Search...' ref={search} />
        </div>
    )
}

export default Search