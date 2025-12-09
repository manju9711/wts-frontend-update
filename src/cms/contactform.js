import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TablePagination from '@mui/material/TablePagination';
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar
// import { Grid, useTheme } from '@mui/material';
// import { useMediaQuery } from '@mui/material';

const ContactForm = () => {
    const [allData, setAllData] = useState([]);
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        name: '',
        email: '',
        liveFrom: '',
        interestedIn: '',
        message: '',
        status: 'New'
    });
    const [editId, setEditId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    useEffect(() => {
        const fetchContactForms = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/contact/contacts`);
                const fetchedData = response.data.map(item => ({
                    ...item,
                    status: item.status || 'New'
                }));
                setAllData(fetchedData);
                setData(fetchedData.slice(0, rowsPerPage));
            } catch (error) {
                console.error("Error fetching contact forms:", error);
                setError('Failed to fetch contact forms. Please try again.');
            }
        };

        fetchContactForms();
    }, [rowsPerPage]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess('');
            }, 3000); // Show success message for 3 seconds
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleEdit = (item) => {
        setForm({
            name: item.name,
            email: item.email,
            liveFrom: item.liveFrom,
            interestedIn: item.interestedIn,
            message: item.message,
            status: item.status
        });
        setEditId(item._id);
        setIsFormVisible(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            if (editId) {
                // Handle editing an existing entry
                const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/contact/contacts/${editId}`, form);
                if (response.status === 200) {
                    setSuccess('Contact form updated successfully');
                    setAllData(prevData => {
                        return prevData.map(item => {
                            if (item._id === editId) {
                                return { ...item, ...form };
                            }
                            return item;
                        });
                    });
                    setData(prevData => {
                        return prevData.map(item => {
                            if (item._id === editId) {
                                return { ...item, ...form };
                            }
                            return item;
                        });
                    });
                    setEditId(null);
                }
            } else {
                // Handle creating a new entry
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/contact/contacts`, form);
                if (response.status === 201) {
                    setSuccess('Contact form submitted successfully');
                    const newContact = response.data.contactUser;
                    setAllData(prevAllData => [...prevAllData, newContact]);
                    setData(prevData => [...prevData, newContact]);
                }
            }
            // Reset form after successful submission or update
            setForm({
                name: '',
                email: '',
                liveFrom: '',
                interestedIn: '',
                message: '',
                status: 'New'
            });
            setIsFormVisible(false);
        } catch (error) {
            console.error("Error submitting contact form:", error);
            setError('Failed to submit the contact form. Please try again.');
        }
    };

    const handleAddClick = () => {
        setForm({
            name: '',
            email: '',
            liveFrom: '',
            interestedIn: '',
            message: '',
            status: 'New'
        });
        setEditId(null);
        setIsFormVisible(true);
        setError('');
        setSuccess('');
    };

    const handleCancel = () => {
        setIsFormVisible(false);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/contact/contacts/${id}`, { status: newStatus });
            if (response.status === 200) {
                setAllData(prevData => prevData.map(item => item._id === id ? { ...item, status: newStatus } : item));
                setData(prevData => prevData.map(item => item._id === id ? { ...item, status: newStatus } : item));
                setSuccess('Status updated successfully');
            }
        } catch (error) {
            console.error("Error updating status:", error);
            setError('Failed to update status. Please try again.');
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        const startIndex = newPage * rowsPerPage;
        setData(allData.slice(startIndex, startIndex + rowsPerPage));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        setData(allData.slice(0, parseInt(event.target.value, 10)));
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom
                sx={{
                    pt: { xs: 6, sm: 0 },
                    textAlign: { xs: 'center', sm: 'left' }
                }}>
                Contact Us
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleAddClick}>
                    Add Contact
                </Button>
            </Box>
            {isFormVisible ? (
                <Box>
                    <Typography variant="h6" component="h2">
                        {editId ? 'Edit Contact' : 'Add Contact'}
                    </Typography>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Live From"
                            name="liveFrom"
                            value={form.mobile}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Interested In"
                            name="interestedIn"
                            value={form.subject}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Message"
                            name="message"
                            value={form.message}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <Select
                            label="Status"
                            name="status"
                            value={form.status}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="New">New</MenuItem>
                            <MenuItem value="In progress">In progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Canceled">Canceled</MenuItem>
                        </Select>
                        <Box sx={{ mt: 2 }}>
                            <Button type="submit" variant="contained" color="primary">
                                {editId ? 'Update' : 'Submit'}
                            </Button>
                            <Button onClick={handleCancel} variant="contained" color="secondary" sx={{ ml: 2 }}>
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </Box>
            ) : (
                <>
                    <Paper>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="contact table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Name</TableCell>
                                        <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Email</TableCell>
                                        <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Mobile</TableCell>
                                        <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Subject</TableCell>
                                        <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Message</TableCell>
                                        <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Status</TableCell>
                                        <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((item) => (
                                        <TableRow key={item._id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>{item.mobile}</TableCell>
                                            <TableCell>{item.subject}</TableCell>
                                            <TableCell>{item.message}</TableCell>
                                            <TableCell>
                                                <Select
                                                    value={item.status}
                                                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                                                    style={{ width: "100%" }}
                                                >
                                                    <MenuItem value="New">New</MenuItem>
                                                    <MenuItem value="In progress">In progress</MenuItem>
                                                    <MenuItem value="Completed">Completed</MenuItem>
                                                    <MenuItem value="Canceled">Canceled</MenuItem>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleEdit(item)} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <TablePagination
                        component="div"
                        count={allData.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
                <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
                <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
                    {success}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ContactForm;