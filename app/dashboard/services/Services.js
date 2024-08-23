import { useState, useEffect } from 'react';
import { Table, Input } from 'rsuite';
import Button from '@/app/components/Button';
import c from './Services.module.css';
import ModalG from '@/app/components/ModalG';
import Label from '../../components/Label';
import InputComponent from '../../components/InputComponent';
import axios from 'axios';
import notify from '@/app/utils/notifications';
import Dougnut from '../Graphics/Dougnut/Dougnut';
import HorizontalCharts from '../Graphics/Horizontal/HorizontalCharts';
import { format } from 'date-fns';
import { useGlobalContext } from '@/app/GlobalContext';
// add graphics to the service order page

function dateFormat(date) {
  return format(new Date(date), 'MM-dd-yyyy');
}

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
  const { serviceData, setServiceData } = useGlobalContext();
  const [isEditing, setIsEditing] = useState(false);
  const [currentRowData, setCurrentRowData] = useState(null);
  const [vendor, setVendor] = useState('');
  const [service, setService] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [graphicData, setGraphicData] = useState([]);

  // const x = serviceData.map(service => service.price)
  // console.log('x:', x)

  useEffect(() => {
    // fetch data from server
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/services');
      // format the date
      const services = res.data.services.map((service) => ({
        ...service,
        createdAt: dateFormat(service.createdAt),
      }));
      // I'm fetching the entire service orders.
      setServiceData(services);
    } catch (error) {
      console.log(error);
    }
  };

  function closeModal() {
    setIsModalOpen(false);
  }

  const handleCellChange = (id, key, value) => {
    const nextData = serviceData.map((item) =>
      item.id === id ? { ...item, [key]: value } : item
    );
    setServiceData(nextData);
  };

  // creates the columns and its header contents - it gets the contents from the data variable and the key is the reference to the field in the data variable
  const Col = [
    { title: 'ID', label: 'id', key: 'id', width: 30, align: 'center' },
    { title: 'Vendor', label: 'vendor', key: 'vendor', width: 180 },
    { title: 'Service', label: 'service', key: 'service', width: 180 },
    { title: 'Price', label: 'price', key: 'price', width: 100 },
    { title: 'Edit', label: 'edit', key: 'edit', width: 130 },
    { title: 'Date', label: 'date', key: 'createdAt', width: 100 },
  ];

  // Edit Service order save when done
  async function editAndSaveServiceOrder(rowData) {
    console.log(rowData);

    // send save data to the server
    const res = await axios.put('/api/services', rowData);
    if (res.status === 200) {
      // setData(prevData => prevData.map(item => item.id === rowData.id? rowData : item));
      notify('success', 'Service Order Updated Successfully');
      setIsEditing(false);
    } else {
      notify('error', 'Failed to Update Service Order');
    }
  }

  async function newServiceOrder(e) {
    e.preventDefault();
    const serviceOrder = {
      id: serviceData.length + 1,
      vendor: vendor,
      service: service,
      price: +price,
    };
    // sende new service order to the server
    const res = await axios.post('api/services', serviceOrder);

    if (res.status === 200) {
      setServiceData((prevData) => [...prevData, serviceOrder]);
      setIsModalOpen(false);
      setVendor('');
      setService('');
      setPrice('');
      notify('success', 'New Service Order Added Successfully');
    } else {
      notify('error', 'Failed to Add New Service Order');
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  async function deleteServiceOrder(rowData){
    console.log(rowData)
    setServiceData(prev => prev.filter(item => item._id !== rowData._id))
    await axios.delete('/api/services', {
      data: { id: rowData._id }
    })
  }

  return (
    <div>
      {/* when modal open */}
      {isModalOpen && (
        <ModalG onCloseModal={closeModal} onSubmit={(e) => newServiceOrder(e)}>
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
        </ModalG>
      )}

      <div className={c.btnCont}>
        <Button className={c.btn} onClick={() => setIsModalOpen(true)}>
          New Service Order
        </Button>
      </div>

      <HorizontalCharts />

      <Table height={400} data={serviceData} bordered={true}>
        {Col.map((column) => {
          const { key, label, title, width } = column;

          return (
            <Column key={key} title={title} width={width} align="center">
              <HeaderCell>{label}</HeaderCell>
              {/* Button - when editing is active */}
              {title === 'Edit' ? (
                <Cell
                  className={c.editBtnCont}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: '0',
                  }}
                >
                  {(rowData) =>
                    isEditing && rowData.id === currentRowData.id ? (
                      <Button
                        className={c.editBtn}
                        onClick={() => editAndSaveServiceOrder(rowData)}
                      >
                        save
                      </Button>
                    ) : (
                      <>
                  
                          <Button
                            className={c.editBtn}
                            onClick={() => {
                              setCurrentRowData(rowData);
                              setIsEditing(true);
                            }}
                          >
                            Edit
                          </Button>               
                          <Button
                            color='red'
                            className={c.editBtn}
                            onClick={() => {
                              // call delete function and pass rowData to delete
                              deleteServiceOrder(rowData);
                              // setIsEditing(false);
                            }}
                          >
                            Delete
                          </Button>
                      </>
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
