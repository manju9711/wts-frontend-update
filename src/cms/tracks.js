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
import Grid from '@mui/material/Grid';

const Tracks = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        title_en: '',
        title_ta: '',
        description_en: '',
        description_ta: '',
        date_en: '',
        date_ta: '',
        gallery_images: [], // Initialize as an empty array
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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tracks/cms`);
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
            date_en: item.date_en,
            date_ta: item.date_ta,
            gallery_images: Array.isArray(item.gallery_images) ? [...item.gallery_images] : [],
            isDisabled: item.isDisabled
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
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/tracks/tracks/${deleteId}`);
            if (response.data.status === "success") {
                setData(prevData => prevData.filter(item => item.id !== deleteId));
                setMessage('Track deleted successfully');
                setMessageType('success');
            } else {
                setMessage('Failed to delete the track: ' + response.data.message);
                setMessageType('error');
            }
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error deleting the track:", error);
            setMessage('Error deleting the track');
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
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/tracks/tracks/status/${id}`, { isDisabled: updatedStatus });
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

    const handleImageChange = (e, index = null) => {
        const { name, files } = e.target;
        if (files.length === 0) return;

        const newFileData = Array.from(files).map(file => ({
            id: `${name}-${Date.now()}`,  // Generate an ID if necessary
            file: file,  // Actual file object
            fileName: file.name,
            fileType: file.type,
            filePath: URL.createObjectURL(file), // Local preview URL
            fileSize: file.size
        }));

        setForm(prevForm => {
            if (name === 'gallery_images') {
                if (index !== null) {
                    // Update an existing gallery image at the specified index
                    const updatedGalleryImages = [...prevForm.gallery_images];
                    updatedGalleryImages[index] = newFileData[0];
                    return { ...prevForm, gallery_images: updatedGalleryImages };
                } else {
                    // Combine existing images with new images
                    return { ...prevForm, gallery_images: [...prevForm.gallery_images, ...newFileData] };
                }
            }
            return prevForm;
        });
    };

    const handleFileRemove = (name, index) => {
        setForm(prevForm => {
            if (name === 'gallery_images') {
                const updatedGalleryImages = [...prevForm.gallery_images];
                updatedGalleryImages.splice(index, 1);
                return { ...prevForm, gallery_images: updatedGalleryImages };
            }
            return prevForm;
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title_en', form.title_en);
        formData.append('title_ta', form.title_ta);
        formData.append('description_en', form.description_en);
        formData.append('description_ta', form.description_ta);
        formData.append('date_en', form.date_en ? new Date(form.date_en).toISOString().split('T')[0] : '');
        formData.append('date_ta', form.date_ta ? new Date(form.date_ta).toISOString().split('T')[0] : '');
        formData.append('isDisabled', form.isDisabled);
    
        // Separate files into existing and new
        const existingImages = form.gallery_images
            .filter(file => !file.file) // Keep only files that are already in the backend (no `file` property)
            .map(file => file.id); // Map to their IDs only
        const newImages = form.gallery_images.filter(file => file.file instanceof File); // Only new files with `file` object
    
        formData.append('existingImages', JSON.stringify(existingImages));
        newImages.forEach(fileData => {
            formData.append('gallery_images', fileData.file);
        });
    
        try {
            if (editId) {
                const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/tracks/tracks/${editId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (response.data.status === "success") {
                    fetchData(); // Refresh data to ensure updates
                    setEditId(null);
                    setMessage('Track updated successfully');
                    setMessageType('success');
                } else {
                    setMessage('Failed to update track: ' + response.data.message);
                    setMessageType('error');
                }
            } else {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/tracks/tracks`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (response.data.status === "success") {
                    fetchData();
                    setMessage('Track added successfully');
                    setMessageType('success');
                } else {
                    setMessage('Failed to add track: ' + response.data.message);
                    setMessageType('error');
                }
            }
    
            // Reset form after submission
            setForm({
                title_en: '',
                title_ta: '',
                description_en: '',
                description_ta: '',
                date_en: '',
                date_ta: '',
                gallery_images: [],  // Reset gallery images
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
            date_en: '',
            date_ta: '',
            gallery_images: [], // Reset gallery images on new form
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
            <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                    pt: { xs: 6, sm: 0 },
                    textAlign: { xs: 'center', sm: 'left' },
                }}
            >
                Tracks
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: { xs: 'center', sm: 'flex-end' },
                    mb: 2,
                }}
            >
                <Button variant="contained" color="primary" onClick={handleAddClick}>
                    Add Tracks
                </Button>
            </Box>
            {isFormVisible ? (
                <Box>
                    <Typography variant="h6" component="h2">
                        {editId ? 'Edit Tracks' : 'Add Tracks'}
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
                            // label="Date (EN)"
                            name="date_en"
                            value={form.date_en ? form.date_en.split('T')[0] : ''}  // Format as yyyy-mm-dd
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            type="date"
                            inputProps={{ pattern: "\\d{4}-\\d{2}-\\d{2}" }}  // Ensure proper format
                        />

                        <TextField
                            // label="Date (TA)"
                            name="date_ta"
                            value={form.date_ta ? form.date_ta.split('T')[0] : ''}  // Format as yyyy-mm-dd
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            type="date"
                            inputProps={{ pattern: "\\d{4}-\\d{2}-\\d{2}" }}  // Ensure proper format
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
    
                        <Grid container spacing={2} mt={2}>
                            {form.gallery_images.map((fileData, index) => {
                                const isImage = fileData.filePath.match(/\.(jpeg|jpg|png|gif)$/i);
                                const isVideo = fileData.filePath.match(/\.(mp4|mov|wmv|avi)$/i);
    
                                return (
                                    <Grid item xs={6} sm={4} md={3} key={index}>
                                        <Box
                                            position="relative"
                                            width="100%"
                                            paddingTop="100%"
                                            overflow="hidden"
                                            borderRadius="8px"
                                            className="group"
                                        >
                                            {isImage ? (
                                                <img
                                                    src={
                                                        fileData.filePath.startsWith('blob')
                                                            ? fileData.filePath
                                                            : `${process.env.REACT_APP_API_URL}/${fileData.filePath}`
                                                    }
                                                    alt="Gallery"
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        borderRadius: 'inherit',
                                                    }}
                                                />
                                            ) : isVideo ? (
                                                <video
                                                    src={
                                                        fileData.filePath.startsWith('blob')
                                                            ? fileData.filePath
                                                            : `${process.env.REACT_APP_API_URL}/${fileData.filePath}`
                                                    }
                                                    alt="Video"
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        borderRadius: 'inherit',
                                                    }}
                                                    controls
                                                />
                                            ) : null}
    
                                            <input
                                                type="file"
                                                name="gallery_images"
                                                accept="image/*, video/*"
                                                onChange={(e) => handleImageChange(e, index, fileData.id)}
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    opacity: 0,
                                                    cursor: 'pointer',
                                                }}
                                            />
                                            
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleFileRemove('gallery_images', index)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                style={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                }}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </Box>
                                    </Grid>
                                );
                            })}
                        </Grid>
                        <label>Add More Gallery Images: </label>
                        <input
                            type="file"
                            name="gallery_images"
                            accept="image/*, video/*"
                            multiple
                            onChange={(e) => handleImageChange(e)}
                            style={{ marginTop: '16px' }}
                        /><br />
    
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
                        <Table sx={{ minWidth: 650 }} aria-label="tracks table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>S.No</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Title (EN)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Title (TA)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Description (EN)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Description (TA)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Date (EN)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Date (TA)</TableCell>
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
                                        <TableCell>{row.description_en}</TableCell>
                                        <TableCell>{row.description_ta}</TableCell>
                                        <TableCell>{new Date(row.date_en).toISOString().split('T')[0]}</TableCell>
                                        <TableCell>{new Date(row.date_ta).toISOString().split('T')[0]}</TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={row.isDisabled}
                                                onChange={() => handleStatusToggle(row.id)}
                                                color={row.isDisabled ? 'success' : 'error'}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => handleEdit(row)}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color="secondary" onClick={() => handleDelete(row.id)}>
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
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this track?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} variant="contained" color="primary">
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

export default Tracks;