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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DOMPurify from 'dompurify';

const Festival = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        title_en: '',
        title_ta: '',
        description_en: '',
        description_ta: '',
        date_en: '',
        date_ta: '',
        isDisabled: false,
        image: null,
        video: [],
        gallery_images: [],
        heading_en: '',
        heading_ta: '',
        subHeading_en: '',
        subHeading_ta: '',
        specialChairman_en: '',
        specialChairman_ta: '',
        specialChairmanName_en: '',
        specialChairmanName_ta: '',
        minister_en: '',
        minister_ta: '',
        chairman_en: '',
        chairman_ta: '',
        chairmanName_en: '',
        chairmanName_ta: '',
        generalSecretary_en: '',
        generalSecretary_ta: '',
        generalSecretaryName_en: '',
        generalSecretaryName_ta: ''
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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/festival/cms`);
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
            title_en: item.title_en || '',
            title_ta: item.title_ta || '',
            description_en: item.description_en || '',
            description_ta: item.description_ta || '',
            date_en: item.date_en || '',
            date_ta: item.date_ta || '',
            isDisabled: item.isDisabled || false,
            // image: item.image || null,
            image: item.image
    ? typeof item.image === 'string'
        ? { filePath: item.image }
        : item.image
    : null,

           // video: Array.isArray(item.video) ? [...item.video] : [],  // Spread to create a new array
          //gallery_images: Array.isArray(item.gallery_images) ? [...item.gallery_images] : [],  // Spread to create a new array
          video: Array.isArray(item.video)
    ? item.video.map((file) => ({
        id: file.id,
        filePath: file.filePath || file.path || '', // fallback if filePath not present
        file: null, // since it's an existing file
    }))
    : [],

gallery_images: Array.isArray(item.gallery_images)
    ? item.gallery_images.map((file) => ({
        id: file.id,
        filePath: file.filePath || file.path || '',
        file: null,
    }))
    : [],
  
          heading_en: item.heading_en || '',
            heading_ta: item.heading_ta || '',
            subHeading_en: item.subHeading_en || '',
            subHeading_ta: item.subHeading_ta || '',
            specialChairman_en: item.specialChairman_en || '',
            specialChairman_ta: item.specialChairman_ta || '',
            specialChairmanName_en: item.specialChairmanName_en || '',
            specialChairmanName_ta: item.specialChairmanName_ta || '',
            minister_en: item.minister_en || '',
            minister_ta: item.minister_ta || '',
            chairman_en: item.chairman_en || '',
            chairman_ta: item.chairman_ta || '',
            chairmanName_en: item.chairmanName_en || '',
            chairmanName_ta: item.chairmanName_ta || '',
            generalSecretary_en: item.generalSecretary_en || '',
            generalSecretary_ta: item.generalSecretary_ta || '',
            generalSecretaryName_en: item.generalSecretaryName_en || '',
            generalSecretaryName_ta: item.generalSecretaryName_ta || ''
        });
        setEditId(item.id);
        setIsFormVisible(true);
    };

    const handleDelete = async (id) => {
        setDeleteId(id);
        setOpenDialog(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/festival/festival/${deleteId}`);
            if (response.data.status === "success") {
                setData(prevData => prevData.filter(item => item.id !== deleteId));
                setMessage('Festival deleted successfully');
                setMessageType('success');
            } else {
                setMessage('Failed to delete the festival: ' + response.data.message);
                setMessageType('error');
            }
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error deleting the festival:", error);
            setMessage('Error deleting the festival');
            setMessageType('error');
            setOpenSnackbar(true);
        } finally {
            setOpenDialog(false);
            setDeleteId(null);
        }
    };

    // const handleStatusToggle = async (id) => {
    //     const item = data.find(row => row.id === id);
    //     const updatedStatus = !item.isDisabled;

    //     try {
    //         const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/festival/festival/${id}`, { isDisabled: updatedStatus });

    //         if (response.data.status === "success") {
    //             setData(prevRows =>
    //                 prevRows.map(row =>
    //                     row.id === id ? { ...row, isDisabled: updatedStatus } : row
    //                 )
    //             );
    //             setMessage('Status updated successfully');
    //             setMessageType('success');
    //         } else {
    //             setMessage('Failed to update status: ' + response.data.message);
    //             setMessageType('error');
    //         }
    //         setOpenSnackbar(true);
    //     } catch (error) {
    //         console.error("Error updating status:", error);
    //         setMessage('Error updating status');
    //         setMessageType('error');
    //         setOpenSnackbar(true);
    //     }
    // };
    const handleStatusToggle = async (id) => {
    const item = data.find(row => row.id === id);
    const updatedStatus = !item.isDisabled;

    const formData = new FormData();
    formData.append('isDisabled', updatedStatus);

    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/festival/festival/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

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
            } else if (name === 'image') {
                // Replace the main image with a new one
                return { ...prevForm, image: newFileData[0] };
            } else if (name === 'video') {
                // Combine existing videos with new videos
                return { ...prevForm, video: [...prevForm.video, ...newFileData] };
            }
            return prevForm;
        });
    };

    const handleFileRemove = (name, index) => {
        setForm(prevForm => {
            if (name === 'gallery_images') {
                // Remove the selected gallery image
                const updatedGalleryImages = [...prevForm.gallery_images];
                updatedGalleryImages.splice(index, 1);
                return { ...prevForm, gallery_images: updatedGalleryImages };
            } else if (name === 'video') {
                // Remove the selected video
                const updatedVideos = [...prevForm.video];
                updatedVideos.splice(index, 1);
                return { ...prevForm, video: updatedVideos };
            }
            return prevForm;
        });
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append form text fields
        formData.append('title_en', form.title_en);
        formData.append('title_ta', form.title_ta);
        formData.append('description_en', form.description_en);
        formData.append('description_ta', form.description_ta);
        formData.append('date_en', form.date_en ? new Date(form.date_en).toISOString().split('T')[0] : '');
        formData.append('date_ta', form.date_ta ? new Date(form.date_ta).toISOString().split('T')[0] : '');
        formData.append('isDisabled', form.isDisabled);
        formData.append('heading_en', form.heading_en);
        formData.append('heading_ta', form.heading_ta);
        formData.append('subHeading_en', form.subHeading_en);
        formData.append('subHeading_ta', form.subHeading_ta);
        formData.append('specialChairman_en', form.specialChairman_en);
        formData.append('specialChairman_ta', form.specialChairman_ta);
        formData.append('specialChairmanName_en', form.specialChairmanName_en);
        formData.append('specialChairmanName_ta', form.specialChairmanName_ta);
        formData.append('minister_en', form.minister_en);
        formData.append('minister_ta', form.minister_ta);
        formData.append('chairman_en', form.chairman_en);
        formData.append('chairman_ta', form.chairman_ta);
        formData.append('chairmanName_en', form.chairmanName_en);
        formData.append('chairmanName_ta', form.chairmanName_ta);
        formData.append('generalSecretary_en', form.generalSecretary_en);
        formData.append('generalSecretary_ta', form.generalSecretary_ta);
        formData.append('generalSecretaryName_en', form.generalSecretaryName_en);
        formData.append('generalSecretaryName_ta', form.generalSecretaryName_ta);

        // Handle existing and new images
        const existingImages = form.gallery_images.filter(file => !(file.file instanceof File));
        const newImages = form.gallery_images.filter(file => file.file instanceof File);

        formData.append('existingImages', JSON.stringify(existingImages.map(file => file.id)));
        newImages.forEach(fileData => {
            formData.append('gallery_images', fileData.file);
        });

        // Handle existing and new videos
        const existingVideos = form.video.filter(file => !(file.file instanceof File));
        const newVideos = form.video.filter(file => file.file instanceof File);

        formData.append('existingVideos', JSON.stringify(existingVideos.map(file => file.id)));
        newVideos.forEach(fileData => {
            formData.append('video', fileData.file);
        });

        // Handle the main image separately
        if (form.image && form.image.file instanceof File) {
            formData.append('image', form.image.file);
        }

        try {
            let response;
            if (editId) {
                response = await axios.put(`${process.env.REACT_APP_API_URL}/api/festival/festival/${editId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                response = await axios.post(`${process.env.REACT_APP_API_URL}/api/festival/festival`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            if (response.data.status === "success") {
                fetchData();
                setEditId(null);
                setMessage(editId ? 'Festival updated successfully' : 'Festival added successfully');
                setMessageType('success');
            } else {
                setMessage(`Failed to ${editId ? 'update' : 'add'} festival: ${response.data.message}`);
                setMessageType('error');
            }

            resetFormState();
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage('Error submitting form');
            setMessageType('error');
        } finally {
            setOpenSnackbar(true);
        }
    };

    const resetFormState = () => {
        setForm({
            title_en: '',
            title_ta: '',
            description_en: '',
            description_ta: '',
            date_en: '',
            date_ta: '',
            isDisabled: false,
            image: null,
            video: [],
            gallery_images: [],
            heading_en: '',
            heading_ta: '',
            subHeading_en: '',
            subHeading_ta: '',
            specialChairman_en: '',
            specialChairman_ta: '',
            specialChairmanName_en: '',
            specialChairmanName_ta: '',
            minister_en: '',
            minister_ta: '',
            chairman_en: '',
            chairman_ta: '',
            chairmanName_en: '',
            chairmanName_ta: '',
            generalSecretary_en: '',
            generalSecretary_ta: '',
            generalSecretaryName_en: '',
            generalSecretaryName_ta: ''
        });
        setIsFormVisible(false);
    };


    const handleAddClick = () => {
        setForm({
            title_en: '',
            title_ta: '',
            description_en: '',
            description_ta: '',
            date_en: '',
            date_ta: '',
            isDisabled: false,
            image: null,
            video: [],
            gallery_images: [],
            heading_en: '',
            heading_ta: '',
            subHeading_en: '',
            subHeading_ta: '',
            specialChairman_en: '',
            specialChairman_ta: '',
            specialChairmanName_en: '',
            specialChairmanName_ta: '',
            minister_en: '',
            minister_ta: '',
            chairman_en: '',
            chairman_ta: '',
            chairmanName_en: '',
            chairmanName_ta: '',
            generalSecretary_en: '',
            generalSecretary_ta: '',
            generalSecretaryName_en: '',
            generalSecretaryName_ta: ''
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
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom
                sx={{
                    pt: { xs: 6, sm: 0 },
                    textAlign: { xs: 'center', sm: 'left' }
                }}>
                Festival
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleAddClick}>
                    Add Festival
                </Button>
            </Box>
            {isFormVisible ? (
                <Box>
                    <Typography variant="h6" component="h2">
                        {editId ? 'Edit Festival' : 'Add Festival'}
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
                                const sanitizedData = DOMPurify.sanitize(data, { ALLOWED_TAGS: ['b', 'strong'] });
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
                                const sanitizedData = DOMPurify.sanitize(data, { ALLOWED_TAGS: ['b', 'strong'] });
                                handleInputChange({
                                    target: { name: 'description_ta', value: sanitizedData },
                                });
                            }}
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
                        {/* {form.image && (
                            <Box mt={2}>
                                <img src={form.image.filePath.startsWith('blob') ? form.image.filePath : `${process.env.REACT_APP_API_URL}/${form.image.filePath}`} alt="Festival" style={{ width: '150px', height: 'auto' }} />
                            </Box>
                        )} */}
                        {/* {form.image && (
    <Box mt={2}>
        <img
            src={
                typeof form.image === 'object' && form.image?.filePath?.startsWith('blob')
                    ? form.image.filePath
                    : `${process.env.REACT_APP_API_URL}/${form.image?.filePath || form.image}`
            }
            alt="Festival"
            style={{ width: '150px', height: 'auto' }}
        />
    </Box>
)} */}
{form.image && (
    <Box mt={2}>
        <img
            src={
                typeof form.image === 'object' && form.image?.filePath?.startsWith?.('blob')
                    ? form.image.filePath
                    : `${process.env.REACT_APP_API_URL}/${form.image?.filePath || form.image}`
            }
            alt="Festival"
            style={{ width: '150px', height: 'auto' }}
        />
    </Box>
)}


                        <label>Image: </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ marginTop: '16px' }}
                        /><br />

                        {/* Display Gallery Images in Grid */}
                        <Grid container spacing={2} mt={2}>
                            {form.gallery_images.map((fileData, index) => (
                                <Grid item xs={6} sm={4} md={3} key={index}>
                                    <Box
                                        position="relative"
                                        width="100%"
                                        paddingTop="100%"  // This sets the aspect ratio to 1:1 (square)
                                        overflow="hidden"
                                        borderRadius="8px" // Optional: Rounded corners
                                        className="group"
                                    >
                                        <img
                                            src={fileData.filePath.startsWith('blob') ? fileData.filePath : `${process.env.REACT_APP_API_URL}/${fileData.filePath}`}
                                            alt={`Gallery`}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '80%',
                                                // objectFit: 'cover', // Ensures the image covers the entire container
                                                borderRadius: 'inherit', // Inherit the border-radius from the container
                                            }}
                                        />
                                        <input
                                            type="file"
                                            name="gallery_images"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, index, fileData.id)}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                opacity: 0,
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            color='secondary'
                                            onClick={() => handleFileRemove('gallery_images', index)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8
                                            }}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>


                        <label>Add More Gallery Images: </label>
                        <input
                            type="file"
                            name="gallery_images"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleImageChange(e)}
                            style={{ marginTop: '16px' }}
                        /><br />

                        {/* Display Video */}
                        <Grid container spacing={2} mt={2}>
                            {form.video.map((fileData, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Box
                                        position="relative"
                                        width="100%"
                                        paddingTop="56.25%"
                                        overflow="hidden"
                                        borderRadius="8px"
                                        className="group"
                                    >
                                        <video
                                            src={fileData.filePath.startsWith('blob') ? fileData.filePath : `${process.env.REACT_APP_API_URL}/${fileData.filePath}`}
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
                                        <input
                                            type="file"
                                            name="video"
                                            accept="video/*"
                                            onChange={(e) => handleImageChange(e, index, fileData.id)}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                opacity: 0,
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleFileRemove('video', index)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8
                                            }}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>


                        <label>Video: </label>
                        <input
                            type="file"
                            name="video"
                            accept="video/*"
                            onChange={(e) => handleImageChange(e)}
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
                        <Table sx={{ minWidth: 650 }} aria-label="festival table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>S.No</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Title(EN)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Title(TA)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Description(EN)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Description(TA)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Date(EN)</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Date(TA)</TableCell>
                                  
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Edit</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.Id}</TableCell>
                                            <TableCell>{row.title_en}</TableCell>
                                            <TableCell>{row.title_ta}</TableCell>
                                            <TableCell dangerouslySetInnerHTML={{ __html: row.description_en}} />
                                            <TableCell dangerouslySetInnerHTML={{  __html: row.description_ta}} />
                                            <TableCell>{new Date(row.date_en).toISOString().split('T')[0]}</TableCell>
                                            <TableCell>{new Date(row.date_ta).toISOString().split('T')[0]}</TableCell>
                                           
                                            <TableCell>
                                                <Switch
                                                    checked={Boolean(row.isDisabled)}
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
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this festival?
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

export default Festival;