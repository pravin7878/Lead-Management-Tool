import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getLeads } from '../../../store/actions/lead';

const LeadControls = ({ onSort, onFilter, onPageChange, totalPages }) => {
    const [filters, setFilters] = useState({
        status: '',
        assignedTo: '',
        leadSource: '',
    });
    const [sortColumn, setSortColumn] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch()
    
    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
        if (onFilter) onFilter({ ...filters, [name]: value });
    };

    // Handle sorting
    const handleSortChange = (e) => {
        setSortColumn(e.target.value);
        if (onSort) onSort(e.target.value);
    };

    // Handle pagination
    const handlePageChange = (direction) => {
        const newPage = currentPage + direction;
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
            if (onPageChange) onPageChange(newPage);
        }
    };
 useEffect(()=>{
    //  getLeads({
    //      url: `${import.meta.env.VITE_APP_BACKEND_URL}/leads`,
    //      token: user?.user?.token,
    //  }) 
 },[])

    return (
        <div className="p-4 bg-gray-100 rounded-lg flex flex-wrap gap-4 justify-between items-center">
            
            {/* Filters */}
            <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="p-2 border rounded-md w-full md:w-auto"
            >
                <option value="">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
            </select>

            <select
                name="assignedTo"
                value={filters.assignedTo}
                onChange={handleFilterChange}
                className="p-2 border rounded-md w-full md:w-auto"
            >
                <option value="">All Assigned Users</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>

            <select
                name="leadSource"
                value={filters.leadSource}
                onChange={handleFilterChange}
                className="p-2 border rounded-md w-full md:w-auto"
            >
                <option value="">All Sources</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="ads">Ads</option>
            </select>

            {/* Sorting */}
            <select
                name="sort"
                value={sortColumn}
                onChange={handleSortChange}
                className="p-2 border rounded-md w-full md:w-auto"
            >
                <option value="">Sort By</option>
                <option value="nextFollowUpDate">Next Follow-Up Date</option>
                <option value="status">Status</option>
                <option value="leadSource">Lead Source</option>
            </select>

            {/* Pagination */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handlePageChange(-1)}
                    disabled={currentPage === 1}
                    className="p-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="p-2">{currentPage}</span>
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default LeadControls;
