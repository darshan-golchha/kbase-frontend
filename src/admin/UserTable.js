import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from "react-router";
import {
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    InputAdornment,
    TextField,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { Edit, Delete, ArrowBack } from '@mui/icons-material';
import Loader from '../components/Loader';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [searchUsername, setSearchUsername] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, [searchUsername]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const endpoint = searchUsername ? '/user' : '/allUsers';
            const params = searchUsername ? { username: searchUsername } : {};

            const response = await axiosPrivate.get(endpoint, { params });
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response && (error.response.status === 403)) {
                window.alert('Unauthorized! You are not allowed to edit this record.');
                navigate("/home", { replace: true });
            } else if (error.response && error.response.status === 401) {
                window.alert('Your session is expired Or you are not authorized to access this.');
                navigate("/", { replace: true });
            } else {
                console.error('Error fetching users : ', error);
            }
        }
    };

    const handleSearch = (e) => {
        setSearchUsername(e.target.value);
    };

    const clearSearch = () => {
        setSearchUsername('');
    };

    const handleRoleChangeClick = (userId) => {
        setSelectedUserId(userId);
        setOpenDialog(true);
    };

    const handleDeleteClick = (userId) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (confirmed) {
            deleteUser(userId);
        }
    };

    const handleRoleChange = async () => {
        setLoading(true);
        try {
            const response = await axiosPrivate.post(`/rolechange?roleName=${selectedRole}&userId=${selectedUserId}`);
            setOpenDialog(false);
            fetchUsers();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response && (error.response.status === 403)) {
                window.alert('Unauthorized! You are not allowed to edit this record.');
                navigate("/home", { replace: true });
            } else if (error.response && error.response.status === 401) {
                window.alert('Your session is expired Or you are not authorized to access this.');
                navigate("/", { replace: true });
            } else {
                console.error('Error changing roles : ', error);
            }
        }
    };

    const deleteUser = async (userId) => {
        setLoading(true);
        try {
            const response = await axiosPrivate.post(`/deleteUser?userId=${userId}`);
            fetchUsers();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response && (error.response.status === 403)) {
                window.alert('Unauthorized! You are not allowed to edit this record.');
                navigate("/home", { replace: true });
            } else if (error.response && error.response.status === 401) {
                window.alert('Your session is expired Or you are not authorized to access this.');
                navigate("/", { replace: true });
            } else {
                console.error('Error deleting users : ', error);
            }
        }
    };

    const filteredUsers = users.filter((user) => user.roles[0].name !== 'ADMIN');

    return (
        <div>
            {loading && <Loader />}
            <div style={{ marginBottom: '1em' }}>
                <TextField
                    type="text"
                    style={{backgroundColor : 'white',borderRadius : '0.5em'}}
                    value={searchUsername}
                    onChange={handleSearch}
                    placeholder="Search by username"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={clearSearch}>
                                    <ArrowBack />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.roles[0].name}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleRoleChangeClick(user.id)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(user.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Select Role</DialogTitle>
                <DialogContent>
                    <Select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="EDITOR">EDITOR</MenuItem>
                        <MenuItem value="USER">USER</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleRoleChange} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserTable;
