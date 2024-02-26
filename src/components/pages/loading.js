import React from 'react';
import { HashLoader } from 'react-spinners';
import './loading.css'

const Loading = () => {
    return (
        <div className="loading-container">
            <HashLoader color="#36D7B7" size={50} />
        </div>
    );
}

export default Loading;
