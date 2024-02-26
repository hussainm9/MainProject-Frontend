import React, { useContext, useState } from 'react';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        console.log(resId,'resId');
        const data = await createMenu(resId,formData,token)
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center mb-4">Menu form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category:</label>
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
                        </div>
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">Type:</label>
                            <select id="type" className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Select Type</option>
                                <option value="Veg">Veg</option>
                                <option value="Non Veg">Non Veg</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price:</label>
                            <input type="number" id="price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="servingSize" className="form-label">Serving Size:</label>
                            <input type="number" id="servingSize" className="form-control" value={servingSize} onChange={(e) => setServingSize(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image:</label>
                            <input type="file" id="image" className="form-control" onChange={handleImage} accept="image/*" />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Menu</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMenu;
