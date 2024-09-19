import { useState, useEffect } from 'react'
import { Table, IconButton, Input, DatePicker, InputNumber, Pagination } from 'rsuite';
import { VscEdit, VscSave, VscRemove } from 'react-icons/vsc';
import axios from 'axios';
import Button from '../../components/Button';
import c from './ServiceTable.module.css'
import notify from '@/app/utils/notifications';

const { Column, HeaderCell, Cell } = Table;

const styles = `
.table-cell-editing .rs-table-cell-content {
  padding: 4px;
}
.table-cell-editing .rs-input {
  width: 100%;
}
`;

// need to set up the display of the incomes - 
//set up the correct usage of the setIsIncome in the buttons and where it needs to change so it updates the data correctly.
// on fetchdata and fetchIncome ensure that the isIncome is set correctly. 


export default function ServiceTable({setIsUpdated, isUpdated}) {
const [serviceData, setServiceData] = useState([]);
const [isNewItem, setIsNewItem] = useState(false);
const [page, setPage] = useState(1);
const [limit, setLimit] = useState(10); // Items per page
const [totalPages, setTotalPages] = useState(1);
const [incomeData, setIncomeData] = useState([])
const [isIncome, setIsIncome] = useState(false);
const [asc, setAsc] = useState(false)

useEffect(() => {
  fetchData(page, limit);
}, [page, limit, isUpdated]);

  // gets Services orders by default
  async function fetchData(page=1, limit=10) {
   const res = await axios.get('/api/services', {
      params: {
        page,
        limit
      }
    });

    const incomeRes = await axios.get('/api/income', {
      params: {
        page,
        limit
      }
    });

    if(!res.data.services) return 

    const services = res.data.services.map(service => ({
      ...service,
      date: new Date(service.date), // Convert date string to Date object
    }));

    const income = incomeRes.data.incomes.map(income => ({
      ...income,
      date: new Date(income.date), // Convert date string to Date object
    }));

    // Sort by date in descending order
    const sortedServices = services.sort((a, b) => b.date - a.date);
    const sortedIncome = income.sort((a, b) => b.date - a.date);
    setIncomeData(sortedIncome)
    setServiceData(sortedServices);
    setTotalPages(Math.ceil(res.data.totalCount / limit)); 
  }

  const handleChange = (_id, key, value) => {
    // const nextData = Object.assign([], isIncome ? incomeData : serviceData); // copies data to the empty array basically
    const nextData = [...(isIncome ? incomeData : serviceData)];
    nextData.find(item => item._id === _id)[key] = value; // returns object and updates with [key] = value
    isIncome ? setIncomeData(nextData) : setServiceData(nextData);
 
  };

  // refactored edit state
  const handleEdit = async (_id) => {
    // const nextData = Object.assign([], serviceData);
    const nextData = [...(isIncome ? incomeData : serviceData)];
    const activeItem = nextData.find(item => item._id === _id);

    if(!activeItem) {
      console.log(`Item with _id${_id} not found`)
      return;
    }
    activeItem.status = activeItem.status ? null : 'EDIT';

    isIncome ? setIncomeData(nextData) : setServiceData(nextData);
  };

  // refactored state and route
  const handleRemove = async (_id) => {
    const type = isIncome ? 'income' : 'services';
    const updateData = (isIncome ? incomeData : serviceData).filter(item => item._id !== _id);

    if(isIncome){
      setIncomeData(updateData)
    }else{
      setServiceData(updateData)
    }
    try {
      await axios.delete(`/api/${type}`, {
        data: { _id }
      })
      notify('success', isIncome ? 'Income entry removed successfully!' : 'Service order removed successfully!');
      setIsUpdated(!isUpdated);
    } catch (error) {
      console.log(error.message)
      notify('error', "Something went wrong, please try again!")
    }
  };

  // If new Saves if not New Updates, PUT, POST link to functions
  async function saveItemOnServer(item){
    if(isNewItem){
      // saveNewItemOnServer(item)
      saveOrderOnServer(item)
      console.log('saveNewItemOnServer')
    }else{
      // updateItemOnServer(item)
      updateOnServer(item)
      console.log('updateItemOnServer')
    }
    setIsNewItem(false)
    setIsIncome(false);
  }

  // Saves order on server POST 
  async function saveOrderOnServer(item){
    const type = isIncome ? 'income' : 'services';
    try {
      const res = await axios.post(`/api/${type}`, item)
      console.log(res)
      if(res.status === 200){
        notify('success', 'Service order added successfully!');
        setIsUpdated(!isUpdated);
      }else{
        notify('error', 'Something went wrong. Please Try again!');
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  async function updateOnServer(item){
    const type = isIncome ? 'income' : 'services';
    try {
      const res = await axios.put(`/api/${type}`, item)
      console.log(res)
      if(res.status === 200){
        notify('success', isIncome ? 'Income entry updated successfully!' : 'Service order updated successfully!');
        setIsUpdated(!isUpdated);
      } else{
        notify('error', 'Something went wrong. Please Try again!');
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  // handles any page change clickes from links etc.
  const handleChangePage = (page) => {
    setPage(page);
  };


  return (
    <>
      <style>{styles}</style>
      <div className={c.btnCont}>
        <div className={c.leftBlock}>
          <Button
            size='medium'
            onClick={() => {
              setIsIncome(false);
              setServiceData([
                { id: serviceData.length + 1, vendor: '', service: '', price: 0, date: new Date, status: 'EDIT' },
                ...serviceData
              ]);
              setIsNewItem(true);
            }}
          >
            Add Service Order
          </Button>

          <Button
            size='medium'
            onClick={async () => {
              setIsIncome(true);
              setIncomeData( [
                { id: incomeData.length + 1, vendor: '', service: '', price: 0, date: new Date, status: 'EDIT' },
                ...incomeData
              ]);
              setIsNewItem(true);
            }}
          >
            +Add Income
          </Button>
        </div>

        <div className={c.rightBlock}>
          <Button size='medium' onClick={() => setIsIncome(false)}>Services</Button>
          <Button size='medium' onClick={() => setIsIncome(true)}>Income</Button>
        </div>

      </div>

      <hr />
      <Table 
        height={420} 
        data={isIncome ? incomeData : serviceData}
       >

        {/* <Column flexGrow={1} >
          <HeaderCell>id</HeaderCell>
          <Cell
            dataKey="id"
            dataType="number"
            onChange={handleChange}
            onEdit={handleEdit}
          />
        </Column> */}

        <Column width={200}>
          <HeaderCell>Vendor</HeaderCell>
          <EditableCell
            dataKey="vendor" 
            dataType="string"
            onChange={handleChange}
            onEdit={handleEdit}
          />
        </Column>

        <Column width={200}>
          <HeaderCell>Service</HeaderCell>
          <EditableCell
            dataKey="service" 
            dataType="string"
            onChange={handleChange}
            onEdit={handleEdit}
          />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>price</HeaderCell>
          <EditableCell
            dataKey="price"
            dataType="number"
            onChange={handleChange}
            onEdit={handleEdit}
            // className={c.expensePrices}
          />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>date</HeaderCell>
          <EditableCell
            dataKey="date"
            dataType="date"
            onChange={handleChange}
            onEdit={handleEdit}
          />
        </Column>

        <Column width={100}>
          <HeaderCell>Action</HeaderCell>
          <ActionCell dataKey="id" onSave={saveItemOnServer} onEdit={handleEdit} onRemove={handleRemove} />
        </Column>
      </Table>
      <div className={c.paginationContainer}>
        <Pagination
          prev 
          next
          // first
          // last
          ellipsis
          boundaryLinks
          pages={totalPages}
          activePage={page}
          onSelect={handleChangePage}
          maxButtons={5}
        />
      </div>

    </>
  );
};

function toValueString(value, dataType) {
  return dataType === 'date' ? value?.toLocaleDateString() : value;
}

const fieldMap = {
  string: Input,
  number: InputNumber,
  date: DatePicker
};

const EditableCell = ({ rowData, dataType, dataKey, onChange, onEdit, className, ...props }) => {
  const editing = rowData.status === 'EDIT';

  const Field = fieldMap[dataType];
  const value = rowData[dataKey];
  const text = toValueString(value, dataType);

  return (
    <Cell
      {...props}
      className={editing ? 'table-cell-editing' : className}
      datatype={dataType}
      onDoubleClick={() => {
        onEdit?.(rowData._id);
        // console.log(rowData._id);
      }}
    >
      {editing ? (
        <Field
          defaultValue={value}
          onChange={value => {
            onChange?.(rowData._id, dataKey, value);
          }}
        />
      ) : (
        text
      )}
    </Cell>
  );
};

const ActionCell = ({ rowData, dataKey, onEdit, onRemove, onSave, ...props }) => {
  return (
    <Cell {...props} style={{ padding: '6px', display: 'flex', gap: '4px' }}>
      <IconButton
        appearance="subtle"
        icon={rowData.status === 'EDIT' ? <VscSave  /> : <VscEdit />}
        onClick={() => {
          if(rowData.status === 'EDIT') {
            // console.log('saving...')
            onSave(rowData)
          }
          onEdit(rowData._id);
        }}
      />
      <IconButton
        appearance="subtle"
        icon={<VscRemove />}
        onClick={() => {
          onRemove(rowData._id);
          console.log('rowData', rowData);
        }}
      />
    </Cell>
  );
};