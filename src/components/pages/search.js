import React, { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import restaurantContext from '../../contextApi/restaurantContext';
import { Link } from 'react-router-dom';
import ControlledCarousel from '../Carousel/carousel';
import Pagination from './pagination';

export default function Display() {
    const { restaurantState } = useContext(restaurantContext);
    const { allRestaurants } = restaurantState;

    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(1);
    const [showDescriptions, setShowDescriptions] = useState([]);

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        if (allRestaurants && allRestaurants.length > 0) {
            const totalPages = Math.ceil(allRestaurants.length / pageSize);
            setTotalPages(totalPages);
            setShowDescriptions(new Array(allRestaurants.length).fill(false)); // Initialize showDescriptions for each restaurant
        }
    }, [allRestaurants, pageSize]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleToggleDescription = (index) => {
        const newShowDescriptions = [...showDescriptions];
        newShowDescriptions[index] = !newShowDescriptions[index]; // Toggle showDescriptions for the clicked restaurant
        setShowDescriptions(newShowDescriptions);
    };

    const truncateDescription = (description, index) => {
        const words = description.split(' ');
        if (words.length > 20) {
            return (
                <React.Fragment>
                    {showDescriptions[index] ? description : `${words.slice(0, 20).join(' ')}...`}
                    <button className="btn btn-link p-0" onClick={() => handleToggleDescription(index)}>
                        {showDescriptions[index] ? 'Read Less' : 'Read More'}
                    </button>
                </React.Fragment>
            );
        }
        return description;
    };

    function handleMap(res) {
        const name = res.name;
        const address = `${res.name}, ${res.address.street},${res.address.area},${res.address.city},${res.address.state},${res.address.pincode}`;
        console.log(name, address);
        const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        console.log(googleMapsLink);
        window.location.href = googleMapsLink;
    }

    return (
        <div>
            <div>
                <ControlledCarousel />
            </div>
            <div className="container mt-4">
                {loading ? (
                    <div className="text-center">
                        <p>Loading...</p>
                    </div>
                ) : (
                    <div className="container">
                        <h2 className='text-center'>Top Rated Restaurants</h2>
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {allRestaurants.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((ele, index) => (
                                <div className="col" key={ele._id}>
                                    <div className="card h-100">
                                        <Link to={`/table/${ele._id}`}>
                                            <img
                                                src={`${ele.image}`}
                                                className="card-img-top"
                                                alt="logo"
                                                style={{
                                                    width: '100%',
                                                    height: '200px',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </Link>
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">Name: {ele.name}</h5>
                                            <p className="card-text">Address: {ele.address.city}, {ele.address.street}</p>
                                            <p className="card-text">
                                                Description: {truncateDescription(ele.description, index)}
                                            </p>
                                        </div>
                                        <div className="card-footer d-grid">
                                            <button className='btn btn-info btn-block' onClick={() => { handleMap(ele) }}>View in Map</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='d-flex justify-content-center mt-4'>
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
