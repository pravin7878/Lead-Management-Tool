import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdGridView } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import Loading from "../../components/Loading"
import LeadList from './LeadList';
import SearchBar from '../../utils/SearchBar';
import FilterBar from '../../utils/FilterBar';
import LeadControls from './LeadControler';
import { getLeads } from '../../../store/actions/lead';
import { useNavigate } from 'react-router-dom';


export const LeadsContener = () => {
    const { isLodding, isError, result } = useSelector(state => state.leads)
    const [view, setView] = useState("list")
    console.log(useSelector(state => state.leads));
    const [leads, setLeads] = useState([]);
    const [totalPages, setTotalPages] = useState(10); // Example total pages
    const [sortColumn, setsortColumn] = useState({})
    const [filters, setfilters] = useState({})
    const [curruntPage, setcurruntPage] = useState(1)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // console.log(isLoading);
    const hendelEdit = () => {
        console.log("edit");

    }

    const hendelDelete = () => {
        console.log("delete");

    }


    const handleSort = (sortColumn) => {
        console.log('Sort By:', sortColumn);
        // Add sorting logic here
        setsortColumn(sortColumn)
    };

    const handleFilter = (filters) => {
        console.log('Filters:', filters);
        setfilters(filters)
        // Add filter logic here
    };

    const handlePageChange = (page) => {
        console.log('Current Page:', page);
        setcurruntPage(page)
        // Add pagination logic here
    };

    useEffect(()=>{
        dispatch(getLeads())
    },[])
    return (<>
        {/* header */}
        <div className='flex bg-gray-200 justify-between items-center text-center px-3 py-2 rounded-sm'>
            <button onClick={() => navigate("/addnew")} className='bg-red-500 px-2 py-1 rounded-md text-white font-bold'>Add New</button>
            <div className='w-[40%]'>
                <SearchBar />
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm font-bold">View:</span>
                <div className="flex gap-4">
                    <button
                        onClick={() => setView("list")}
                        className={`cursor-pointer hover:text-black ${view === "list" ? "text-black" : "text-gray-400"
                            }`}
                    >
                        <FaListUl size={20} />
                    </button>
                    <button
                        onClick={() => setView("grid")}
                        className={`cursor-pointer hover:text-black ${view === "grid" ? "text-black" : "text-gray-400"
                            }`}
                    >
                        <MdGridView size={24} />
                    </button>
                </div>
            </div>
        </div>
        <LeadControls onFilter={handleFilter} onPageChange={handlePageChange} onSort={handleSort} totalPages={totalPages} />

        {/* content */}
        {isLodding && <Loading />}

        {result?.leads?.length === 0 && <div>
            No document found
        </div>}

        <div>
            {result?.leads && <LeadList leads={result?.leads} onDelete={hendelDelete} onEdit={hendelEdit} />}
        </div>
    </>)
}
