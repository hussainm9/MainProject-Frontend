// RestaurantDashboard.js

import React, { useContext, useEffect, useState } from 'react';
import restaurantContext from '../../../contextApi/restaurantContext';
import { deleteMenuItem, fetchMenuItems } from '../../../services/menuService';
import EditMenuModal from './EditMenuModal';
import GetTable from './GetTable';
function RestaurantDashboard() {
  const { restaurantState } = useContext(restaurantContext);
  const resId = restaurantState.restaurantOwner._id;
  const token = localStorage.getItem('token');

  const [selectedValue, setSelectedValue] = useState('');
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <input
            type="radio"
            id="menu"
            name="category"
            value="menu"
            checked={selectedValue === 'menu'}
            onChange={handleRadioChange}
          />
          <label htmlFor="menu">Menu</label>
        </div>

        <div>
          <input
            type="radio"
            id="table"
            name="category"
            value="table"
            checked={selectedValue === 'table'}
            onChange={handleRadioChange}
          />
          <label htmlFor="table">Table</label>
        </div>
      </div>

      {selectedValue === 'menu' && (
        <div>
          <h2>Menu Item List</h2>
          <label>
            Category:
            <select value={category} onChange={handleCategoryChange}>
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
            </select>
          </label>
          <br />
          <h3>Menu Items</h3>
          <ul>
            {filteredMenuItems.map((menuItem, index) => (
              <li key={index}>
                {menuItem.name} - {menuItem.price}
                <button onClick={() => handleDelete(menuItem._id)}>Delete</button>
                <button onClick={() => toggleEditModal(menuItem)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedValue === 'table' && (<GetTable/>)}

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


