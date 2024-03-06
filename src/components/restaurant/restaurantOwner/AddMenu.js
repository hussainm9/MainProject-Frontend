import React, { useContext, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import restaurantContext from '../../../contextApi/restaurantContext';
import { createMenu } from '../../../services/menuService';

const AddMenu = () => {
    const { restaurantState } = useContext(restaurantContext);
    console.log(restaurantState, "resofy");
    const resId = restaurantState.restaurantOwner._id;
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [servingSize, setServingSize] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append('category', category);
        formData.append('isVeg', type);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('servingSize', servingSize);
        if (image) {
            formData.append('image', image);
        }
        console.log(formData);
        const token = localStorage.getItem('token');
        console.log(resId, 'resId');
        const data = await createMenu(resId, formData, token)
        console.log(data);
        setCategory('');
        setType('');
        setName('');
        setPrice('');
        setServingSize('');
        setImage(null);
    };

    function handleImage(e) {
        const file = e.target.files[0];
        setImage(file);
    }

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!category) {
            errors.category = 'Category is required';
            isValid = false;
        }

        if (!type) {
            errors.type = 'Type is required';
            isValid = false;
        }

        if (!name) {
            errors.name = 'Name is required';
            isValid = false;
        }

        if (!price) {
            errors.price = 'Price is required';
            isValid = false;
        }

        if (!servingSize) {
            errors.servingSize = 'Serving Size is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <Card>
                        <CardBody>
                            <h2 className="text-center mb-4">Menu form</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label"><b>Category:</b></label>
                                    <select id="category" className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option value="">Select Category</option>
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Lunch">Lunch</option>
                                        <option value="Dinner">Dinner</option>
                                        <option value="Entrees">Entrees</option>
                                        <option value="Desserts">Desserts</option>
                                        <option value="Beverages">Beverages</option>
                                        <option value="Starters">Starters</option>
                                        <option value="Sandwiches">Sandwiches</option>
                                    </select>
                                    {errors.category && <div className="text-danger">{errors.category}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="type" className="form-label"><b>Type:</b></label>
                                    <select id="type" className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                                        <option value="">Select Type</option>
                                        <option value="Veg">Veg</option>
                                        <option value="Non Veg">Non Veg</option>
                                    </select>
                                    {errors.type && <div className="text-danger">{errors.type}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label"><b>Name:</b></label>
                                    <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label"><b>Price:</b></label>
                                    <input type="text" id="price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    {errors.price && <div className="text-danger">{errors.price}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="servingSize" className="form-label"><b>Serving Size:</b></label>
                                    <input type="number" id="servingSize" className="form-control" value={servingSize} onChange={(e) => setServingSize(e.target.value)} />
                                    {errors.servingSize && <div className="text-danger">{errors.servingSize}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label"><b>Image:</b></label>
                                    <input type="file" id="image" className="form-control" onChange={handleImage} accept="image/*" />
                                </div>
                                <button type="submit" className="btn btn-primary">Add Menu</button>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AddMenu;