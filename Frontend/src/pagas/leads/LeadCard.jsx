import React from 'react';

const LeadCard = ({ lead }) => {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">{lead.leadName}</h3>
                <p className="text-sm text-gray-600">{lead.contactNumber}</p>
                <p className="text-sm text-gray-600">{lead.email}</p>
            </div>
            <div>
                <p className="text-sm text-blue-500">{lead.status}</p>
                <p className="text-sm">{lead.nextFollowUpDate}</p>
            </div>
        </div>
    );
};

export default LeadCard;
