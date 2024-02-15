import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { asyncGetMenu } from '../../redux/actions/menuAction';
import * as Yup from 'yup';
import { asyncgetOneTable } from '../../redux/actions/tableAction';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import './tableBook.css';

export default function TableBook() {
    const { tableId } = useParams();
    const { restaurantId } = useParams();

    const tableData = useSelector((state) => state.table.table);
    // const menuData = useSelector((state) => state.menu);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncgetOneTable({ tableId }));
        dispatch(asyncGetMenu({ restaurantId }));
    }, [dispatch, tableId, restaurantId]);

    const table = Array.isArray(tableData) ? tableData : [tableData];




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
            noOfSeats: '',
            isVeg: '',
            selectedType: '',
            selectedCategory: '',
            selectedDish: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('Form submitted with values:', values);
        },
    });
    const totalHours = moment(formik.values.endTime).diff(moment(formik.values.startTime), 'hours') + 1;

    return (
        <div className="text-center">
            <h2>This is the page for booking the table</h2>
            <hr />
            <div className='row'>
                <div className='col-md-5'>
                    {table.map(ele => (
                        <div key={ele._id} className="table-item">
                            <h2>Table No: {ele.tableNumber}</h2>
                            <img src={`http://localhost:3786/upload/images/${ele.image}`} alt='table' className='bigimg' />
                        </div>
                    ))}
                </div>
                <div className='col-md-7'>
                    <h2>Book</h2>
                    <hr />

                    <div className="form-outline datetimepicker">
                        <label htmlFor="startTime" className="form-label">Select start time:</label>
                        <DateTimePicker
                            id="startTime"
                            name="startTime"
                            value={formik.values.startTime}
                            onChange={(value) => formik.setFieldValue('startTime', value)}
                        />
                    </div>

                    <div className="form-outline datetimepicker">
                        <label htmlFor="endTime" className="form-label">Select end time:</label>
                        <DateTimePicker
                            id="endTime"
                            name="endTime"
                            value={formik.values.endTime}
                            onChange={(value) => formik.setFieldValue('endTime', value)}
                        />
                    </div>

                    {table.map(ele => (
                        <div key={ele._id}>
                            <label>Number Of Seats: {ele.noOfSeats}</label><br />
                            <label>Advance Amount :{totalHours * ele.advanceAmount}</label>
                        </div>
                    ))}
                    <div className="text-center"> 
                        <button>Continue</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
