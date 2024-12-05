import React from "react";

const LeadList = ({ leads, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2 hidden md:table-cell">contect n.</th>
                        <th className="border border-gray-300 px-4 py-2 hidden md:table-cell">email</th>
                        <th className="border border-gray-300 px-4 py-2">Assigned To</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody className="sm:text-sm">
                    {leads.map((lead) => (
                        <tr key={lead._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{lead.leadName}</td>
                            <td className="border border-gray-300 px-4 py-2">{lead.status}</td>
                            <td className="border border-gray-300 px-4 py-2 hidden md:table-cell">{lead.contactNumber
}</td>
                            <td className="border border-gray-300 px-4 py-2 hidden md:table-cell">{lead.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{lead.assignedTo === null ? "Not-Assign" : lead.assignedTo}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    className="text-blue-500 hover:underline mr-2"
                                    onClick={() => onEdit(lead)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-500 hover:underline"
                                    onClick={() => onDelete(lead._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeadList;
