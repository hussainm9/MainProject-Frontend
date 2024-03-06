import { useContext, useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap'; // Import Table component from Reactstrap
import restaurantContext from '../../../contextApi/restaurantContext';
import { deleteTable, fetchTables, updateTable } from '../../../services/tableService';
import './GetTable.css';
function GetTable() {
  const { restaurantState } = useContext(restaurantContext);
  const resId = restaurantState.restaurantOwner._id;
  const [tables, setTables] = useState([]);
  const [modal, setModal] = useState(false);
  const [formValues, setFormValues] = useState({
    noOfSeats: '',
    advanceAmount: ''
  });
  const [tableId, setTableId] = useState('');
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchTablesData() {
      try {
        const tables = await fetchTables(resId);
        setTables(tables);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    }

    fetchTablesData();
  }, [restaurantState, resId]);

  async function handleDelete(id) {
    try {
      await deleteTable(resId, id);
      const updatedTables = tables.filter((ele) => ele._id !== id);
      setTables(updatedTables);
    } catch (error) {
      console.error('Error deleting table:', error);
    }
  }

  function handleEdit(id) {
    const oneTable = tables.find((ele) => ele._id === id);
    setFormValues({
      noOfSeats: oneTable.noOfSeats,
      advanceAmount: oneTable.advanceAmount
    });
    setTableId(id);
    setModal(true);
  }

  const toggle = () => setModal(!modal);
  const handleSubmit = async () => {
    const formData = {
      noOfSeats: formValues.noOfSeats,
      advanceAmount: formValues.advanceAmount
    }
    if (tableId) {
      const updatedTable = await updateTable(resId, tableId, formData, token);
      const updatedTables = tables.map(table => table._id === tableId ? updatedTable : table);
      setTables(updatedTables);
    }
    toggle();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  return (
    <div className="table-container">
      <h2>Tables List</h2>
      <Table bordered>
        <thead>
          <tr>
            <th>Table No</th>
            <th>No. of Seats</th>
            <th>Advance Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((ele) => (
            <tr key={ele._id}>
              <td>{ele.tableNumber}</td>
              <td>{ele.noOfSeats}</td>
              <td>{ele.advanceAmount}</td>
              <td>
                <Button color="danger" onClick={() => handleDelete(ele._id)}>Delete</Button>{' '}
                <Button color="primary" onClick={() => handleEdit(ele._id)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Table</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="noOfSeats">No. of Seats</Label>
              <Input type="number" name="noOfSeats" id="noOfSeats" value={formValues.noOfSeats} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="advanceAmount">Advance Amount</Label>
              <Input type="number" name="advanceAmount" id="advanceAmount" value={formValues.advanceAmount} onChange={handleInputChange} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Save Changes</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default GetTable;