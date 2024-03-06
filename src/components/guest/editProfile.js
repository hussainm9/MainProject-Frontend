import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/actions/userAction';
import { toast } from 'react-toastify'
import Profile from '../guest/profile'; // Import Profile component

export default function UpdateProfile() {
    const user = useSelector(state => state.user.user) || { username: '' };
    const [username, setUsername] = useState(user.username || "");
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && user.username) {
            setUsername(user.username);
        }
    }, [user]);

    const handleNameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            await dispatch(updateUser(user._id, username));


            toast.success('successfully updated')
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-start">
                <div className="col-md-4 p-0">
                    <Profile style={{ borderLeft: '0', padding: '0' }} />
                </div>
                <div className="col-md-6">
                    <h2>Update Profile</h2>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={user.email}
                            disabled
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={username}
                                onChange={handleNameChange}
                            />
                        </div>
                        <button className='btn btn-primary'>Save</button>
                    </form>
                </div>
            </div>

        </div>
    );
}
