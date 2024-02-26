import { useContext, useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import restaurantContext from '../../../contextApi/restaurantContext';
import { deleteTable, fetchTables, updateTable } from '../../../services/tableService';

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
      console.log(resId,tableId,formData,token);
      const updatedTable = await updateTable(resId, tableId, formData,token);
      console.log(updatedTable,'handleSubmit updated');
      const id = updatedTable._id
      console.log(tables,'befpre updated tables');

      const index = tables.findIndex((ele,i)=>{
        
        if(ele._id == id){
          return true
        }
      })
      setTables((prevTables) => {
        const updatedTables = [...prevTables]; // Create a copy of the previous tables array
        updatedTables[index] = updatedTable; // Update the element at the specified index
        return updatedTables; // Set the state with the new array
      });
      
      
      // console.log(index,'obj index');
       console.log(tables,'after updated tables');
      // Handle the response if necessary
    }
    toggle();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }
console.log(tables,'tables');
  return (
    <div>
      <h2>Tables</h2>
      <table border='1'>
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
              <td style={{ padding: '10px' }}>{ele.tableNumber}</td>
              <td style={{ padding: '10px' }}>{ele.noOfSeats}</td>
              <td style={{ padding: '10px' }}>{ele.advanceAmount}</td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => handleDelete(ele._id)}>Delete</button>
                <button onClick={() => handleEdit(ele._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
