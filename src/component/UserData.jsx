import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../slice/dataSlice";

function UserData() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const data = useSelector((state) => state.dataSlice.data);
  console.log(data);
  const loading = useSelector((state) => state.dataSlice.loading);

  const api_call = () => {
    dispatch(fetchData());
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
    <Stack sx={{background:'#a52a2a61' , height:'100vh' , overflow:'auto' , pb:2}}>
      <Button
        sx={{
          background: "#9f6319",
          color: "white",
          fontWeight: "bold",
          ":hover": {
            background: "darkorange",
          },
        }}
        onClick={api_call}
      >
        Api fetch
      </Button>
      <Box>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            padding: "20px",
            fontSize: "40px",
            textAlign: "center",
            fontStyle: "italic",
            color: "darkblue",
            fontWeight: "bold",
          }}
        >
          USER DETAILES
        </Typography>
        {loading ? (
          <Typography sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Typography>
        ) : (
          <Box>
            {data.length > 0 && (
              <Paper
                sx={{
                  width: "89%",
                  overflow: "hidden",
                  padding: "12px",
                  margin: "auto",
                  boxShadow: 10,
                }}
              >
                <Divider />
                <Box height={10} />
                <Stack
                  direction="row"
                  spacing={2}
                  className="my-2 mb-2"
                ></Stack>
                <Box height={10} />
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          style={{
                            minWidth: "100px",
                            color: "darkgreen",
                            fontWeight: "bold",
                            fontSize: "18px",
                            fontStyle: "italic",
                            textDecoration: "underline",
                          }}
                        >
                          ID
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            minWidth: "100px",
                            color: "darkgreen",
                            fontWeight: "bold",
                            fontSize: "18px",
                            fontStyle: "italic",
                            textDecoration: "underline",
                          }}
                        >
                          USRE ID
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            minWidth: "100px",
                            color: "darkgreen",
                            fontWeight: "bold",
                            fontSize: "18px",
                            fontStyle: "italic",
                            textDecoration: "underline",
                          }}
                        >
                          TITLE
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            minWidth: "100px",
                            color: "darkgreen",
                            fontWeight: "bold",
                            fontSize: "18px",
                            fontStyle: "italic",
                            textDecoration: "underline",
                          }}
                        >
                          BODY
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              <TableCell align="left">{row.id}</TableCell>
                              <TableCell align="left">{row.userId}</TableCell>
                              <TableCell align="left">{row.title}</TableCell>
                              <TableCell align="left">{row.body}</TableCell>
                            </TableRow>
                          );
                        })}
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
              </Paper>
            )}
          </Box>
        )}
      </Box>
      </Stack>
    </>
  );
}

export default UserData;
