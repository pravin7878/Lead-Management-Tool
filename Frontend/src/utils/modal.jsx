import React from 'react'

export const Modal = ({ sucessHendeler, setShowModal,quation }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg text-center">
                <p>{quation}</p>
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={sucessHendeler} 
                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => setShowModal(false)} 
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}
