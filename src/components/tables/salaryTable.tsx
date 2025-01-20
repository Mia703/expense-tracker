import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import SalaryForm from "../forms/salaryForm";
import CloseIcon from "@mui/icons-material/Close";

export default function SalaryTable() {
  const [salary, setSalary] = useState(0);
  const [displaySalaryForm, setDisplaySalaryForm] = useState(false);
  const number_formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const fifty_percent = salary * 0.5;
  const thirty_percent = salary * 0.3;
  const twenty_percent = salary * 0.2;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/pages/api/salary/getSalary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("user_id"),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSalary(data.message.split("salary:")[1].trim());
      } else {
        setSalary(0);
      }
    }

    fetchData();
  }, [displaySalaryForm]);

  return (
    <div className="salary-table-wrapper">
      <div className="button-wrapper my-2 flex w-full flex-col items-end justify-end">
        <Button
          variant="contained"
          className="bg-primaryBlack font-semibold"
          onClick={() => {
            setDisplaySalaryForm(true);
          }}
        >
          Update Salary
        </Button>
      </div>

      <TableContainer component={Paper} className="table-wrapper my-4">
        <Table aria-label="Salary Table" size="small" id="salary-table">
          <TableHead className="bg-gray-300">
            <TableRow>
              <TableCell className="font-bold">
                <p className="font-bold">Salary</p>
              </TableCell>
              <TableCell align="right" className="font-bold">
                ${number_formatter.format(salary)}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="text-gray-500">
                50% for savings and debit repayment
              </TableCell>
              <TableCell align="right" className="text-gray-500">
                ${number_formatter.format(fifty_percent)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-gray-500">
                30% for expense needs
              </TableCell>
              <TableCell align="right" className="text-gray-500">
                ${number_formatter.format(thirty_percent)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-gray-500">
                20% for expense wants
              </TableCell>
              <TableCell align="right" className="text-gray-500">
                ${number_formatter.format(twenty_percent)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {displaySalaryForm ? (
        <div className="background fixed left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center bg-primaryGrey/25 p-8">
          <Paper elevation={3} className="w-full p-4 md:w-[70vw] lg:w-[50vw]">
            <div className="button-wrapper flex flex-col items-end justify-end">
              <IconButton
                onClick={() => {
                  setDisplaySalaryForm(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <h2 className="text-center">Add Salary</h2>
            <SalaryForm />
          </Paper>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
