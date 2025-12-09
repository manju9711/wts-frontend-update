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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { TeamTypeEnum } from '../constant/enum';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DOMPurify from 'dompurify';

const Structure = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        title_en: '',
        title_ta: '',
        description_en: '',
        description_ta: '',
        contactNo_en: '',
        contactNo_ta: '',
        image: null,
        team_type: '',
        isDisabled: false
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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/structure/cms`);
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
            contactNo_en: item.contactNo_en,
            contactNo_ta: item.contactNo_ta,
            image: item.image || null,
            team_type: item.team_type,
            isDisabled: item.isDisabled
        });
        setEditId(item.id);
        setIsFormVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/structure/structure/${id}`);
            if (response.data.status === "success") {
                setData(prevData => prevData.filter(item => item.id !== id));
                setMessage('Structure deleted successfully');
                setMessageType('success');
            } else {
                setMessage('Failed to delete the structure: ' + response.data.message);
                setMessageType('error');
            }
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error deleting the structure:", error);
            setMessage('Error deleting the structure');
            setMessageType('error');
            setOpenSnackbar(true);
        }
    };

    const handleStatusToggle = async (id) => {
        const item = data.find(row => row.id === id);
        const updatedStatus = !item.isDisabled;
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/structure/structure/${id}`, { isDisabled: updatedStatus });

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
        formData.append('description_en', form.description_en);
        formData.append('description_ta', form.description_ta);
        formData.append('contactNo_en', form.contactNo_en);
        formData.append('contactNo_ta', form.contactNo_ta);
        if (form.image instanceof File) {  // Check if image is a file and append it
            formData.append('image', form.image);
        }
        formData.append('team_type', form.team_type);
        formData.append('isDisabled', form.isDisabled);

        try {
            if (editId) {
                const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/structure/structure/${editId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (response.data.status === "success") {
                    fetchData();
                    setEditId(null);
                    setMessage('Structure updated successfully');
                    setMessageType('success');
                } else {
                    setMessage('Failed to update structure: ' + response.data.message);
                    setMessageType('error');
                }
            } else {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/structure/structure`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (response.data.status === "success") {
                    fetchData();
                    setMessage('Structure added successfully');
                    setMessageType('success');
                } else {
                    setMessage('Failed to add structure: ' + response.data.message);
                    setMessageType('error');
                }
            }
            setForm({
                title_en: '',
                title_ta: '',
                description_en: '',
                description_ta: '',
                contactNo_en: '',
                contactNo_ta: '',
                image: null,
                team_type: '',
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
            description_en: '',
            description_ta: '',
            contactNo_en: '',
            contactNo_ta: '',
            image: null,
            team_type: '',
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

    const handleOpenDialog = (id) => {
        setDeleteId(id);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const confirmDelete = () => {
        handleDelete(deleteId);
        setOpenDialog(false);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom
                sx={{
                    pt: { xs: 6, sm: 0 },
                    textAlign: { xs: 'center', sm: 'left' }
                }}>
                Structure
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleAddClick}>
                    Add Structure
                </Button>
            </Box>
            {isFormVisible ? (
                <Box>
                    <Typography variant="h6" component="h2">
                        {editId ? 'Edit Structure' : 'Add Structure'}
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
                        <label>Description (English)</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={form.description_en}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                const sanitizedData = DOMPurify.sanitize(data, { ALLOWED_TAGS: ['b', 'strong', 'br'] });
                                handleInputChange({
                                    target: { name: 'description_en', value: sanitizedData },
                                });
                            }}
                        />
                        <label>Description (Tamil)</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={form.description_ta}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                const sanitizedData = DOMPurify.sanitize(data, { ALLOWED_TAGS: ['b', 'strong', 'br'] });
                                handleInputChange({
                                    target: { name: 'description_ta', value: sanitizedData },
                                });
                            }}
                        />
                        <TextField
                            label="Contact No (English)"
                            name="contactNo_en"
                            value={form.contactNo_en}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Contact No (Tamil)"
                            name="contactNo_ta"
                            value={form.contactNo_ta}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="team-type-label">Team Type</InputLabel>
                            <Select
                                labelId="team-type-label"
                                name="team_type"
                                value={form.team_type}
                                onChange={handleInputChange}
                                label="Team Type"
                                required
                            >
                                {Object.keys(TeamTypeEnum).map((key) => (
                                    <MenuItem key={key} value={TeamTypeEnum[key]} >
                                        {TeamTypeEnum[key]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                        <Box display="flex" alignItems="center" mt={2}>
                            <Typography>Status</Typography>
                            <Switch
                                name="isDisabled"
                                checked={form.isDisabled}
                                onChange={handleInputChange}
                                color="success"
                            />
                        </Box>
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
                        <Table sx={{ minWidth: 650 }} aria-label="structure table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>S.No</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Title (EN)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Title (TA)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Description (EN)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Description (TA)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Contact No (EN)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Contact No (TA)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Team Type</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Edit</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.Id}</TableCell>
                                        <TableCell>{row.title_en}</TableCell>
                                        <TableCell>{row.title_ta}</TableCell>
                                        <TableCell dangerouslySetInnerHTML={{ __html: row.description_en }}/>
                                        <TableCell dangerouslySetInnerHTML={{ __html: row.description_ta }}/>
                                        <TableCell>{row.contactNo_en}</TableCell>
                                        <TableCell>{row.contactNo_ta}</TableCell>
                                        <TableCell>{row.team_type}</TableCell>
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
                                                onClick={() => handleOpenDialog(row.id)}
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
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this structure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} type="submit" variant="contained" color="primary">
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

export default Structure;
