import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };
    // ["new", "in-progress", "converted", "closed"],
    return (
        <div className="flex space-x-4">
            <span>
                <p>sort By next follow-up date</p>
                <select >
                    <option value="">Select Order</option>
                    <option value="">Old to New</option>
                    <option value="">New to Old</option>
                </select>
            </span>
            <select
                name="status"
                onChange={handleFilterChange}
                className="p-1 border rounded-md"
            >
                <option value="">select status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in-progress">In-Progress</option>
                <option value="closed">Closed</option>
            </select>
            <select
                name="assignedTo"
                onChange={handleFilterChange}
                className="p-1 border rounded-md"
            >
                <option value="">All Users</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
        </div>
    );
};

export default FilterBar;
