// RestaurantDashboard.js

import React, { useContext, useEffect, useState } from 'react';
import { Button, FormGroup, Input, Label } from 'reactstrap'; // Import Reactstrap components
import restaurantContext from '../../../contextApi/restaurantContext';
import { deleteMenuItem, fetchMenuItems } from '../../../services/menuService';
import EditMenuModal from './EditMenuModal';
import GetTable from './GetTable';
import './Manage.css';

function RestaurantDashboard() {
  const { restaurantState } = useContext(restaurantContext);
  const resId = restaurantState.restaurantOwner._id;
  const token = localStorage.getItem('token');

  const [selectedValue, setSelectedValue] = useState("table");
  const [category, setCategory] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  function handleMenuItems(item) {
    const updatedItems = [...menuItems];
    const index = updatedItems.findIndex((ele) => ele._id === item._id);
    if (index !== -1) {
      updatedItems[index] = { ...item };
    }
    setMenuItems(updatedItems);
  }

  useEffect(() => {
    const fetchMenuItemsData = async () => {
      try {
        const items = await fetchMenuItems(resId);
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItemsData();
  }, [restaurantState, resId]);

  useEffect(() => {
    if (category === 'All') {
      setFilteredMenuItems(menuItems);
    } else {
      setFilteredMenuItems(menuItems.filter((item) => item.category[0] === category));
    }
  }, [category, menuItems]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteMenuItem(resId, itemId);
      setMenuItems(menuItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const toggleEditModal = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setShowEditModal(!showEditModal);
  };

  return (
    <div>
      <div className="radio-buttons">
        <div>
          <Input
            type="radio"
            id="menu"
            name="category"
            value="menu"
            checked={selectedValue === 'menu'}
            onChange={handleRadioChange}
          />
          <Label htmlFor="menu"><b>Menu</b></Label>
        </div>

        <div>
          <Input
            type="radio"
            id="table"
            name="category"
            value="table"
            checked={selectedValue === 'table'}
            onChange={handleRadioChange}
          />
          <Label htmlFor="table"><b>Table</b></Label>
        </div>
      </div>

      {selectedValue === 'menu' && (
        <div className="menu-list">
          <h2>Menu Item List</h2>
          <FormGroup>
            <Label for="category">Category:</Label>
            <Input type="select" name="category" id="category" value={category} onChange={handleCategoryChange}>
              <option value=''>Select category</option>
              <option value="All">All</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Entrees">Entrees</option>
              <option value="Desserts">Desserts</option>
              <option value="Beverages">Beverages</option>
              <option value="Starters">Starters</option>
              <option value="Sandwiches">Sandwiches</option>
            </Input>
          </FormGroup>
          <br />
          <div className="menu-items-container">
            {filteredMenuItems.map((menuItem, index) => (
              <div key={index} className="menu-item">
                <span>{menuItem.name} - {menuItem.price}</span>
                <Button color="primary" onClick={() => toggleEditModal(menuItem)}>Edit</Button>
                <Button color="danger" onClick={() => handleDelete(menuItem._id)}>Delete</Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedValue === 'table' && (<GetTable />)}

      {showEditModal && (
        <EditMenuModal
          menuItem={selectedMenuItem}
          handleCloseModal={toggleEditModal}
          resId={resId}
          token={token}
          handleMenuItems={handleMenuItems}
        />
      )}
    </div>
  );
}

export default RestaurantDashboard;