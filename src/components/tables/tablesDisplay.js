import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { asygetTables, clearTableData } from '../../redux/actions/tableAction'
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode'
import Loading from '../loading';
import './tableDisplay.css'

export default function TableDisplay() {
    const { restaurantId } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(asygetTables({ restaurantId }));
        setLoading(false)
        return () => {
            dispatch(clearTableData());
        };
    }, [dispatch, restaurantId]);

    const tableData = useSelector((state) => state.table.data);

    const error = useSelector((state) => state.table.error);
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)
    const userId = decodedToken.id

    if (error) {
        return (
            <div>
                <h2>No tables in this restaurant</h2>
            </div>
        );
    }

    return (
        <div className="container">
            <div className='row'>
                {loading ? (
                    <Loading />
                ) : (
                    tableData.map((ele) => (
                        <div className="col-md-4 mb-4" key={ele._id}>
                            <div className="card">
                                <img
                                    src={`${ele.image}`}
                                    className="card-img-top"
                                    alt="logo"
                                />
                                <div className="card-body" style={{ display: 'flex-row', flexDirection: 'column' }}>
                                    <h5 className="card-title" style={{ margin: 0 }}>TableNo: {ele.tableNumber}</h5>
                                    <p style={{ margin: 0 }}>Advance Amount: {ele.advanceAmount}</p>
                                    <p style={{ margin: 0 }}>No Of Seats: {ele.noOfSeats}</p>
                                    <Link to={`/api/user/${userId}/restaurant/${restaurantId}/table/${ele._id}/booking`} className="btn btn-primary">Book</Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
