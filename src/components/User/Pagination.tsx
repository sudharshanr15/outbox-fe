import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const page_size = 50;


function Pagination({ totalCount, load_mails }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageStart, setPageStart] = useState(0)
    const [pageEnd, setPageEnd] = useState(0);

    useEffect(() => {
        if(totalCount != 0){
            setPageStart(1)
            setPageEnd(Math.min(page_size, totalCount))
        }else{
            setPageStart(0)
            setPageEnd(0)
        }
        console.log("total count changed")
    }, [totalCount])

    useEffect(() => {
        load_mails(pageStart)
    }, [currentPage])

    function nextPage(){
        if(pageEnd >= totalCount){
            return;
        }
        setCurrentPage(prev => prev + 1)
        let upper_bound = Math.min(pageEnd + page_size, totalCount);
        setPageStart(prev => prev + page_size)
        setPageEnd(upper_bound)
    }

    function prevPage(){
        if(pageStart == 1){
            return;
        }
        setCurrentPage(prev => prev - 1)

        let lower_bound = Math.max(1, pageStart - page_size);
        setPageStart(lower_bound)
        setPageEnd(prev => prev - page_size)
    }

    return (
        <div className='text-sm flex items-center gap-4'>
            <span>
                Showing {pageStart} to {pageEnd} of {totalCount} results
            </span>
            <div>
                <button onClick={prevPage}>
                    <ChevronLeft size={20} />
                </button>
                <button onClick={nextPage} className='ms-4'>
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    )
}

export default Pagination