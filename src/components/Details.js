import * as React from 'react';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Appbar from '../components/Appbar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import '../index.css';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Details = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const [searchRes, setSearchRes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch the data when the component mounts for the first time
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(`http://localhost:8080/search/menu/${id}`);
        setSearchRes(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    getData();
  }, [axiosPrivate, id]);

  const myStyle = {
    backgroundImage:
      "url('https://getwallpapers.com/wallpaper/full/2/0/f/119773.jpg')",
    backgroundSize: 'cover',
    minHeight: "100vh",
    backgroundRepeat: 'repeat',
  }

  const detailsColumn = {
    display: 'grid',
  };

  const buttonsColumn = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    backgroundColor: 'white',
    borderRadius: '1.5em',
    justifyItems: 'center',
    minHeight: '30vh',
    height: 'fit-content'
  };

  const outerDiv = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    margin: '2em',

  }

  const itView = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    margin: 'auto',
    padding: '0.5em',
    justifyItems: 'center',
  }

  return (
    <div style={myStyle}>
      <div> <Appbar className="App" /> </div>
      <div style={outerDiv}>
        <div style={detailsColumn}>
          {searchRes.length > 0 && (
            <Paper style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              padding: '2em',
              width: '60%'
            }}>
              <div><h4>Department Name:</h4> {searchRes[0].menu.application.function.department.departmentName}</div>
              <div><h4>Function Name:</h4> {searchRes[0].menu.application.function.functionName}</div>
              <div><h4>Application Name:</h4> {searchRes[0].menu.application.applicationName}</div>
              <div><h4>Menu Name:</h4> {searchRes[0].menu.menuName}</div>
              <div><h4>Author:</h4> {searchRes[0].author}</div>
              <div><h4>Description:</h4> {searchRes[0].menu.description}</div>
            </Paper>
          )}
        </div>
        <div style={buttonsColumn}>
          <div>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button onClick={() => setSelectedCategory('media')}>Media</Button>
              <Button onClick={() => setSelectedCategory('docs')}>Documents</Button>
              <Button onClick={() => setSelectedCategory('visuals')}>Visuals</Button>
            </ButtonGroup>
          </div>
          <div style={itView}>
            {/* Display the selected files based on the selected category */}
            {searchRes.map(item => (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                {selectedCategory === 'media' &&
                  (item.filePath.endsWith('.mp4') || item.filePath.endsWith('.mp3')) && (
                    <Link to={`/view/${item.id}`}>
                      <div style={{display : 'flex'}}>
                        <VideoCameraBackIcon />
                        <Typography>{item.fileName}</Typography>
                      </div>
                    </Link>
                  )}
                {selectedCategory === 'docs' &&
                  (item.filePath.endsWith('.txt') || item.filePath.endsWith('.pdf') || item.filePath.endsWith('.csv')) && (
                    <Link to={`/view/${item.id}`}>
                      <div style={{display : 'flex'}}>
                        <TextSnippetIcon />
                        <Typography>{item.fileName}</Typography>
                      </div>
                    </Link>
                  )}
                {selectedCategory === 'visuals' &&
                  (item.filePath.endsWith('.jpg') ||
                    item.filePath.endsWith('.jpeg') ||
                    item.filePath.endsWith('.png')) && (
                    <Link to={`/view/${item.id}`}>
                      <div style={{display : 'flex'}}>
                        <ImageIcon />
                        <Typography>{item.fileName}</Typography>
                      </div>
                    </Link>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
