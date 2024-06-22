import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Container, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import { Link } from 'react-router-dom';
import '../index.css';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';


const criterias = [
  {
    value: 'description',
    label: 'Description',
  },
  {
    value: 'author',
    label: 'Author',
  },
];

export default function Data() {
  const axiosPrivate = useAxiosPrivate();
  var description = ""
  var author = ""
  const [Search, setSearch] = React.useState('')
  const [Keyword, setKeyword] = React.useState('')
  const [searchResults, setSearchResults] = React.useState([])
  const handleClick = (e) => {
    if (Search) {
      if (Keyword === "description") {
        description = Search;
        author = '';
      } else {
        author = Search;
        description = '';
      }

      const url = `http://localhost:8080/search?author=${author}&description=${description}&uniqueMenuId=true`;
      const getData = async () => {
        try {
          const response = await axiosPrivate.get(url);
          setSearchResults(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }

      getData();

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

  return (
    <Container>
      <div style={{ height: "90px" }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap : '2em'}}>
        <Paper
          elevation={3}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            padding: '1em',
            gap: '1em',
            borderRadius: '10px', // Add a border radius for a modern look
            backgroundColor: '#ffffffdd', // Add a semi-transparent white background
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            height : 'fit-content',
            width : '85%'
          }}
        >
          <form
            component="form"
            noValidate
            autoComplete="off"
            style={{ display: 'flex', alignItems: 'center' }}
            onSubmit={handleClick} // Handle form submit to trigger search when "Enter" is pressed
          >
            <TextField
              id="filled-select-currency"
              select
              label="Search Category"
              defaultValue="Keywords"
              variant="filled"
              value={Keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ minWidth: '25%', marginRight: '1em' }}
            >
              {criterias.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              id="filled-required"
              label="Search Keywords"
              variant="filled"
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleClick();
                }
              }}
              style={{ width: 'auto', marginRight: '1em', flexGrow: 1 }} // Allow the text field to grow to fill the available space
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClick} disabled={!Search} edge="end">
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </form>
          <Typography variant="body2" align="center" color="textSecondary" component={Link} to="/adv">
            Advanced Search
          </Typography>
        </Paper>

        <div>
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
                width : 'auto',
                height : 'fit-content'
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
      </div>
      <div style={{ height: "30px" }} />
    </Container>
  );
}

