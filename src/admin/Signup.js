import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import axios from 'axios';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [passWord, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`https://kbase-backend-b5135e83fa8d.herokuapp.com/login/create?userName=${userName}&passWord=${passWord}`);

            if (response.status === 200) {
                setErrorMessage('');
                setSuccessMessage('User created successfully!');
                setUserName('');
                setPassword('');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 409) {
                setErrorMessage('A user with the username already exists. Please choose another username.');
                setSuccessMessage('');
            } else {
                setErrorMessage('Error occurred while creating the user.');
                setSuccessMessage('');
            }
        }
    };

    const myStyle = {
        display: 'flex',
        justifyContent: "center",
        backgroundImage: "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)",
        backgroundSize: "cover",
        alignItems: "center",
        height: "100vh"
    }

    const boxSt = {
        backgroundColor: 'inherit', // Set the background color to transparent
        borderRadius: '0.5em',
        width: 'fit-content',
        height: 'fit-content',
        margin: 'auto',
        marginTop: '5%',
        padding: '2em',
        boxShadow: '0 0 10px rgba(255, 255, 255, 1)', // Increase opacity for more visibility
        backdropFilter: 'blur(10px)', // Increase blur for more translucent effect
        WebkitBackdropFilter: 'blur(10px)', // For Safari support
    }

    return (
        <Box
        style={myStyle}
        >
            <Paper elevation={3} style={boxSt}>
                <Typography variant="h5" align="center">Sign Up to Nucleopedia</Typography>
                <TextField
                    label="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    fullWidth
                    margin="normal"
                    style={{
                        backgroundColor : 'white',
                        borderRadius : '0.5em'
                    }}
                />
                <TextField
                    label="Password"
                    value={passWord}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    fullWidth
                    margin="normal"
                    style={{
                        backgroundColor : 'white',
                        borderRadius : '0.5em'
                    }}
                />
                <Button variant="contained" color="primary" onClick={handleSignup} fullWidth>
                    {loading ? <Loader /> : 'Sign Up'}
                </Button>
                {errorMessage && (
                    <Box
                        bgcolor="error.main"
                        color="error.contrastText"
                        mt={2}
                        p={2}
                        borderRadius={4}
                        textAlign="center"
                    >
                        {errorMessage}
                    </Box>
                )}
                {successMessage && (
                    <Box
                        bgcolor="success.main"
                        color="success.contrastText"
                        mt={2}
                        p={2}
                        borderRadius={4}
                        textAlign="center"
                    >
                        {successMessage}
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default Signup;
