import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { message } from 'antd';
import { jwtDecode } from "jwt-decode"
import { updatePassword } from "../../services/passwordService";
import restaurantContext from "../../contextApi/restaurantContext";
import Profile from "../guest/profile";

function UpdatePassword() {
    const { restaurantState } = useContext(restaurantContext);
    const resId = restaurantState.restaurantOwner._id;
    const passwordValidationSchema = Yup.object({
        oldPassword: Yup.string().required().min(''),
        newPassword: Yup.string().required().min(8)
    });

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const token = jwtDecode(localStorage.getItem('token'))

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: ''
        },
        validationOnChange: true,
        validationSchema: passwordValidationSchema,
        onSubmit: async function (values, { resetForm }) {
            console.log(values);
            const formData = values;
            try {
                const token = localStorage.getItem('token');
                await updatePassword(formData, token);
                resetForm();
                message.success('Password changed successfully');
            } catch (e) {
                console.log(e, 'errors');
                message.error('Something went wrong!');
            }
        }
    });

    const toggleShowOldPassword = () => {
        setShowOldPassword(prevState => !prevState);
    };

    const toggleShowNewPassword = () => {
        setShowNewPassword(prevState => !prevState);
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                {token.role === 'guest' ? (
                    <div className="col-md-4 p-0">
                        <Profile />
                    </div>
                ) : null}
                <div className="col-md-5">
                    <h2 className="text-center mb-4">Update Password</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="oldPassword" className="form-label">Old Password</label>
                            <input
                                type={showOldPassword ? 'text' : 'password'}
                                className="form-control"
                                id="oldPassword"
                                name='oldPassword'
                                value={formik.values.oldPassword}
                                onChange={formik.handleChange}
                            />
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="showOldPassword"
                                    checked={showOldPassword}
                                    onChange={toggleShowOldPassword}
                                />
                                <label className="form-check-label" htmlFor="showOldPassword">
                                    Show Password
                                </label>
                            </div>
                            {formik.errors.oldPassword && <div className="text-danger">{formik.errors.oldPassword}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                className="form-control"
                                id="newPassword"
                                name='newPassword'
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                            />
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="showNewPassword"
                                    checked={showNewPassword}
                                    onChange={toggleShowNewPassword}
                                />
                                <label className="form-check-label" htmlFor="showNewPassword">
                                    Show Password
                                </label>
                            </div>
                            {formik.errors.newPassword && <div className="text-danger">{formik.errors.newPassword}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdatePassword;
