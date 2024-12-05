// components/Error.js
import React from 'react';

const Error = ({ message, onClose }) => {
    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{message}</p>
            <button
                onClick={onClose}
                className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
            >
                Close
            </button>
        </div>
    );
};

export default Error;
