import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from 'yup';
import restaurantContext from "../../contextApi/restaurantContext";
import { updatePassword } from "../../services/passwordService";

function UpdatePassword() {
    const { restaurantState } = useContext(restaurantContext);
    const resId = restaurantState.restaurantOwner._id;
    const passwordValidationSchema = Yup.object({
        oldPassword: Yup.string().required().min(8),
        newPassword: Yup.string().required().min(8)
    });

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

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
                const data = await updatePassword(formData, token);
                console.log(data);
                resetForm();
            } catch (e) {
                console.log(e, 'errors');
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={formik.handleSubmit} style={{ border: '2px solid white', padding: '20px', borderRadius: '10px', backgroundColor: '#F8F9FA' }}>
                        <h2 className="text-center mb-4">Update Password</h2>
                        <div className="mb-3">
                            <label htmlFor="oldPassword" className="form-label"><strong>Old Password</strong></label>
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
                            <label htmlFor="newPassword" className="form-label"><strong>New Password</strong></label>
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


// import axios from "axios";
// import { useFormik } from "formik";
// import { useContext, useState } from "react";
// import * as Yup from 'yup';
// import restaurantContext from "../../contextApi/restaurantContext";
// import { updatePassword } from "../../services/passwordService";

// function UpdatePassword(){
//     const {restaurantState} = useContext(restaurantContext)
//     const resId = restaurantState.restaurantOwner._id
//     const passwordValidationSchema = Yup.object({
//         oldPassword: Yup.string().required().min(8),
//         newPassword: Yup.string().required().min(8)
//     });

//     const [showOldPassword, setShowOldPassword] = useState(false);
//     const [showNewPassword, setShowNewPassword] = useState(false);

//     const formik = useFormik({
//         initialValues:{
//             oldPassword:'',
//             newPassword:''
//         },
//         validationOnChange:true,
//         validationSchema: passwordValidationSchema,
//         onSubmit: async function (values,{resetForm}) {
//             console.log(values);
//             const formData = values
//             try{
//                 const token = localStorage.getItem('token')
//                 const data = await updatePassword(formData,token)
//                 console.log(data);
//                 resetForm()

//             }catch(e){
//                 console.log(e,'errors');
//             }

//         }
//     });

//     const toggleShowOldPassword = () => {
//         setShowOldPassword(prevState => !prevState);
//     };

//     const toggleShowNewPassword = () => {
//         setShowNewPassword(prevState => !prevState);
//     };

//     return (
//         <div className="container mt-5">
//             <div className="row justify-content-center">
//                 <div className="col-md-6">
//                     <h2 className="text-center mb-4">Update Password</h2>
//                     <form onSubmit={formik.handleSubmit}>
//                         <div className="mb-3">
//                             <label htmlFor="oldPassword" className="form-label">Old Password</label>
//                             <input
//                                 type={showOldPassword ? 'text' : 'password'}
//                                 className="form-control"
//                                 id="oldPassword"
//                                 name='oldPassword'
//                                 value={formik.values.oldPassword}
//                                 onChange={formik.handleChange}
//                             />
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="checkbox"
//                                     id="showOldPassword"
//                                     checked={showOldPassword}
//                                     onChange={toggleShowOldPassword}
//                                 />
//                                 <label className="form-check-label" htmlFor="showOldPassword">
//                                     Show Password
//                                 </label>
//                             </div>
//                             {formik.errors.oldPassword && <div className="text-danger">{formik.errors.oldPassword}</div>}
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="newPassword" className="form-label">New Password</label>
//                             <input
//                                 type={showNewPassword ? 'text' : 'password'}
//                                 className="form-control"
//                                 id="newPassword"
//                                 name='newPassword'
//                                 value={formik.values.newPassword}
//                                 onChange={formik.handleChange}
//                             />
//                             <div className="form-check">
//                                 <input
//                                     className="form-check-input"
//                                     type="checkbox"
//                                     id="showNewPassword"
//                                     checked={showNewPassword}
//                                     onChange={toggleShowNewPassword}
//                                 />
//                                 <label className="form-check-label" htmlFor="showNewPassword">
//                                     Show Password
//                                 </label>
//                             </div>
//                             {formik.errors.newPassword && <div className="text-danger">{formik.errors.newPassword}</div>}
//                         </div>
//                         <button type="submit" className="btn btn-primary">Submit</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default UpdatePassword;
