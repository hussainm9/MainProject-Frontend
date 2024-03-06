import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import moment from 'moment';
import { loadStripe } from '@stripe/stripe-js';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { addMenu, decQuantity } from '../../redux/actions/menuAction';
import { removeMenu } from '../../redux/actions/menuAction';
import { asyncGetMenu } from '../../redux/actions/menuAction';
import { asyncgetOneTable } from '../../redux/actions/tableAction';
import { asyncCreateBooking, createBooking } from '../../redux/actions/bookingAction';
import Loading from '../pages/loading';
import { Dropdown } from 'react-bootstrap'
import OrdersPDF from './orderSummary';

export default function TableBook() {
    const { userId, restaurantId, tableId } = useParams();
    console.log(userId, restaurantId, tableId, 'ids')
    const [isVeg, setIsVeg] = useState(true);
    const [click, setClick] = useState(false);
    const [loading, setLoading] = useState(true)
    const [sortBy, setSortBy] = useState('asc')
    

    const dispatch = useDispatch();
    const tableData = useSelector((state) => state.table.table);
    console.log(tableData.noOfSeats,'seats')
    const menuData = useSelector((state) => state.menu.menu);
    // const bookings = useSelector((state) => state.book);
    // console.log(bookings, 'booking')
    const menu = useSelector((state) => state.menu.selectMenu);

    const table = Array.isArray(tableData) ? tableData : [tableData];
    const send = (e) => {
        dispatch(addMenu(e))
        toast.success('menu add successfully')
        setClick(true)
    }



    const validationSchema = Yup.object().shape({
        startTime: Yup.date().required('Start time is required'),
        endTime: Yup.date()
            .required('End time is required')
            .min(Yup.ref('startTime'), 'End time must be after start time'),
    });

    const formik = useFormik({
        initialValues: {
            startTime: new Date(),
            endTime: new Date(),
            selectedCategory: '',
            selectedDish: ''
        },
        validationOnChange:true,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                // Validate form fields using Yup
                await validationSchema.validate(values, { abortEarly: false });
        
                // Create menu items array
                const menuItems = menu.map(item => ({
                    menuId: item._id,
                    quantity: item.quantity,
                    notes: ''
                }));
        
                // Prepare booking data
                const bookingData = {
                    noOfPeople: tableData.noOfSeats,
                    menuItems: menuItems,
                    startDateTime: values.startTime.toISOString(),
                    endDateTime: values.endTime.toISOString(),
                    totalAmount: totalAmount,
                    userId: userId,
                    restaurantId: restaurantId,
                    tableId: tableId
                };
        
                // Dispatch async action to create booking
                const createdBooking = await dispatch(asyncCreateBooking(bookingData));
                console.log(createdBooking,'create')
        
                
        
                // Make payment using booking data
                await makePayment(createdBooking);
        
                // Reset form and other states if necessary
                formik.resetForm();
                setClick(false);
        
                // Additional actions after successful booking and payment
        
            } catch (error) {
                // Handle validation errors or other errors
                console.error('Error:', error);
                if (error.name === 'ValidationError') {
                    error.errors.forEach(errorMessage => toast.error(errorMessage));
                } else {
                    toast.error('Table already booked for this time slot. Choose another time slot.');
                }
            }
        }
        
    });

    const totalHours = moment(formik.values.endTime).diff(moment(formik.values.startTime), 'hours') + 1;

    useEffect(() => {
        dispatch(asyncgetOneTable({ tableId }));
        dispatch(asyncGetMenu({ restaurantId }));
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);
        

        return () => clearTimeout(timeout);
    }, [dispatch, tableId, restaurantId]);



    const handleRemove = (id) => {
        dispatch(removeMenu(id));
        toast.success('Menu Removed Successfully');
    };

    const handleInc = (ele) => {
        dispatch(addMenu({ ...ele, quantity: ele.quantity + 1 }));
    };

    const handleDec = (ele) => {
        if (ele.quantity > 1) {
            dispatch(decQuantity({ ...ele, quantity: ele.quantity - 1 }));
        } else {
            dispatch(removeMenu(ele._id));
        }
    };
    const calculateTotalAmount = (items) => {
        return items.reduce((total, item) => {
            const price = Number(item.price);
            const quantity = Number(item.quantity);
            return total + (price * quantity);
        }, 0);
    }

    const menuTotal = calculateTotalAmount(menu);
    const tableTotal = totalHours * table[0].advanceAmount;
    const totalAmount = menuTotal + tableTotal;
    console.log(totalAmount, 'total frontp')


    const makePayment = async (bookingCon) => {
        const stripe = await loadStripe("pk_test_51Okol7SGpEFD34rozKCvFhDvv3Nx5Qmmq6AdqBlOXQASEm5Yeplle92xKF46Jx6piaUHnkfjVkJcSo2d9AGt6OBf00bnDIzwiU");
    
        const body = {
            booking: bookingCon,
        };
    
        const headers = {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem('token')
        };
    
        try {
            const response = await fetch('http://localhost:3786/api/payment-checkout', {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });
    
            const session = await response.json();
    
            const result = stripe.redirectToCheckout({
                sessionId: session.id
            });
    
            if (result.error) {
                console.log(result.error);
                toast.error('Error occurred while making payment');
            } else {
                // Payment successful, update payment status
                await fetch('http://localhost:3786/api/payment-update', {
                    method: "PUT",
                    headers: headers,
                    body: JSON.stringify({ transactionId: session.id })
                });
                toast.success('Payment successful');
                
            }
        } catch (error) {
            console.error(error);
            toast.error('Error occurred while making payment');
        }
    }

    const handleSortChange = (value) => {
        setSortBy(value);
    };

    const sortedMenuData = menuData.sort((a, b) => {
        if (sortBy === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    })



    return (
        <div>
            <h2>This is the page for booking the table</h2>
            <div className='row'>
                
                <div className='col-md-6'>
                    <h2>Menu Listing</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                type='radio'
                                name='inlineRadioOptions'
                                id='inlineRadio1'
                                value='Veg'
                                checked={isVeg}
                                onChange={() => setIsVeg(true)}
                            />
                            <label className='form-check-label' htmlFor='inlineRadio1'>
                                Veg
                            </label>
                        </div>
                        <div className='form-check'>
                            <input
                                className='form-check-input'
                                type='radio'
                                name='inlineRadioOptions'
                                id='inlineRadio2'
                                value='Non Veg'
                                checked={!isVeg}
                                onChange={() => setIsVeg(false)}
                            />
                            <label className='form-check-label' htmlFor='inlineRadio2'>
                                Non-Veg
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-auto">
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm">
                                        Sort By: {sortBy === 'asc' ? 'Price Low To High' : 'Price High To Low'}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleSortChange('asc')}>Price Low To High</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleSortChange('desc')}>Price High To Low</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>

                    </div>
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="row mt-4">
                            {sortedMenuData
                                .filter(item => isVeg ? item.isVeg === 'Veg' : item.isVeg === 'Non Veg')
                                .map((ele) => (
                                    <div className="col-md-4 mb-4" key={ele._id}>
                                        <div className="card">
                                            <img
                                                src={`${ele.image}`}
                                                className="card-img-top"
                                                alt="menu"
                                                style={{ height: '200px', objectFit: 'cover' }} // Set a fixed height and ensure images cover the space
                                            />
                                            <div className="card-body" style={{ display: 'flex-row', flexDirection: 'column' }}>
                                                <h5 className="card-title" style={{ margin: 0 }}>{ele.name}</h5>
                                                <p style={{ margin: 0 }}>Description: {ele.description}</p>
                                                <p style={{ margin: 0 }}>Price: {ele.price}</p>
                                                <button className="btn btn-primary" onClick={() => send(ele)}>
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                        </div>
                    )}

                </div>
                <div className='col-md-6 border border-3'>
                    <h2>Book</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='form-outline datetimepicker'>
                            <label htmlFor='startTime' className='form-label'>
                                Select start time:
                            </label>
                            <DateTimePicker
                                id='startTime'
                                name='startTime'
                                value={formik.values.startTime}
                                onChange={value => formik.setFieldValue('startTime', value)}
                            />
                        </div>
                        <div className='form-outline datetimepicker'>
                            <label htmlFor='endTime' className='form-label'>
                                Select end time:
                            </label>
                            <DateTimePicker
                                id='endTime'
                                name='endTime'
                                value={formik.values.endTime}
                                onChange={value => formik.setFieldValue('endTime', value)}
                            />
                        </div>
                        {table.map(ele => (
                            <div key={ele._id}>

                                <label >Number Of Seats: {ele.noOfSeats}</label>
                                <br />
                                <label>Advance Amount: {totalHours * ele.advanceAmount}</label>

                            </div>
                        ))}
                        {click && (
                            <div >
                                <div className='card-continer '>
                                    <div className='card-header rounded' style={{ backgroundColor: 'indigo', color: 'white', padding: '0.25rem', width: '100%' }}>
                                        <h5>Total Menus{menu.length > 0 ? `(${menu.length})` : ""}</h5>
                                    </div>
                                    <div className='card-body-responsive'>
                                        <div className="table-responsive">
                                            <table className='table cart-table mb-0'>
                                                <thead>
                                                    <tr className='text-center'>
                                                        <th scope='col'>Action</th>
                                                        <th scope='col'>Dish</th>
                                                        <th scope='col'>Name</th>
                                                        <th scope='col'>Price</th>
                                                        <th scope='col'>Qty</th>
                                                        <th scope='col' className='text-right'><span id='amount' className='amount'>Total menu cost</span></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {menu.map(ele => (
                                                        <tr key={ele._id} className='text-center'>
                                                            <td>
                                                                <button type='button' className='delete btn btn-outline-danger btn-sm'>
                                                                    <i className='bi bi-trash mr-2' onClick={() => handleRemove(ele._id)}></i>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <img src={`${ele.image}`} alt='Dish' style={{ maxWidth: '30px', maxHeight: '80px' }} /> {/* Set maximum width and height */}
                                                            </td>
                                                            <td>{ele.name}</td>
                                                            <td>{ele.price}</td>
                                                            <td>
                                                                <div className='input-continer d-inline'>
                                                                    <button type='button' className='button-qty btn btn-outline-primary btn-sm'>
                                                                        <i className='bi bi-dash' onClick={ele.quantity <= 1 ? () => { handleRemove(ele._id) } : () => handleDec(ele)}></i>
                                                                    </button>
                                                                    <input type='text' className='form-control form-control-sm rounded-pill text-center d-inline ' style={{ width: '50px' }} value={ele.quantity} disabled />
                                                                    <button type='button' className='button-qty btn btn-outline-primary btn-sm'>
                                                                        <i className='bi bi-plus' onClick={() => handleInc(ele)}></i>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td>{ele.quantity * ele.price}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>

                                                <tfoot>
                                                    <tr>
                                                        <td className='continer'>
                                                            <>
                                                                <p className='text-left'>Menu Total: <span className='ml-2 mr-2'>{menuTotal}</span></p>
                                                                <p className='text-center'>Table Total: <span className='ml-2 mr-2'>{tableTotal}</span></p>
                                                                <p className='text-right'>Table Amount: <span className='ml-2 mr-2'>{totalAmount}</span></p>
                                                            </>

                                                            <button type='submit' className='btn btn-success  bottom-0 end-0' >Book</button>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}