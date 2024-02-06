import React, { useContext, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import userContext from '../../contextApi/userContext';
import axios from 'axios';

export default function Profile() {
  const { userState, userDispatch } = useContext(userContext);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
  });

  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setFormData({
      username: userState.userDetails.username,
      email: userState.userDetails.email,
      mobile: userState.userDetails.mobile,
    });
  }, [userState.userDetails]);

  const handleUpdate = () => {
    setIsUpdate(true);
  };

  const handleSave = async () => {
    try {
      
      const userId = userState.userDetails._id;
      console.log(userId);

      const updateUserDetails = await axios.put(
        `http://localhost:3786/api/${userId}/updateProfile`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      setFormData(updateUserDetails.data)
      userDispatch({
        type:({ type: 'CLEAR_DETAILS', payload: updateUserDetails.data })

      })
      userDispatch({
        type: 'UPDATE_DETAILS',
        field: 'userDetails',
        value: updateUserDetails.data,
      });

      setIsUpdate(false); // Reset the update mode
    } catch (error) {
      console.error('Error updating user details:', error);
      setIsUpdate(false)
    }
  }

  return (
    <div className='mb-3 d-flex justify-content-center'>
      <div>
        <h2 className='text-3xl font-semibold text-center my-7'>Profile</h2>
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder='username'
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              disabled={!isUpdate}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder='email'
              value={formData.email}
              disabled
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder='mobile'
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              disabled={!isUpdate}
            />
          </div>
          {isUpdate ? (
            <button type="button" className="btn btn-success" style={{ width: '100%' }} onClick={handleSave}>
              Save
            </button>
          ) : (
            <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={handleUpdate}>
              Update
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
