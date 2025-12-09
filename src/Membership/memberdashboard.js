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
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Header from '../header/header';

const MembershipDashboard = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/member/membership`);
            if (response.data.status === "success") {
                const updatedData = response.data.data.map((item, index) => ({
                    ...item,
                    Id: index + 1,
                    isDisabled: item.isDisabled || false,
                }));
                setData(updatedData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
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

    return (
        <>
            <Header />
            <div className="flex pt-[5%]">
                <Box sx={{ p: 2 }}>
                    <Typography variant="h4" component="h4" gutterBottom sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                        Members List
                    </Typography>

                    <TableContainer component={Paper} sx={{ paddingTop: "20px" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="members table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>S.No</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Full Name</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Address</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Date of Birth</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Gender</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Phone</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Email</TableCell>
                                    <TableCell style={{ fontSize: '16px', fontWeight: 'bold' }}>Membership Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data
                                    .filter(row => row.isDisabled)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>{row.fullName}</TableCell>
                                            <TableCell>{row.address}</TableCell>
                                            <TableCell>{new Date(row.dateOfBirth).toISOString().split('T')[0]}</TableCell>
                                            <TableCell>{row.gender}</TableCell>
                                            <TableCell>{row.phone}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.membershipType}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.filter(row => row.isDisabled).length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity={messageType} sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                </Box>
            </div>
        </>
    );
};

export default MembershipDashboard;