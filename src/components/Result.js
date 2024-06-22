import '../App.css';
import Appbar from '../components/Appbar';
import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import '../index.css';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate} from "react-router";

const Result = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [deps, setDeps] = useState([]);
  useEffect(() => {
      const getData = async () => {
        try {
          const response = await axiosPrivate.get('https://kbase-backend-b5135e83fa8d.herokuapp.com/search/deps');
          const departmentsData = response.data.map(departmentName => ({
            value: departmentName,
            label: departmentName
          }));
          setDeps(departmentsData);
        } catch (error) {
          console.log(error.response);
          if (error.response && (error.response.status === 403)) {
              window.alert('Unauthorized! You don\'t have permissions');
              navigate("/", { replace: true });
          } else if (error.response && error.response.status === 401) {
              window.alert('Your session is expired Or you are not authorized to access this.');
              navigate("/login", { replace: true });
          } else {
              console.error('Error fetching departments : ', error);
          }
      }
      }

      getData();
  }, []);

  const [funcs, setFuncs] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.get('https://kbase-backend-b5135e83fa8d.herokuapp.com/search/func');
        const departmentsData = response.data.map(departmentName => ({
          value: departmentName,
          label: departmentName
        }));
        setFuncs(departmentsData);
      } catch (error) {
        console.log(error.response);
        if (error.response && (error.response.status === 403)) {
            window.alert('Unauthorized! You don\'t have permissions');
            navigate("/", { replace: true });
        } else if (error.response && error.response.status === 401) {
            window.alert('Your session is expired Or you are not authorized to access this.');
            navigate("/login", { replace: true });
        } else {
            console.error('Error fetching functions : ', error);
        }
    }
    }

    getData();
  }, []);

  const [apps, setApps] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.get('https://kbase-backend-b5135e83fa8d.herokuapp.com/search/apps');
        const departmentsData = response.data.map(departmentName => ({
          value: departmentName,
          label: departmentName
        }));
        setApps(departmentsData);
      } catch (error) {
        console.log(error.response);
        if (error.response && (error.response.status === 403)) {
            window.alert('Unauthorized! You don\'t have permissions');
            navigate("/", { replace: true });
        } else if (error.response && error.response.status === 401) {
            window.alert('Your session is expired Or you are not authorized to access this.');
            navigate("/login", { replace: true });
        } else {
            console.error('Error fetching applications : ', error);
        }
    }
    }

    getData();
  }, []);

  const myStyle = {
            backgroundImage: 
     "url('https://getwallpapers.com/wallpaper/full/2/0/f/119773.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
  }

  const [menus, setMenus] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.get('https://kbase-backend-b5135e83fa8d.herokuapp.com/search/menu');
        const departmentsData = response.data.map(departmentName => ({
          value: departmentName,
          label: departmentName
        }));
        setMenus(departmentsData);
      } catch (error) {
        console.log(error.response);
        if (error.response && (error.response.status === 403)) {
            window.alert('Unauthorized! You don\'t have permissions');
            navigate("/", { replace: true });
        } else if (error.response && error.response.status === 401) {
            window.alert('Your session is expired Or you are not authorized to access this.');
            navigate("/login", { replace: true });
        } else {
            console.error('Error fetching menu : ', error);
        }
    }
    }

    getData();
  }, []);




  const [department, setDepartment] = useState('');
  const [func, setFunc] = useState('');
  const [application, setApplication] = useState('');
  const [menu, setMenu] = useState('');
  const [desc, setDesc] = useState('');
  const [auth, setAuth] = useState('');
  const [files, setFile] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const filesArray = Array.from(selectedFiles);
    setFile(filesArray);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // State variable to track form validation status
  const [isFormValid, setIsFormValid] = useState(false);

  // Function to check form validity
  const checkFormValidity = () => {
    const isDepartmentValid = department.trim() !== '';
    const isFuncValid = func.trim() !== '';
    const isApplicationValid = application.trim() !== '';
    const isMenuValid = menu.trim() !== '';
    const isAuthValid = auth.trim() !== '';
    const isDescValid = desc.trim() !== '';

    // Check if all fields are filled
    setIsFormValid(
      isDepartmentValid &&
      isFuncValid &&
      isApplicationValid &&
      isMenuValid &&
      isAuthValid &&
      isDescValid &&
      files.length > 0
    );
  };

  useEffect(() => {
    // Check form validity whenever any input value changes
    checkFormValidity();
  }, [department, func, application, menu, auth, desc, files]);

  const handleSubmit = async () => {
    if (!isFormValid) {
      alert('Please fill in all the required fields and upload at least one file before submitting.');
      return;
    }
    const url = `https://kbase-backend-b5135e83fa8d.herokuapp.com/add?departmentName=${department}&functionName=${func}&applicationName=${application}&menuName=${menu}&description=${desc}&author=${auth}`;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }

    try {
      const response = await axiosPrivate.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response?.data) {
        console.log(response);
        navigate("/", { replace: true });
      } else {
        console.log("incorrect submission");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && (error.response.status === 403)) {
          window.alert('Unauthorized! You don\'t have permissions');
          navigate("/", { replace: true });
      } else if (error.response && error.response.status === 401) {
          window.alert('Your session is expired Or you are not authorized to access this.');
          navigate("/login", { replace: true });
      } else {
          console.error('Error uploading data : ', error);
      }
  }
  };




  return (
    <div style={myStyle}>
      <div> <Appbar className="App" /> </div>
      <div style={myStyle} minHeight="3cm"></div>
      <Paper elevation={3} style={{ padding: '2em', margin: '2em' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.3fr 0.8fr' }}>
          <FormControl style={{ width: '30vw' }}>
            <InputLabel id="demo-multiple-name-label">Dept</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              select
              onChange={e => setDepartment(e.target.value)}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {deps.map((name) => (
                <MenuItem
                  key={name.value}
                  value={name.value}
                >
                  {name.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <h4>Or Department : </h4>
          <input type="text" style={{ fontSize: '1.4em', padding: '0.7em' }} value={department} onChange={e => setDepartment(e.target.value)} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.3fr 0.8fr' }}>
          <FormControl style={{ width: '30vw' }}>
            <InputLabel id="func-id">Func</InputLabel>
            <Select
              labelId="func-id"
              id="func-id"
              select
              onChange={e => setFunc(e.target.value)}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {funcs.map((name) => (
                <MenuItem
                  key={name.value}
                  value={name.value}
                >
                  {name.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <h4>Or Function : </h4>
          <input type="text" style={{ fontSize: '1.4em', padding: '0.7em' }} value={func} onChange={e => setFunc(e.target.value)} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.3fr 0.8fr' }}>
          <FormControl style={{ width: '30vw' }}>
            <InputLabel id="demo-multiple-name-label">App</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              select
              onChange={e => setApplication(e.target.value)}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {apps.map((name) => (
                <MenuItem
                  key={name.value}
                  value={name.value}
                >
                  {name.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <h4>Or Application : </h4>
          <input type="text" style={{ fontSize: '1.4em', padding: '0.7em' }} value={application} onChange={e => setApplication(e.target.value)} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.3fr 0.8fr' }}>
          <FormControl style={{ width: '30vw' }}>
            <InputLabel id="demo-multiple-name-label">Menu</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              select
              onChange={e => setMenu(e.target.value)}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {menus.map((name) => (
                <MenuItem
                  key={name.value}
                  value={name.value}
                >
                  {name.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <h4>Or Menu : </h4>
          <input type="text" style={{ fontSize: '1.4em', padding: '0.7em' }} value={menu} onChange={e => setMenu(e.target.value)} />
        </div>
      </Paper>
      <Paper elevation={3} style={{ padding: '2em', margin: '2em' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
          <div>
            <h4>Author : </h4>
            <input type="text" style={{ fontSize: '1em', padding: '0.3em' }} value={auth} onChange={e => setAuth(e.target.value)} />
          </div>
          <div>
            <h4>Description : </h4>
            <input type="text" style={{ fontSize: '1em', padding: '0.3em' }} value={desc} onChange={e => setDesc(e.target.value)} />
          </div>
          <div>
            <h4>File:</h4>
            <Fab variant="extended" size="small" color="primary" aria-label="add">
              <NavigationIcon sx={{ mr: 1 }} />
              <span>Upload</span>
              <input type="file" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} onChange={handleFileChange} multiple />
            </Fab>
            {files.length > 0 && (
              <ul>
                {files.map((fileName, index) => (
                  <li key={index}>{fileName.name}</li>
                ))}
              </ul>
            )}
          </div>
          <Button variant="contained" onClick={handleSubmit} type="submit" style={{ width : 'fit-content', height : 'fit-content', margin : 'auto'}}>Submit</Button>
        </div>
      </Paper>
      <div style={{ height: "90px" }} />
    </div >
  );
};

export default Result;

