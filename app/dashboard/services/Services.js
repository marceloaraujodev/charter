import { useState } from 'react';
import { Table, Input } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

const EditableCell = ({ rowData, dataKey, onChange, currentRowData, isEditing, setIsEditing, ...props }) => {

  const [value, setValue] = useState(rowData[dataKey]);



  const handleSave = () => {
    setIsEditing(false);
    onChange(rowData.id, dataKey, value);
  };

  return (
    <Cell {...props}>
      {isEditing && rowData.id === currentRowData.id ? (
        <>
        <Input
          size="xs"
          value={value}
          onChange={setValue}
          onBlur={handleSave}
          autoFocus
        />
        </>
      ) : (
        <span>
          {value}
        </span>
      )}
    </Cell>
  );
};


export default function Services() {
  const [data, setData] = useState([
    { id: 1, vendor: 'James antony', service: 'flybridge installation', price: 500, edit: 'Edit' },
    { id: 2, vendor: 'Tony', service: 'Washing', price: 200, edit: 'Edit' },
  ])
  const [isEditing, setIsEditing] = useState(false);
  const [currentRowData, setCurrentRowData] = useState(null);

  const handleCellChange = (id, key, value) => {
    const nextData = data.map(item => (item.id === id ? { ...item, [key]: value } : item));
    setData(nextData);
  };

  return (
    <div>
      <h1>Services</h1>
      <div>
        display services from calendar 
        
      </div>
      <Table height={400} data={data} bordered={true}>
        <Column width={50} align="center">
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={180}>
          <HeaderCell>Vendor</HeaderCell>
          <EditableCell dataKey="vendor" currentRowData={currentRowData} onChange={handleCellChange} setIsEditing={setIsEditing} isEditing={isEditing}/>
        </Column>

        {/* <Column width={180}>
          <HeaderCell>Service</HeaderCell>
          <EditableCell dataKey="service" onChange={handleCellChange} />
        </Column>

        <Column width={100}>
          <HeaderCell>Price</HeaderCell>
          <EditableCell dataKey="price" onChange={handleCellChange} />
        </Column> */}

        <Column width={100}>
          <HeaderCell>Edit</HeaderCell>
          <Cell>
            {rowData => (
              isEditing && rowData.id === currentRowData.id ? <button>save</button> :
              <span
                onClick={() => {
                  // alert(`Editing row with ID: ${rowData.id}`);
                  console.log(rowData);
                  setCurrentRowData(rowData)
                  setIsEditing(true)
                }}
                style={{ cursor: 'pointer', color: 'blue' }}
              >
                Edit
              </span>
            )}
          </Cell>
        </Column>
      </Table>
    </div>
  )
}