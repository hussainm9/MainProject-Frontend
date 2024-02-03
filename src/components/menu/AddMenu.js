// import React from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.css';
// import Container from 'react-bootstrap/Container';
// import { useFormik } from 'formik';
// import * as Yup from 'yup'
// // import { jwtDecode } from 'jwt-decode'

// export default function AddMenu() {
//     // const token = localStorage.getItem('token');
//     // const decodedToken = token ? jwtDecode(token) : {};
//     // const restaurantId= decodedToken.id || 'default-restaurant-id';
//     const validationSchema = Yup.object({
//         category: Yup.string().required('Category is required'),
//         name: Yup.string().required('Dish Name is required'),
//         price: Yup.number().required('Price is required').positive('Price must be a positive number'),
//         servingSize: Yup.number().required('Serving Size is required').positive('Serving Size must be a positive number'),
//         image: Yup.mixed().required('Image is required'),
//         isVeg: Yup.string().required('Please select Veg or Non-Veg'),
//     })

//     const formik = useFormik({
//         initialValues: {
//             category: '',
//             name: '',
//             price: '',
//             image: '',
//             isVeg: '',
//             servingSize: ''
//         },
//         validationSchema: validationSchema,
//         onSubmit: async (values) => {
//             const formData = new FormData();
//             formData.append('category', values.category);
//             formData.append('name', values.name);
//             formData.append('price', values.price);
//             formData.append('image', values.image);
//             formData.append('isVeg', values.isVeg);
//             formData.append('servingSize', values.servingSize);

//             try {
//                 await validationSchema.validate(values, { abortEarly: false })
//                 await axios.post('http://localhost:3786/api/restarunt/menu', formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                         Authorization: localStorage.getItem('token')
//                     }
//                 })
//                 // console.log(response.data)

//             } catch (e) {
//                 console.error(e);
//             }
//         }
//     });



//     return (
//         <Container >
//             <div className="card p-4" style={{ maxWidth: '500px', border: '1px solid goldenrod', borderRadius: '50px' }}>
//                 <form
//                     style={{ backgroundColor: 'goldenrod', color: 'black', padding: '50px', borderRadius: '50px' }}
//                     onSubmit={formik.handleSubmit}
//                 >
//                     <div className="mb-3 row ">
//                         <label htmlFor='category1' className="col-4 col-form-label">Category</label>
//                         <div className="col-8">
//                             <input
//                                 type="text"
//                                 name='category'
//                                 className="form-control"
//                                 id="category1"
//                                 onChange={formik.handleChange}
//                                 value={formik.values.category}

//                             />

//                         </div>
//                     </div>
//                     <div className="mb-3 row">
//                         <label htmlFor='name1' className="col-4 col-form-label">Dish Name</label>
//                         <div className="col-8">
//                             <input
//                                 type="text"
//                                 name='name'
//                                 className="form-control"
//                                 id="name1"
//                                 onChange={formik.handleChange}
//                                 value={formik.values.name}
//                             />

//                         </div>
//                     </div>
//                     <div className="mb-3 row">
//                         <label htmlFor='price1' className="col-4 col-form-label">Price</label>
//                         <div className="col-8">
//                             <input
//                                 type="number"
//                                 name='price'
//                                 className="form-control"
//                                 id="price1"
//                                 value={formik.values.price}
//                                 onChange={formik.handleChange}
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-3 row">
//                         <label htmlFor='serving1' className="col-4 col-form-label">Serving Size</label>
//                         <div className="col-8">
//                             <input
//                                 type="number"
//                                 name='servingSize'
//                                 className="form-control"
//                                 id="serving1"
//                                 value={formik.values.servingSize}
//                                 onChange={formik.handleChange}
//                             />
//                         </div>
//                     </div>
//                     <div class="form-group">
//                         <label htmlFor="image1">Upload Image</label>
//                         <input
//                             type="file"
//                             name='image'
//                             className="form-control-file"
//                             id="image1"
//                             onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
//                         />
//                     </div>
//                     <div className="mb-3 form-check">
//                         <input
//                             className="form-check-input"
//                             type="radio"
//                             name="isVeg"
//                             id="Radios1"
//                             checked={formik.values.isVeg === 'veg'}
//                             value="veg"
//                             onChange={() => formik.setFieldValue('isVeg', 'veg')}
//                         />
//                         <label className="form-check-label" htmlFor="Radios1">
//                             Veg
//                         </label>
//                     </div>
//                     <div className="mb-3 form-check">
//                         <input
//                             className="form-check-input"
//                             type="radio"
//                             name="isVeg"
//                             id="Radios2"
//                             checked={formik.values.isVeg === 'non-veg'}
//                             value="non-veg"
//                             onChange={() => formik.setFieldValue('isVeg', 'non-veg')}
//                         />
//                         <label className="form-check-label" htmlFor="Radios2">
//                             Non-Veg
//                         </label>
//                     </div>

//                     <button type="submit" className="btn btn-primary"  >Submit</button>
//                 </form >
//             </div>
//         </Container>
//     );
// }
