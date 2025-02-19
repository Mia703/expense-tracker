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

export default function ExpensesNeedsTable() {
  const [displayFixedExpensesForm, setDisplayFixedExpensesForm] = useState(false);

  const number_formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="expenses-needs-table-wrapper my-4">
      <TableContainer component={Paper} className="table-wrapper">
        <div className="table-header-wrapper flex flex-row items-center justify-between rounded-t-md bg-gray-300 p-1 px-2">
          <h3>Expenses: Needs - 30%</h3>
          <IconButton
            size="small"
            onClick={() => {
              setDisplayFixedExpensesForm(true);
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </div>
        <Table
          id="expenses-needs-table"
          aria-label="Expenses Needs Table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <p className="font-bold">Expense</p>
              </TableCell>
              <TableCell>
                <p className="font-bold">Budgeted</p>
              </TableCell>
              <TableCell>
                <p className="font-bold">Actual</p>
              </TableCell>
              <TableCell>
                <p className="font-bold">Remaining</p>
              </TableCell>
              <TableCell className="trash-cell"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {}
            <TableRow>
              <TableCell className="capitalize">Groceries</TableCell>
              <TableCell>${number_formatter.format(45)}</TableCell>
              <TableCell>${number_formatter.format(100)}</TableCell>
              <TableCell>${number_formatter.format(45-100)}</TableCell>
              <TableCell align="right">
                <IconButton size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {displayFixedExpensesForm ? (
        <div className="background fixed left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center bg-primaryGrey/25 p-8">
          <Paper elevation={3} className="w-full p-4 md:w-[70vw] lg:w-[50vw]">
            <div className="button-wrapper flex flex-col items-end justify-end">
              <IconButton
                onClick={() => {
                  setDisplayFixedExpensesForm(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <h2 className="text-center capitalize">Add or update fixed expenses</h2>
            {/* TODO: insert fixed expense form here */}
          </Paper>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
