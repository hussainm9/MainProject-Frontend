// EditMenuModal.js
import React, { useState } from 'react';
import { updateMenuItem } from '../../../services/menuService';

function EditMenuModal({ menuItem, handleCloseModal, resId, token, handleMenuItems }) {
  const [servingSize, setServingSize] = useState(menuItem.servingSize);
  const [price, setPrice] = useState(menuItem.price);
  const [image, setImage] = useState(null);

  const handleEditMenu = async () => {
    try {
      const formData = new FormData();
      formData.append('servingSize', servingSize);
      formData.append('price', price);
      if (image) {
        formData.append('image', image);
      }
      //console.log(resId,menuItem._id,token,formData,'edit menu modal');

      const updatedMenuItem = await updateMenuItem(resId, menuItem._id, formData, token);
      handleMenuItems(updatedMenuItem);
      handleCloseModal();
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog" aria-labelledby="editMenuModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editMenuModalLabel">Edit Menu Item</h5>
            <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              <label htmlFor="servingSize">Serving Size:</label>
              <input
                type="text"
                id="servingSize"
                value={servingSize}
                onChange={(e) => setServingSize(e.target.value)}
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="form-control"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleEditMenu}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMenuModal;