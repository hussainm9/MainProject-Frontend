import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";

export default function Loading() {
    const loading = useSelector((state) => state.table.loading);
    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(false)
        }, 4000);

        return () => clearTimeout(timer)
    }, []);

    if (!showSpinner)
        return <div className="container">
        <div className="text-center">
            <p>No data found</p>
            <a href="/" class="btn btn-primary">Go To Home Page</a>
        </div>
    </div>
    






    return (
        <div style={{ marginTop: '150px' }}>
            <div className='sweet-loading text-center'>
                <HashLoader
                    color='green'
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>

        </div>
    );
}
