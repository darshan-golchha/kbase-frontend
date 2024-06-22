import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Appbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;

  const id = useParams();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = () => {
    // Redirect to the /login page
    
    navigate('/login', { replace: true });
    window.location.reload();
    
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>

        <Link to={`/result`}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"Add New Data"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to={`/admin`}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"Admin Config"} />
            </ListItemButton>
          </ListItem>
        </Link>
        {
          currentPage === `/details/${id.id}` &&
          <Link to={`/update/${id.id}`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={"Edit This Record"} />
              </ListItemButton>
            </ListItem>
          </Link>
        }
        {/* {['',''].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={drawerClick({text})}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div position="fixed" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
        <Toolbar style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', justifyItems : 'center'}}>
          <div >
            {['left'].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)} style={{ color: 'white' }}>Menu</Button>
                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 , color: 'white' }}>
            <Link to="/">
              KBase
            </Link>
          </Typography>
          <Button style={{color : 'white'}} onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </div>
    </Box>
  );
}
