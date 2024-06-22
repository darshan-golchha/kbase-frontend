import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import TableContainer from '@mui/material/TableContainer';
import { Link } from 'react-router-dom';
import Appbar from './Appbar';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';

const SearchContainer = styled('div')({
  padding: '1em',
  margin: '1em auto',
  maxWidth: '800px',
});

const AdvancedSearch = () => {
  const axiosPrivate = useAxiosPrivate();
  const [searchCriteria, setSearchCriteria] = useState({
    departmentName: '',
    functionName: '',
    applicationName: '',
    menuName: '',
    fileName: '',
    author: '',
    description: '',
    uniqueMenuId: false,
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    setSearchCriteria({ ...searchCriteria, uniqueMenuId: event.target.checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosPrivate.get('/search', { params: searchCriteria });

      if (response?.data) {
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  const rowSt = {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    alignItems: 'center', padding: '2px', borderBottom: '1px solid black',
  };

  const headSt = {
    fontSize: '1em',
    fontWeight: 'bold'
  };

  const inStyle = {
    display: 'grid',
    gap: '2cm',
    backgroundColor : 'white',
    borderRadius :'2em',
    height : '20vh'
  }

  const myStyle = {
    backgroundImage: 
     "url('https://getwallpapers.com/wallpaper/full/2/0/f/119773.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    minHeight : '100vh'
  }

  return (
    <div style={myStyle}>
      <Appbar />
      <SearchContainer style={inStyle}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} style={{ height: "2cm" }}>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Department Name"
                variant="outlined"
                name="departmentName"
                value={searchCriteria.departmentName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Function Name"
                variant="outlined"
                name="functionName"
                value={searchCriteria.functionName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Application Name"
                variant="outlined"
                name="applicationName"
                value={searchCriteria.applicationName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Menu Name"
                variant="outlined"
                name="menuName"
                value={searchCriteria.menuName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Author"
                variant="outlined"
                name="author"
                value={searchCriteria.author}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                name="description"
                value={searchCriteria.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchCriteria.uniqueMenuId}
                    onChange={handleCheckboxChange}
                    name="uniqueMenuId"
                  />
                }
                label="Unique Menu ID"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Button variant="contained" type="submit" fullWidth >
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </SearchContainer>
      <div style={{display : 'grid', gridTemplateColumns : '1fr 1fr 1fr',
      justifyItems : 'center', marginTop : '3cm', 
      margin : '1em', gap :'1em'}}>
          {searchResults && searchResults.map((result) => (
            <div
              key={result.id}
              className="box-container"
              style={{
                // Add styling for each result box
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                padding: '1em',
                marginBottom: '2em',
                boxShadow: '0 8px 16px -8px rgba(0, 0, 0, 0.3)',
                width : '70%'
              }}
            >
              {/* Render the content of each Data object */}
              <TableContainer sx={{ maxWidth: '30vw', margin: 'auto', marginBottom: '2em' }}>
                <Link to={`/details/${result.menu.menuId}`}>
                  <div>
                    <div style={rowSt}>
                      <div style={headSt}>
                        Author :
                      </div>
                      <div>
                        {result.author}
                      </div>
                    </div>
                    <div style={rowSt}>
                      <div style={headSt}>
                        Department :
                      </div>
                      <div>
                        {result.menu.application.function.department.departmentName}
                      </div>
                    </div>
                    <div style={rowSt}>
                      <div style={headSt}>
                        Function :
                      </div>
                      <div>
                        {result.menu.application.function.functionName}
                      </div>
                    </div>
                    <div style={rowSt}>
                      <div style={headSt}>
                        Application :
                      </div>
                      <div>
                        {result.menu.application.applicationName}
                      </div>
                    </div>
                    <div style={rowSt}>
                      <div style={headSt}>
                        Menu :
                      </div>
                      <div>
                        {result.menu.menuName}
                      </div>
                    </div>
                    <div style={rowSt}>
                      <div style={headSt}>
                        Description :
                      </div>
                      <div>
                        {result.menu.description}
                      </div>
                    </div>
                  </div>
                </Link>
              </TableContainer>

            </div>
          ))}
        </div>
        <div style={{ height: "30px" }} />
    </div>
  );
};

export default AdvancedSearch;
