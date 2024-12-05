import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeads } from '../../store/actions/lead';

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setSearch(e.target.value);
       setTimeout(()=>{
           dispatch(getLeads({
               url: `${import.meta.env.VITE_APP_BACKEND_URL}/leads?search=${search}`,
               token: user?.user?.token,
           }))
       },400)
    };

    return (
        <input
            type="text"
            placeholder="Search by name, email, or contact..."
            value={search}
            onChange={handleChange}
            className="px-2 py-1 border-2 rounded-md w-full border-red-300"
        />
    );
};

export default SearchBar;
