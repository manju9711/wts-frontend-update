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

const Vision = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        title_en: '',
        title_ta: '',
        description_en: '',
        description_ta: '',
        isDisabled: false,
        image: null,
        imageTitle_en: '',
        imageTitle_ta: ''
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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/vision/cms`);
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
            description_en: item.description_en,
            description_ta: item.description_ta,
            isDisabled: item.isDisabled,
            image: item.image || null,
            imageTitle_en: item.imageTitle_en || '',
            imageTitle_ta: item.imageTitle_ta || ''
        });
        setEditId(item._id);
        setIsFormVisible(true);
    };

    const handleDelete = async (id) => {
        setOpenDialog(true);
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/vision/vision/${deleteId}`);
            if (response.data.status === "success") {
                setData(prevData => prevData.filter(item => item._id !== deleteId));
                setMessage('Vision deleted successfully');
                setMessageType('success');
            } else {
                setMessage('Failed to delete the vision: ' + response.data.message);
                setMessageType('error');
            }
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error deleting the vision:", error);
            setMessage('Error deleting the vision');
            setMessageType('error');
            setOpenSnackbar(true);
        } finally {
            setOpenDialog(false);
            setDeleteId(null);
        }
    };

    const handleStatusToggle = async (id) => {
        const item = data.find(row => row._id === id);
        const updatedStatus = !item.isDisabled;
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/vision/vision/${id}`, { isDisabled: updatedStatus });

            if (response.data.status === "success") {
                setData(prevRows =>
                    prevRows.map(row =>
                        row._id === id ? { ...row, isDisabled: updatedStatus } : row
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
        formData.append('description_en', form.description_en);
        formData.append('description_ta', form.description_ta);
        formData.append('isDisabled', form.isDisabled);
        formData.append('imageTitle_en', form.imageTitle_en);
        formData.append('imageTitle_ta', form.imageTitle_ta);
        if (form.image instanceof File) {
            formData.append('image', form.image);
        }

        try {
            if (editId) {
                const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/vision/vision/${editId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (response.data.status === "success") {
                    fetchData();
                    setEditId(null);
                    setMessage('Vision updated successfully');
                    setMessageType('success');
                } else {
                    setMessage('Failed to update vision: ' + response.data.message);
                    setMessageType('error');
                }
            } else {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/vision/vision`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (response.data.status === "success") {
                    fetchData();
                    setMessage('Vision added successfully');
                    setMessageType('success');
                } else {
                    setMessage('Failed to add vision: ' + response.data.message);
                    setMessageType('error');
                }
            }
            setForm({
                title_en: '',
                title_ta: '',
                description_en: '',
                description_ta: '',
                isDisabled: false,
                image: null,
                imageTitle_en: '',
                imageTitle_ta: ''
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
            description_en: '',
            description_ta: '',
            isDisabled: false,
            image: null,
            imageTitle_en: '',
            imageTitle_ta: ''
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
                Vision
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleAddClick}>
                    Add Vision
                </Button>
            </Box>
            {isFormVisible ? (
                <Box>
                    <Typography variant="h6" component="h2">
                        {editId ? 'Edit Vision' : 'Add Vision'}
                    </Typography>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            label="Title (English)"
                            name="title_en"
                            value={form.title_en}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Title (Tamil)"
                            name="title_ta"
                            value={form.title_ta}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description (English)"
                            name="description_en"
                            value={form.description_en}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description (Tamil)"
                            name="description_ta"
                            value={form.description_ta}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Image Title (English)"
                            name="imageTitle_en"
                            value={form.imageTitle_en}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Image Title (Tamil)"
                            name="imageTitle_ta"
                            value={form.imageTitle_ta}
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
                                {form.image instanceof File ? (
                                    <img src={URL.createObjectURL(form.image)} alt="Vision" style={{ width: '150px', height: 'auto' }} />
                                ) : (
                                    <img src={`${process.env.REACT_APP_API_URL}/public/${form.image}`} alt="Vision" style={{ width: '150px', height: 'auto' }} />
                                )}
                            </Box>
                        )}
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
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
                    <TableContainer component={Paper} sx={{ border: '1px solid #e0e0e0' }}>
                        <Table sx={{ minWidth: 650, borderCollapse: 'collapse' }} aria-label="vision table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>S.No</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Title (EN)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Title (TA)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Description (EN)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Description (TA)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Image Title (EN)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Image Title (TA)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Edit</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Apply pagination after filtering
                                    .map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell>{row.Id}</TableCell>
                                            <TableCell>{row.title_en}</TableCell>
                                            <TableCell>{row.title_ta}</TableCell>
                                            <TableCell>{row.description_en}</TableCell>
                                            <TableCell>{row.description_ta}</TableCell>
                                            <TableCell>{row.imageTitle_en}</TableCell>
                                            <TableCell>{row.imageTitle_ta}</TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={row.isDisabled}
                                                    onChange={() => handleStatusToggle(row._id)}
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
                                                    onClick={() => handleDelete(row._id)}
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
                        rowsPerPageOptions={[5, 10, 25]}
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
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this vision?
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

export default Vision;
