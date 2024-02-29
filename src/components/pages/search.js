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

    const truncateDescription = (description) => {
        const words = description.split(' ');
        if (words.length > 20) { // Changed the condition to check if the description exceeds 20 words
            return words.slice(0, 20).join(' ') + '...';
        }
        return description;
    };

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
                                                Description: {showDescriptions[index] ? ele.description : truncateDescription(ele.description)}
                                                {ele.description.split(' ').length > 20 && // Changed the condition to check if the description exceeds 20 words
                                                    <button className="btn btn-link p-0" onClick={() => handleToggleDescription(index)}>
                                                        {showDescriptions[index] ? 'Read Less' : 'Read More'}
                                                    </button>
                                                }
                                            </p>
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
