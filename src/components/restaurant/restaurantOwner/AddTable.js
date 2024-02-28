import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import restaurantContext from "../../../contextApi/restaurantContext";
import { createTable } from "../../../services/tableService";

function AddTable() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { restaurantState } = useContext(restaurantContext);
    const resId = restaurantState.restaurantOwner._id;
    const token = localStorage.getItem("token");

    const loginValidationSchema = Yup.object({
        tableNumber: Yup.number().required(),
        noOfSeats: Yup.number().required(),
        advanceAmount: Yup.number().required(),
        image: Yup.mixed().required(),
        isAvaliable: Yup.boolean().required(),
    });

    const formik = useFormik({
        initialValues: {
            tableNumber: "",
            noOfSeats: "",
            advanceAmount: "",
            image: null,
            isAvaliable: false,
        },
        validationOnChange: false,
        validationSchema: loginValidationSchema,
        onSubmit: async function (values, { resetForm }) {
            setIsSubmitting(true);
            console.log("hello table");
            console.log(values, "table values");
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 second
            console.log("Submission completed");
            const formData = new FormData();
            formData.append("tableNumber", values.tableNumber.toString());
            formData.append("noOfSeats", values.noOfSeats.toString());
            formData.append("advanceAmount", values.advanceAmount.toString());
            formData.append("image", values.image);
            formData.append("isAvaliable", values.isAvaliable.toString());

            try {
                const data = await createTable(resId, formData, token);
                console.log(data);
                resetForm();
                setIsSubmitting(false);
            } catch (e) {
                console.log(e, "error in adding table");
            }
        },
    });

    function handleImageChange(e) {
        const file = e.target.files[0];
        console.log(file);
        formik.setFieldValue("image", file);
    }

    function handleIsAvaliableChange(e) {
        formik.setFieldValue("isAvaliable", !formik.values.isAvaliable);
    }

    return (
        <div className="container px-4 py-3">
            <div className="border px-4 py-3">
            <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2 className="text-center mb-4">Restaurant Add Table</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label"><b>Table Number</b></label>
                                <input
                                    type="number"
                                    name="tableNumber"
                                    className="form-control"
                                    value={formik.values.tableNumber}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.tableNumber && (
                                    <div className="text-danger">{formik.errors.tableNumber}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>No of seats</b></label>
                                <input
                                    type="number"
                                    name="noOfSeats"
                                    className="form-control"
                                    value={formik.values.noOfSeats}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.noOfSeats && (
                                    <div className="text-danger">{formik.errors.noOfSeats}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Advance Amount</b></label>
                                <input
                                    type="number"
                                    name="advanceAmount"
                                    className="form-control"
                                    value={formik.values.advanceAmount}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.advanceAmount && (
                                    <div className="text-danger">{formik.errors.advanceAmount}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><b>Image</b></label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-control"
                                    name="image"
                                    id="image"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-check-label me-3">
                                    <input
                                        type="radio"
                                        value={true}
                                        checked={formik.values.isAvaliable}
                                        name="isAvaliable"
                                        onChange={handleIsAvaliableChange}
                                    />
                                    <b> Available</b> 
                                </label>
                                <label className="form-check-label">
                                    <input
                                        type="radio"
                                        value={false}
                                        checked={!formik.values.isAvaliable}
                                        name="isAvaliable"
                                        onChange={handleIsAvaliableChange}
                                    />
                                    <b>Not Available</b>
                                </label>
                            </div>
                            <button
                                type="submit"
                                onClick={formik.handleSubmit}
                                disabled={isSubmitting}
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTable;

// import { useFormik } from 'formik';
// import { useContext, useState } from "react";
// import * as Yup from 'yup';
// import restaurantContext from "../../../contextApi/restaurantContext";
// import { createTable } from '../../../services/tableService';


// function AddTable() {
    
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const { restaurantState } = useContext(restaurantContext);
//     const resId = restaurantState.restaurantOwner._id;
//     const token = localStorage.getItem('token');

//     const loginValidationSchema = Yup.object({
//         tableNumber: Yup.number().required(),
//         noOfSeats: Yup.number().required(),
//         advanceAmount: Yup.number().required(),
//         image: Yup.mixed().required(),
//         isAvaliable: Yup.boolean().required()
//     });

//     const formik = useFormik({
//         initialValues: {
//             tableNumber: '',
//             noOfSeats: '',
//             advanceAmount: '',
//             image: null,
//             isAvaliable: false
//         },
//         validationOnChange: false,
//         validationSchema: loginValidationSchema,
//         onSubmit: async function (values, { resetForm }) {
//             setIsSubmitting(true);
//             console.log('hello table');
//             console.log(values, 'table values');
//             await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second
//             console.log('Submission completed');
//             const formData = new FormData();
//             formData.append('tableNumber', values.tableNumber.toString());
//             formData.append('noOfSeats', values.noOfSeats.toString());
//             formData.append('advanceAmount', values.advanceAmount.toString());
//             formData.append('image', values.image);
//             formData.append('isAvaliable', values.isAvaliable.toString());

//             try {
//                 const data = await createTable(resId, formData, token);
//                 console.log(data);
//                 resetForm();
//                 setIsSubmitting(false);
//             } catch (e) {
//                 console.log(e, 'error in adding table');
//             }
//         }
//     });

//     function handleImageChange(e) {
//         const file = e.target.files[0];
//         console.log(file);
//         formik.setFieldValue('image', file);
//     }

//     function handleIsAvaliableChange(e) {
//         formik.setFieldValue('isAvaliable', !formik.values.isAvaliable);
//     }

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-6 offset-md-3">
//                     <h2 className="text-center mb-4">Restaurant Add Table</h2>
//                     <form onSubmit={formik.handleSubmit}>
//                         <div className="mb-3">
//                             <label className="form-label">Table Number</label>
//                             <input
//                                 type='number'
//                                 name='tableNumber'
//                                 className="form-control"
//                                 value={formik.values.tableNumber}
//                                 onChange={formik.handleChange}
//                             />
//                             {formik.errors.tableNumber && <div className="text-danger">{formik.errors.tableNumber}</div>}
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">No of seats</label>
//                             <input
//                                 type='number'
//                                 name='noOfSeats'
//                                 className="form-control"
//                                 value={formik.values.noOfSeats}
//                                 onChange={formik.handleChange}
//                             />
//                             {formik.errors.noOfSeats && <div className="text-danger">{formik.errors.noOfSeats}</div>}
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Advance Amount</label>
//                             <input
//                                 type='number'
//                                 name='advanceAmount'
//                                 className="form-control"
//                                 value={formik.values.advanceAmount}
//                                 onChange={formik.handleChange}
//                             />
//                             {formik.errors.advanceAmount && <div className="text-danger">{formik.errors.advanceAmount}</div>}
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Image</label>
//                             <input
//                                 type='file'
//                                 accept='image/*'
//                                 className="form-control"
//                                 name='image'
//                                 id='image'
//                                 onChange={handleImageChange}
//                             />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-check-label me-3">
//                                 <input
//                                     type='radio'
//                                     value={true}
//                                     checked={formik.values.isAvaliable}
//                                     name='isAvaliable'
//                                     onChange={handleIsAvaliableChange}
//                                 />
//                                 Available
//                             </label>
//                             <label className="form-check-label">
//                                 <input
//                                     type='radio'
//                                     value={false}
//                                     checked={!formik.values.isAvaliable}
//                                     name='isAvaliable'
//                                     onChange={handleIsAvaliableChange}
//                                 />
//                                 Not Available
//                             </label>
//                         </div>
//                         <button type='submit' onClick={formik.handleSubmit} disabled={isSubmitting} className="btn btn-primary">Submit</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddTable;
