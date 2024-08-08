import { useState, useRef } from 'react';
import axios from 'axios';
import Button from "@/app/components/Button";
import c from './Uploads.module.css';
export default function Uploads({setIsUploading}) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const fileInputRef = useRef(null);


  const handleFileChange = (event) => {
    const files = event.target.files;
    // clean filename before sending to server
    const newFiles = Array.from(files).map(file => {
      const newName = file.name.split(' ').join('');
      return new File([file], newName, {type: file.type})
    })
    setSelectedFiles((prevFiles) => {
      return [...prevFiles,...newFiles];
    });

    const newPreviewUrls = [];
    for (let i = 0; i < files.length; i++) {
      newPreviewUrls.push(URL.createObjectURL(files[i]));
    }
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);

    // Log the details of the selected files
    for (let i = 0; i < files.length; i++) {
      console.log(`File ${i}:`);
      console.log(`Name: ${files[i].name}`);
      console.log(`Size: ${files[i].size}`);
      console.log(`Type: ${files[i].type}`);
      console.log(`Last Modified: ${files[i].lastModifiedDate}`);
    }
    // Reset the file input value so I can reload files without reloading component
    event.target.value = null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    try {
      const response = await axios.post('/api/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(response.status === 200){
        console.log('Files uploaded successfully:', response.data);
        setIsUploading(false)
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleDelete = (index) => {
    const filesArray = Array.from(selectedFiles);

    // Remove the file at the specified index
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    const newSelectedFiles = filesArray.filter((_, i) => i !== index);
  
    // Update state
    setPreviewUrls(newPreviewUrls);
    // setSelectedFiles(newSelectedFiles);
    setSelectedFiles(newSelectedFiles);

    // Clean up URL objects
    URL.revokeObjectURL(previewUrls[index]);
  };


  return (
    <form 
      className={c.formCont} 
      onSubmit={handleSubmit}
    >
      <input 
        type="file"
        multiple 
        onChange={handleFileChange}
        className={c.hiddenFileInput}
        ref={fileInputRef}
      />
      <div className={c.btnCont}>
        <Button onClick={handleChooseFile}>Choose files</Button>
        <Button type="submit">Upload</Button>
        <Button onClick={() => setIsUploading(false)}>Back</Button>
      </div>

      <div className={c.previewContainer}>
        {previewUrls.map((url, index) => (
          <div key={index} className={c.row}>
            <img src={url} alt={`Preview ${index}`} className={c.previewImage} />
            <div className={c.delBtnCont}>
             <Button onClick={() => handleDelete(index)} color='red'>delete</Button>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}