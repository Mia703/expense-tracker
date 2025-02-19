import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";

export default function SavingsTable() {
  const [displayAccountForm, setDisplayAccountForm] = useState(false);

  const number_formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="savings-table-wrapper my-4">
      <TableContainer component={Paper} className="table-wrapper">
        <div className="table-header-wrapper flex flex-row items-center justify-between rounded-t-md bg-gray-300 p-1 px-2">
          <h3>Savings & Debit Repayment - 50%</h3>
          <IconButton
            size="small"
            onClick={() => {
              setDisplayAccountForm(true);
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </div>
        <Table id="savings-table" aria-label="Savings Table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <p className="font-bold">Account</p>
              </TableCell>
              <TableCell>
                <p className="font-bold">Contribution</p>
              </TableCell>
              <TableCell>
                <p className="font-bold">Balance after contribution</p>
              </TableCell>
              <TableCell className="trash-cell"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {}
            <TableRow>
              <TableCell className="capitalize">Savings account</TableCell>
              <TableCell>${number_formatter.format(45)}</TableCell>
              <TableCell>${number_formatter.format(100)}</TableCell>
              <TableCell align="right">
                <IconButton size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {displayAccountForm ? (
        <div className="background fixed left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center bg-primaryGrey/25 p-8">
          <Paper elevation={3} className="w-full p-4 md:w-[70vw] lg:w-[50vw]">
            <div className="button-wrapper flex flex-col items-end justify-end">
              <IconButton
                onClick={() => {
                  setDisplayAccountForm(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <h2 className="text-center capitalize">Add or update account</h2>
            {/* TODO: insert account form here */}
          </Paper>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
