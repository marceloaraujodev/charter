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


export default function ServiceTable({setIsUpdated, isUpdated}) {
const [data, setData] = useState([]);
const [isNewItem, setIsNewItem] = useState(false);
const [page, setPage] = useState(1);
const [limit, setLimit] = useState(10); // Items per page
const [totalPages, setTotalPages] = useState(1);

useEffect(() => {
  fetchData(page, limit);
}, [page, limit, isUpdated]);

  // const handleSortColumn = (sortColumn, sortType) => {
  //   setSortColumn(sortColumn);
  //   setSortType(sortType);

  //   const sortedData = [...data].sort((a, b) => {
  //     const valueA = a[sortColumn];
  //     const valueB = b[sortColumn];

  //     if (sortType === 'asc') {
  //       return valueA > valueB ? 1 : -1;
  //     } else {
  //       return valueA < valueB ? 1 : -1;
  //     }
  //   });

  //   setData(sortedData);
  // };

  async function fetchData(page=1, limit=10) {
    const res = await axios.get('/api/services', {
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
    // const sortedServices = services.sort((a, b) => b.id - a.id);
    // setData(sortedServices);
    setData(services);
    setTotalPages(Math.ceil(res.data.totalCount / limit));
  }

  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], data); // copies data to the empty array basically
    nextData.find(item => item.id === id)[key] = value; // returns object and updates with [key] = value
    setData(nextData);
  };

  const handleEdit = async (id) => {
    const nextData = Object.assign([], data);
    const activeItem = nextData.find(item => item.id === id);

    activeItem.status = activeItem.status ? null : 'EDIT';

    setData(nextData); 
  };

  const handleRemove = async (_id) => {
    setData(data.filter(item => item._id !== _id));
    try {
      // console.log('_id', _id)
      await axios.delete('/api/services', {
        data: { _id }
      })
      notify('success', 'Service order removed successfully!');
      setIsUpdated(!isUpdated);
    } catch (error) {
      console.log(error.message)
      notify('error', "Something went wrong, please try again!")
    }
  };

  // Saves new item and Edited item
  async function saveItemOnServer(item){
    if(isNewItem){
      saveNewItemOnServer(item)
      console.log('saveNewItemOnServer')
    }else{
      updateItemOnServer(item)
      console.log('updateItemOnServer')
    }
    setIsNewItem(false)
  }

  // Saves new item to the server POST
  async function saveNewItemOnServer(item) {
    try {
      const res = await axios.post('/api/services', item)
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
  // PUT
  async function updateItemOnServer(item) {
    try {
      const res = await axios.put('/api/services', item)
      console.log(res)
      if(res.status === 200){
        notify('success', 'Service order updated successfully!');
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
        <Button
          size='medium'
          onClick={() => {
            setData([
              { id: data.length + 1, vendor: '', service: '', price: 0, date: new Date, status: 'EDIT' },
              ...data
            ]);
            setIsNewItem(true);
          }}
        >
          Add Service Order
        </Button>

      </div>

      <hr />
      <Table 
        height={420} 
        data={data}
      >
        <Column flexGrow={1} >
          <HeaderCell>id</HeaderCell>
          <EditableCell
            dataKey="id"
            dataType="number"
            onChange={handleChange}
            onEdit={handleEdit}
          />
        </Column>

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

const EditableCell = ({ rowData, dataType, dataKey, onChange, onEdit, ...props }) => {
  const editing = rowData.status === 'EDIT';

  const Field = fieldMap[dataType];
  const value = rowData[dataKey];
  const text = toValueString(value, dataType);

  return (
    <Cell
      {...props}
      className={editing ? 'table-cell-editing' : ''}
      onDoubleClick={() => {
        onEdit?.(rowData.id);
      }}
    >
      {editing ? (
        <Field
          defaultValue={value}
          onChange={value => {
            onChange?.(rowData.id, dataKey, value);
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
          onEdit(rowData.id);
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