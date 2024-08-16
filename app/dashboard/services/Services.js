import { useState } from 'react';
import { Table, Input } from 'rsuite';
import Button from '@/app/components/Button';
import c from './Services.module.css';
import ModalG from '@/app/components/ModalG';
import Label from '../../components/Label';
import InputComponent from '../../components/InputComponent';

// needs the submit function
// needs to send info to server in the saveServiceOrder

const { Column, HeaderCell, Cell } = Table;

const EditableCell = ({
  rowData,
  dataKey,
  onChange,
  currentRowData,
  isEditing,
  setIsEditing,
  ...props
}) => {
  // this saves the data
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
        <span>{value}</span>
      )}
    </Cell>
  );
};

export default function Services() {
  const [data, setData] = useState([
    {
      id: 1,
      vendor: 'James antony',
      service: 'flybridge installation',
      price: 500,
      edit: 'Edit',
    },
    { id: 2, vendor: 'Tony', service: 'Washing', price: 200, edit: 'Edit' },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRowData, setCurrentRowData] = useState(null);
  const [vendor, setVendor] = useState('');
  const [service, setService] = useState('');
  const [price, setPrice] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal(){
    setIsModalOpen(false);
  }

  const handleCellChange = (id, key, value) => {
    const nextData = data.map((item) =>
      item.id === id ? { ...item, [key]: value } : item
    );
    setData(nextData);
  };

  // creates the columns and its header contents
  const Col = [
    { title: 'ID', label: 'id', key: 'id', width: 50, align: 'center' },
    { title: 'Vendor', label: 'vendor', key: 'vendor', width: 180 },
    { title: 'Service', label: 'service', key: 'service', width: 180 },
    { title: 'Price', label: 'price', key: 'price', width: 100 },
    { title: 'Edit', label: 'edit', key: 'edit', width: 100 },
  ];

  // save when editing Service order when editing
  function saveServiceOrder(rowData) {
    console.log(rowData);
    setIsEditing(false);
    
    // send save data to the server
  }

  function newServiceOrder(e) {
    e.preventDefault()
    const serviceOrder = {
      vendor: vendor,
      service: service,
      price: price,
    };
    console.log(serviceOrder);
    // sende new service order to the server
  }

  function closeModal() {
    setIsModalOpen(false); 
  }

  return (
    <div>
      {isModalOpen && <ModalG 
        onCloseModal={closeModal}
        onSubmit={(e)=> newServiceOrder(e)}
      >
        <Label htmlFor="vendor">New Vendor:</Label>
            <InputComponent
              className={c.textarea}
              placeholder="Enter Vendor"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
            />
        <Label htmlFor="service">Service:</Label>
            <InputComponent
              className={c.textarea}
              placeholder="Service"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
        <Label htmlFor="price">Price:</Label>
            <InputComponent
              className={c.textarea}
              placeholder="$ Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
        </ModalG>}


      <div className={c.btnCont}>
        <Button className={c.btn} onClick={() => setIsModalOpen(true)}>New Service Order</Button>
      </div>
      <Table height={400} data={data} bordered={true}>
        {Col.map((column) => {
          const { key, label, title, width } = column;

          return (
            <Column key={key} title={title} width={width} align="center">
              <HeaderCell>{label}</HeaderCell>
              {/* when editing is active */}
              {title === 'Edit' ? (
                <Cell>
                  {(rowData) =>
                    isEditing && rowData.id === currentRowData.id ? (
                      <button onClick={() => saveServiceOrder(rowData)}>
                        save
                      </button>
                    ) : (
                      <span
                        onClick={() => {
                          // console.log(rowData);
                          setCurrentRowData(rowData);
                          setIsEditing(true);
                        }}
                        style={{ cursor: 'pointer', color: 'blue' }}
                      >
                        Edit
                      </span>
                    )
                  }
                </Cell>
              ) : (
                // Edit button
                <EditableCell
                  dataKey={key}
                  currentRowData={currentRowData}
                  onChange={handleCellChange}
                  setIsEditing={() => setIsEditing(true)}
                  isEditing={isEditing}
                />
              )}
            </Column>
          );
        })}
      </Table>
    </div>
  );
}
