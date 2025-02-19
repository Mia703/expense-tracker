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

export default function ExpensesWantsTable() {
  const [displayExpensesWantsForm, setDisplayExpensesWantsForm] =
    useState(false);

  const number_formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="expenses-wants-table-wrapper my-4">
      <TableContainer component={Paper} className="table-wrapper">
        <div className="table-header-wrapper flex flex-row items-center justify-between rounded-t-md bg-gray-300 p-1 px-2">
          <h3>Expenses: Wants - 20%</h3>
          <IconButton
            size="small"
            onClick={() => {
              setDisplayExpensesWantsForm(true);
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </div>
        <Table
          id="expenses-wants-table"
          aria-label="Expenses Wants Table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <p className="font-bold">Name</p>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <p className="font-bold">Description</p>
              </TableCell>
              <TableCell>
                <p className="font-bold">Date</p>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <p className="font-bold">Account</p>
              </TableCell>
              <TableCell>
                <p className="font-bold">Amount</p>
              </TableCell>
              <TableCell className="trash-cell"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {}
            <TableRow>
              <TableCell className="capitalize">SHEIN</TableCell>
              <TableCell className="hidden md:table-cell">
                something interesting
              </TableCell>
              <TableCell className="capitalize">9/12/2025</TableCell>
              <TableCell className="hidden md:table-cell">
                Savings Accounts
              </TableCell>
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

      {displayExpensesWantsForm ? (
        <div className="background fixed left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center bg-primaryGrey/25 p-8">
          <Paper elevation={3} className="w-full p-4 md:w-[70vw] lg:w-[50vw]">
            <div className="button-wrapper flex flex-col items-end justify-end">
              <IconButton
                onClick={() => {
                  setDisplayExpensesWantsForm(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <h2 className="text-center capitalize">Add or update expense</h2>
            {/* TODO: insert account form here */}
          </Paper>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
