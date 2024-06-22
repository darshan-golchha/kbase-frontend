import React from 'react';
import UserTable from './UserTable';
import Appbar from '../components/Appbar';

const AdminPage = () => {
    const myStyle = {
        backgroundImage:
            "url('https://getwallpapers.com/wallpaper/full/2/0/f/119773.jpg')",
        backgroundSize: 'cover',
        minHeight: "100vh",
        backgroundRepeat: 'repeat',
    }
    const intDivs = {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white', // Set the background color to transparent
        borderRadius: '0.5em',
        width: 'fit-content',
        height: 'fit-content',
        margin: 'auto',
        marginTop: '5%',
        padding: '2em',
      };

    return (
        <div style={myStyle}>
            <Appbar />
            <div style={intDivs}>
                <UserTable />
            </div>
        </div>
    );
};

export default AdminPage;
