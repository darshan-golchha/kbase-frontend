import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import Appbar from '../components/Appbar';
import Button from '@mui/material/Button';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from "react-router";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import Loader from './Loader';


const EditPage = () => {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const { id } = useParams();
    const [departmentName, setDepartmentName] = useState('');
    const [functionName, setFunctionName] = useState('');
    const [applicationName, setApplicationName] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [filesToAdd, setFilesToAdd] = useState([]);
    const [filesToDelete, setFilesToDelete] = useState([]);
    const [menuFiles, setMenuFiles] = useState([]);
    const menuId = id;
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMenuFiles();
    }, [menuId]);

    const myStyle = {
        backgroundImage:
            "url('https://getwallpapers.com/wallpaper/full/2/0/f/119773.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
        minHeight: '100vh'
    }

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const newSelectedFiles = [];
        for (let i = 0; i < fileList.length; i++) {
            newSelectedFiles.push({ file: fileList[i], id: i });
        }
        setSelectedFiles(newSelectedFiles);
        setFilesToAdd([...filesToAdd, ...fileList]);
    };

    const handleRemoveSelectedFile = (id) => {
        setSelectedFiles((prevSelectedFiles) =>
            prevSelectedFiles.filter((file) => file.id !== id)
        );
        setFilesToAdd((prevFiles) => prevFiles.filter((file, index) => index !== id));
    };


    const handleDeleteFile = (fileId) => {
        setFilesToDelete((prevFiles) => [...prevFiles, fileId]);
    };

    const fetchMenuFiles = async () => {
        try {
            const response = await axiosPrivate.get(`https://kbase-backend-b5135e83fa8d.herokuapp.com/search/menu/${menuId}`);
            if (response.data) {
                const data = await response.data;
                setMenuFiles(data);
            } else {
                throw new Error('Error fetching menu files');
            }
        } catch (error) {
            console.log(error.response);
            if (error.response && (error.response.status === 403)) {
                window.alert('Unauthorized! You are not allowed view these files.');
                navigate("/home", { replace: true });
            } else if (error.response && error.response.status === 401) {
                window.alert('Your session is expired Or you are not authorized to access this.');
                navigate("/", { replace: true });
            } else {
                console.error('Error occurred while fetching data:', error);
            }
        }
    };

    const handleSubmit = async (event) => {

        if (menuFiles.length === filesToDelete.length) {
            alert("At least one file must be present in the record.");
            return;
        }

        event.preventDefault();

        if (filesToAdd.length > 0 && author.trim() === '') {
            alert("Please provide the author name before uploading files.");
            return;
        }

        const formData = new FormData();
        formData.append('departmentName', departmentName);
        formData.append('functionName', functionName);
        formData.append('applicationName', applicationName);
        formData.append('description', description);
        formData.append('author', author)

        // Append files to add
        for (let i = 0; i < filesToAdd.length; i++) {
            formData.append('filesToAdd', filesToAdd[i]);
        }

        // Append file IDs to delete
        for (let i = 0; i < filesToDelete.length; i++) {
            formData.append('fileIdsToDelete', filesToDelete[i]);
        }
        setLoading(true);
        try {

            const response = await axiosPrivate.post(`https://kbase-backend-b5135e83fa8d.herokuapp.com/update/${menuId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response?.data) {
                setLoading(false);
                navigate("/home", { replace: true });
            } else {
                setLoading(false);
                alert("incorrect submission");
            }
        } catch (error) {
            setLoading(false);
            console.log(error.response);
            if (error.response && (error.response.status === 403)) {
                window.alert('Unauthorized! You are not allowed to edit this record.');
                navigate("/home", { replace: true });
            } else if (error.response && error.response.status === 401) {
                window.alert('Your session is expired Or you are not authorized to access this.');
                navigate("/", { replace: true });
            } else {
                alert('Error occurred while fetching data:', error);
            }
        }
    };

    const intDivs = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        padding: '0.5em',
        gap: '1em',
        backgroundColor: 'white',
        borderRadius: '0.5em',
        width: '30vw',
        margin: '0.5mm'
    };

    const intFils = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        backgroundColor: 'white',
        borderRadius: '0.5em',
        width: '30vw',
        padding: '0.5em',
    }


    return (
        <div style={myStyle}>
            <div style={{ backgroundColor: "#eb8934", height: '3 cm' }}></div>
            <div> <Appbar className="App" /> </div>
            <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '1em',
                margin: 'auto', gap: '1em',
                width: 'fit-content'
            }}>
                <div style={{ width: '40%' }}>
                    <form style={intDivs}>
                        <FormControl variant="outlined" style={{ marginBottom: '1em' }}>
                            <InputLabel htmlFor="department-name">Department Name</InputLabel>
                            <OutlinedInput
                                id="department-name"
                                type="text"
                                value={departmentName}
                                onChange={(event) => setDepartmentName(event.target.value)}
                                label="Department Name"
                            />
                        </FormControl>
                        <FormControl variant="outlined" style={{ marginBottom: '1em' }}>
                            <InputLabel htmlFor="function-name">Function Name</InputLabel>
                            <OutlinedInput
                                id="function-name"
                                type="text"
                                value={functionName}
                                onChange={(event) => setFunctionName(event.target.value)}
                                label="Function Name"
                            />
                        </FormControl>
                        <FormControl variant="outlined" style={{ marginBottom: '1em' }}>
                            <InputLabel htmlFor="application-name">Application Name</InputLabel>
                            <OutlinedInput
                                id="application-name"
                                type="text"
                                value={applicationName}
                                onChange={(event) => setApplicationName(event.target.value)}
                                label="Application Name"
                            />
                        </FormControl>
                        <FormControl variant="outlined" style={{ marginBottom: '1em' }}>
                            <InputLabel htmlFor="description">Description</InputLabel>
                            <OutlinedInput
                                id="description"
                                type="text"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                label="Description"
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="author">Author</InputLabel>
                            <OutlinedInput
                                id="author"
                                type="text"
                                value={author}
                                onChange={(event) => setAuthor(event.target.value)}
                                label="Author"
                            />
                        </FormControl>
                    </form>
                </div>
                <div style={{ display: 'grid', gridTempleteColumns: '1fr', gap: '0.1em', justifyItems: 'center' }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '0.5em', width: 'fit-content', height: 'fit-content',

                    }}>
                        <div style={intDivs}>
                            <InputLabel>Files to Delete:</InputLabel>
                            {menuFiles.map((file) => (
                                <div key={file.fileId}>
                                    <Checkbox
                                        value={file.fileId}
                                        onChange={(event) => handleDeleteFile(Number(event.target.value))}
                                    />
                                    <span>{file.fileName}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTempleteColumns: '1fr', gap: '0.1em', justifyItems: 'center' }}>
                    <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        aria-label="add"
                    >
                        <NavigationIcon sx={{ mr: 1 }} />
                        <span>Add Files</span>
                        <input
                            type="file"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                cursor: 'pointer',
                            }}
                            onChange={handleFileChange}
                            multiple
                        />
                    </Fab>
                    <div style={intFils}>
                        <InputLabel>Files to Add:</InputLabel>
                        {selectedFiles.map((selectedFile) => (
                            <div key={selectedFile.id}>
                                <Checkbox
                                    checked
                                    value={selectedFile.id}
                                    onChange={() => handleRemoveSelectedFile(selectedFile.id)}
                                />
                                <span>{selectedFile.file.name}</span>
                            </div>
                        ))}
                    </div>
                    <Button variant="contained" type='submit' onClick={handleSubmit} style={{ height: 'fit-content', width: 'fit-content', margin: 'auto' }}>
                        Update
                    </Button>

                </div>
            </div>

        </div>
    );
};

export default EditPage;
