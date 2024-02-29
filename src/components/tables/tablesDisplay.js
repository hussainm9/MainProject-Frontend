import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { asygetTables, clearTableData } from '../../redux/actions/tableAction'
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode'
import Loading from '../loading';
import './tableDisplay.css'
import Pagination from '../pages/pagination';
import ControlledCarousel from '../Carousel/carousel';
import { Dropdown } from 'react-bootstrap';

export default function TableDisplay() {
    const { restaurantId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const tableData = useSelector((state) => state.table.data);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(1);
    const [userId, setUserId] = useState(null);
    const [sortBy, setSortBy] = useState('asc'); // Default sorting order

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        } else {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token)
            setUserId(decodedToken.id);
        }
    }, [navigate]);

    useEffect(() => {
        if (tableData && tableData.length > 0) {
            const totalPages = Math.ceil(tableData.length / pageSize);
            setTotalPages(totalPages);
        }
    }, [tableData, pageSize])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(asygetTables({ restaurantId }));
        setLoading(false)
        return () => {
            dispatch(clearTableData());
        };
    }, [dispatch, restaurantId]);

    const error = useSelector((state) => state.table.error);

    const handleSortChange = (value) => {
        setSortBy(value);
    };

    const sortedTableData = tableData.sort((a, b) => {
        if (sortBy === 'asc') {
            return a.advanceAmount - b.advanceAmount;
        } else {
            return b.advanceAmount - a.advanceAmount;
        }
    });

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedTables = sortedTableData.slice(startIndex, endIndex);

    if (!localStorage.getItem('token')) {
        return (
            <div>
                <h2>Please log in to view tables</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2>No tables in this restaurant</h2>
            </div>
        );
    }

    return (
        <div>
            <ControlledCarousel />
            <div className="container mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-auto ">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size='sm'>
                                    Sort By: {sortBy === 'asc' ? 'Price Low To High' : 'Price High To Low'}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleSortChange('asc')}>Price Low To High</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSortChange('desc')}>Price High To Low</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    {loading ? (
                        <Loading className='text-center' />
                    ) : (
                        <div className="row">
                            <h2 className='text-center'>Resulted Restaurants</h2>
                            {displayedTables.map((ele) => (
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
                                            <h5 className="card-title" style={{ margin: 0 }}>TableNo: {ele.tableNumber}</h5>
                                            <p style={{ margin: 0 }}>Advance Amount: {ele.advanceAmount}</p>
                                            <p style={{ margin: 0 }}>No Of Seats: {ele.noOfSeats}</p>
                                            <Link to={`/api/user/${userId}/restaurant/${restaurantId}/table/${ele._id}/booking`} className="btn btn-primary">Book</Link>
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
