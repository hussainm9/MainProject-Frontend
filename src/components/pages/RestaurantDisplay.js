import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loading from './loading';
import axiosInstance from '../../config/axios';
import { FcRating } from "react-icons/fc"
import ControlledCarousel from '../Carousel/carousel';
import Pagination from './pagination';

function RestaurantDisplay() {
    const location = useLocation();
    const [listedData, setListedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(1);
    const [expandDescriptions, setExpandDescriptions] = useState([]);

    useEffect(() => {
        if (listedData && listedData.length > 0) {
            const totalPages = Math.ceil(listedData.length / pageSize);
            setTotalPages(totalPages);
            setExpandDescriptions(new Array(listedData.length).fill(false)); // Initialize expandDescriptions for each restaurant
        }
    }, [listedData, pageSize]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    function handleMap(res) {
        const name = res.name;
        const address = `${res.name}, ${res.address.street},${res.address.area},${res.address.city},${res.address.state},${res.address.pincode}`;
        console.log(name, address);
        const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        console.log(googleMapsLink);
        window.location.href = googleMapsLink;
    }

    const handleToggleDescription = (index) => {
        const newExpandDescriptions = [...expandDescriptions];
        newExpandDescriptions[index] = !newExpandDescriptions[index]; // Toggle expandDescriptions for the clicked restaurant
        setExpandDescriptions(newExpandDescriptions);
    };

    const truncateDescription = (description) => {
        const words = description.split(' ');
        if (words.length > 20) { // Changed the condition to check if the description exceeds 20 words
            return words.slice(0, 20).join(' ') + '...';
        }
        return description;
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedRestaurants = listedData.slice(startIndex, endIndex);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance(`/api/getBySearch${location.search}`);
                setListedData(response.data);

                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [location.search]);

    return (
        <div>
            <ControlledCarousel />
            <div className="container mt-4">
                <div className="container">
                    {loading ? (
                        <Loading className='text-center' />
                    ) : (
                        <div className="row">
                            <h2 className='text-center'>Resulted Restaurants</h2>
                            {displayedRestaurants.map((ele, index) => (
                                <div className="col-md-4 mb-4" key={ele._id}>
                                    <div className="card">
                                        <Link to={`/table/${ele._id}`}>
                                            <img
                                                src={`${ele.image}`}
                                                className="card-img-top"
                                                alt="logo"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    maxHeight: '200px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </Link>
                                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column' }}>
                                            <h5 className="card-title" style={{ margin: 0 }}>
                                                Name: {ele.name}
                                            </h5><FcRating />
                                            <p style={{ margin: 0 }}>Address: {ele.address.city}, {ele.address.street}</p>
                                            <p className="card-text" style={{ margin: 0 }}>
                                                Description: {expandDescriptions[index] ? ele.description : truncateDescription(ele.description)}
                                                {ele.description.split(' ').length > 20 && // Changed the condition to check if the description exceeds 20 words
                                                    <button className="btn btn-link p-0" onClick={() => handleToggleDescription(index)}>
                                                        {expandDescriptions[index] ? 'Read Less' : 'Read More'}
                                                    </button>
                                                }
                                            </p>
                                        </div>
                                        <div className="card-footer d-grid">
                                            <button className='btn btn-info btn-block' onClick={() => { handleMap(ele) }}>View in Map</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className='d-flex justify-content-center'>
                                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RestaurantDisplay;
