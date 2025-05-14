import React, { useEffect, useState } from "react";
import "./ManageStudent.css";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 2,
    borderRadius: "10px",
    width: "20%",
    p: 4,
};

function ManageStudent() {
    //MARK: LOGIC
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();

    const initialData = {
        id: "",
        firstname: "",
        lastname: "",
        middlename: "",
        course: "",
        year: "",
    };

    const [currentUser, setCurrentUser] = useState(initialData);

    function handleOpen(user, edit) {
        // Open the modal and set the current user
        setOpen(true);
        setIsEditMode(edit);
        setCurrentUser(user);
    }

    function handleClose() {
        setOpen(false);
    }

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            console.log("User not logged in");
            navigate("/");
        }
        axios
            .get(`http://localhost:1337/viewstudentsmongo`)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [refreshData, navigate]);

    const handleChange = (e) => {
        setCurrentUser({
            ...currentUser,
            [e.target.name || e.target.id]: e.target.value,
        });
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:1337/updatestudentmongo",
                currentUser
            );

            const result = response.data;

            if (result.success) {
                alert(result.message);
                setRefreshData(!refreshData);
                setOpen(false);
            } else {
                alert("Failed to update student. Please try again!.");
            }
        } catch (error) {
            console.error("Error updating student:", error);
            alert("An error occured. Please try again.");
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:1337/addstudentmongo",
                currentUser
            );

            const result = await response.data;
            console.log(currentUser.id);
            if (result.success) {
                setRefreshData(!refreshData);
                setOpen(false);
            }
            alert(result.message);
        } catch (error) {
            console.error("Error adding student:", error);
            alert("An error occured. Please try again.");
        }
    };

    //MARK: DISPLAY
    return (
        <div className="manageUser">
            <Sidebar />
            <div className="manageuserContainer">
                <h1>MANAGE STUDENT</h1>
                <div className="addbutton">
                    <Button
                        variant="contained"
                        onClick={() => handleOpen(users, false)}
                    >
                        ADD STUDENT
                    </Button>
                    <br />
                </div>
                <TableContainer style={{ maxHeight: 500 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Middle Name</TableCell>
                                <TableCell>Course</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>EDIT</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {users.map((users) => (
                                <TableRow key={users.id}>
                                    <TableCell>{users.id}</TableCell>
                                    <TableCell>{users.firstname}</TableCell>
                                    <TableCell>{users.lastname}</TableCell>
                                    <TableCell>{users.middlename}</TableCell>
                                    <TableCell>{users.course}</TableCell>
                                    <TableCell>{users.year}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                handleOpen(users, true)
                                            }
                                        >
                                            EDIT
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal open={open} onClose={handleClose}>
                    <Box sx={style} className="box">
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            User Information
                        </Typography>
                        {currentUser && (
                            <form
                                className="editModalText"
                                onSubmit={
                                    isEditMode
                                        ? handleUpdateUser
                                        : handleAddUser
                                }
                            >
                                <TextField
                                    required
                                    id="id"
                                    disabled={isEditMode}
                                    label="ID Number"
                                    variant="outlined"
                                    value={currentUser.id}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 8 }}
                                />

                                <TextField
                                    required
                                    id="firstname"
                                    label="First Name"
                                    variant="outlined"
                                    value={currentUser.firstname}
                                    onChange={handleChange}
                                    inputProps={{ pattern: "^[A-Za-z]+$" }}
                                />

                                <TextField
                                    required
                                    id="lastname"
                                    label="Last Name"
                                    variant="outlined"
                                    value={currentUser.lastname}
                                    onChange={handleChange}
                                    inputProps={{ pattern: "^[A-Za-z]+$" }}
                                />

                                <TextField
                                    id="middlename"
                                    label="Middle Name"
                                    variant="outlined"
                                    value={currentUser.middlename}
                                    onChange={handleChange}
                                    inputProps={{ pattern: "^[A-Za-z]+$" }}
                                />

                                <TextField
                                    required
                                    id="course"
                                    label="Course"
                                    variant="outlined"
                                    value={currentUser.course}
                                    onChange={handleChange}
                                    inputProps={{ pattern: "^[A-Za-z]+$" }}
                                />

                                <FormControl variant="outlined" required>
                                    <InputLabel id="year-label">
                                        Year
                                    </InputLabel>
                                    <Select
                                        labelId="year-label"
                                        name="year"
                                        value={currentUser.year}
                                        onChange={handleChange}
                                        label="Year"
                                    >
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="3">3</MenuItem>
                                        <MenuItem value="4">4</MenuItem>
                                        <MenuItem value="5">5</MenuItem>
                                    </Select>
                                </FormControl>
                                <div className="buttonGroup">
                                    <Button
                                        variant="contained"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </Button>
                                    <Button variant="contained" type="submit">
                                        SAVE
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default ManageStudent;
