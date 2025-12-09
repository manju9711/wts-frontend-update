import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Publish = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        title_en: '',
        title_ta: '',
        file: null,
        image: null,
        isDisabled: false,
    });
    const [editId, setEditId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/publish/cms`);
            if (response.data.status === "success") {
                const updatedData = response.data.data.map((item, index) => ({
                    ...item,
                    Id: index + 1,
                    isDisabled: item.isDisabled || false
                }));
                setData(updatedData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleEdit = (item) => {
        setForm({
            title_en: item.title_en,
            title_ta: item.title_ta,
            file: item.file || null,
            image: item.image || null,
            isDisabled: item.isDisabled,
        });
        setEditId(item.id);
        setIsFormVisible(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setOpenDialog(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/publish/publish/${deleteId}`);
            if (response.data.status === "success") {
                setData(prevData => prevData.filter(item => item.id !== deleteId));
                setMessage('Publish deleted successfully');
                setMessageType('success');
            } else {
                setMessage('Failed to delete publish: ' + response.data.message);
                setMessageType('error');
            }
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error deleting publish:", error);
            setMessage('Error deleting publish');
            setMessageType('error');
            setOpenSnackbar(true);
        }
        setOpenDialog(false);
        setDeleteId(null);
    };

    const handleStatusToggle = async (id) => {
        const item = data.find(row => row.id === id);
        const updatedStatus = !item.isDisabled;
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/publish/publish/${id}`, { isDisabled: updatedStatus });

            if (response.data.status === "success") {
                setData(prevRows =>
                    prevRows.map(row =>
                        row.id === id ? { ...row, isDisabled: updatedStatus } : row
                    )
                );
                setMessage('Status updated successfully');
                setMessageType('success');
            } else {
                setMessage('Failed to update status: ' + response.data.message);
                setMessageType('error');
            }
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error updating status:", error);
            setMessage('Error updating status');
            setMessageType('error');
            setOpenSnackbar(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title_en', form.title_en);
        formData.append('title_ta', form.title_ta);
        formData.append('isDisabled', form.isDisabled);
        if (form.file instanceof File) {
            formData.append('file', form.file);
        }
        if (form.image instanceof File) {  // Check if image is a file and append it
            formData.append('image', form.image);
        }

        try {
            if (editId) {
                const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/publish/publish/${editId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (response.data.status === "success") {
                    fetchData();
                    setEditId(null);
                    setMessage('Publish updated successfully');
                    setMessageType('success');
                } else {
                    setMessage('Failed to update publish: ' + response.data.message);
                    setMessageType('error');
                }
            } else {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/publish/publish`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (response.data.status === "success") {
                    fetchData();
                    setMessage('Publish added successfully');
                    setMessageType('success');
                } else {
                    setMessage('Failed to add publish: ' + response.data.message);
                    setMessageType('error');
                }
            }
            setForm({
                title_en: '',
                title_ta: '',
                file: null,
                image: null,
                isDisabled: false
            });
            setIsFormVisible(false);
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage('Error submitting form');
            setMessageType('error');
            setOpenSnackbar(true);
        }
    };

    const handleAddClick = () => {
        setForm({
            title_en: '',
            title_ta: '',
            file: null,
            image: null,
            isDisabled: false
        });
        setEditId(null);
        setIsFormVisible(true);
    };

    const handleCancel = () => {
        setIsFormVisible(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setDeleteId(null);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom
                sx={{
                    pt: { xs: 6, sm: 0 },
                    textAlign: { xs: 'center', sm: 'left' }
                }}>
                Publish
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleAddClick}>
                    Add Publish
                </Button>
            </Box>
            {isFormVisible ? (
                <Box>
                    <Typography variant="h6" component="h2">
                        {editId ? 'Edit Publish' : 'Add Publish'}
                    </Typography>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            name="title_en"
                            label="Title (EN)"
                            value={form.title_en}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="title_ta"
                            label="Title (TA)"
                            value={form.title_ta}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <Box display="flex" alignItems="center" mt={2}>
                            <Typography>Status</Typography>
                            <Switch
                                name="isDisabled"
                                checked={form.isDisabled}
                                onChange={handleInputChange}
                                color="success"
                            />
                        </Box>
                        {form.image && (
                            <Box mt={2}>
                            <img
                                src={form.image instanceof File
                                ? URL.createObjectURL(form.image)
                                : `${process.env.REACT_APP_API_URL}/public/${form.image}`
                             }
                                alt="Publish Image"
                                style={{ width: '150px', height: 'auto' }}
                             />
                            </Box>
                        )}
                        <input
                            type="file"
                            name="image"
                            accept=".jpeg,.jpg,.png,.gif"
                            onChange={handleInputChange}
                            style={{ marginTop: '16px' }}
                        />
                        <br/>
                        {form.file && (
                            <Box mt={2}>
                                {/jpeg|jpg|png|gif/.test(form.file.name || form.file) ? (
                                    <img
                                        src={form.file instanceof File
                                            ? URL.createObjectURL(form.file)
                                            : `${process.env.REACT_APP_API_URL}/public/${form.file}`
                                        }
                                        alt="Invitation"
                                        style={{ width: '150px', height: 'auto' }}
                                    />
                                ) : (
                                    <Box mt={2}>
                                        <span className="text-black font-semibold">Read our Assembly Ceremony Flower and Handbook :</span>
                                        <Button
                                            onClick={() => window.open(
                                                form.file instanceof File
                                                    ? URL.createObjectURL(form.file)
                                                    : `${process.env.REACT_APP_API_URL}/public/${form.file}`,
                                                '_blank',
                                                'noopener,noreferrer'
                                            )}
                                            variant="contained" color="primary" sx={{marginLeft:"0.5%"}}
                                        >
                                        Click here
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        )}
                        <input
                            type="file"
                            name="file"
                            accept=".jpeg,.jpg,.png,.gif,.pdf,.doc,.docx,.mp4,.mov,.wmv,.avi"
                            onChange={handleInputChange}
                            style={{ marginTop: '16px' }}
                        />
                        <Box sx={{ mt: 2 }}>
                            <Button type="submit" variant="contained" color="primary">
                                {editId ? 'Update' : 'Add'}
                            </Button>
                            <Button onClick={handleCancel} variant="contained" color="secondary" sx={{ ml: 2 }}>
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </Box>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="publish table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Title (EN)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Title (TA)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Edit</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{row.title_en}</TableCell>
                                        <TableCell>{row.title_ta}</TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={row.isDisabled}
                                                onChange={() => handleStatusToggle(row.id)}
                                                color={row.isDisabled ? 'success' : 'error'}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEdit(row)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="secondary"
                                                onClick={() => handleDelete(row.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={messageType} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this publish?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} type="submit" variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} variant="contained" color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Publish;

