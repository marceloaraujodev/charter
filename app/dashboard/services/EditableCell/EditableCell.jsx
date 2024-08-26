import { useState, useEffect } from 'react';
import { Table, Input } from 'rsuite';

const { Cell } = Table;

export default function EditableCell({
  rowData,
  dataKey,
  onChange,
  currentRowData,
  isEditing,
  setIsEditing,
  ...props
}) {
    // this saves the data
    const [value, setValue] = useState(rowData[dataKey]);

    const handleChange = (newValue) => {
      setValue(newValue);
    };
  
    // saves the cell info
    // const handleSave = () => {
    //   console.log('saving')
    //   setIsEditing(false);
    //   onChange(rowData.id, dataKey, value);
    // };
    
  
    return (
      <Cell {...props}>
        {isEditing && rowData.id === currentRowData.id ? (
          <>
            <Input
              size="xs"
              value={value}
              onChange={handleChange}
              autoFocus
            />
          </>
        ) : (
          <span>{value}</span>
        )}
      </Cell>
    );
  };
