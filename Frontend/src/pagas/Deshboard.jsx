import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeads } from '../../store/actions/lead';
import { LeadsContener } from './leads/LeadsContener';

const Deshboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    console.log(useSelector(state => state.auth));
    

    useEffect(() => {
        dispatch(
            getLeads({
                url: `${import.meta.env.VITE_APP_BACKEND_URL}/leads`,
                token: user?.user?.token,
            })
        );
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="mx-auto">
                {/* Header */}
                <div className="text-center ">
                    <h3 className="text-2xl text-red-500 font-bold ">
                        Welcome to the Dashboard
                    </h3>
                    <p className="text-gray-600">Manage and view your leads below</p>
                </div>

                {/* Leads Section */}
                <div className="bg-white shadow rounded-lg p-6">
                    <LeadsContener />
                </div>
            </div>
        </div>
    );
};

export default Deshboard;
