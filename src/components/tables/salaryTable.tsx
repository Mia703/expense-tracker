import {
  Alert,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Form from "../forms/form";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export default function SalaryTable() {
  const [salary, setSalary] = useState<number>(0);
  const [payday, setPayday] = useState<Date | null>(null);
  const [displaySalaryForm, setDisplaySalaryForm] = useState<boolean>(false);
  const [salaryFormFeedback, setSalaryFormFeedback] = useState<null | boolean>(
    null,
  );
  const number_formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/pages/api/salary/getSalary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: sessionStorage.getItem("user_id"),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSalary(data.message.salary as number);

        const date = new Date(data.message.payday);
        date.setDate(date.getDate() + 1); // increase the day by +1
        setPayday(date);
      } else {
        setSalary(0);
      }
    }
    fetchData();
  }, [displaySalaryForm]);

  function formatFeedback() {
    if (salaryFormFeedback == null) {
      return <></>;
    } else if (salaryFormFeedback) {
      return <Alert severity="success">Set salary successful!</Alert>;
    } else {
      return (
        <Alert severity="error">
          Set salary un-successful, please try again.
        </Alert>
      );
    }
  }

  const formik = useFormik({
    initialValues: {
      salary: 0,
      payday: "",
    },
    onSubmit: async (values) => {
      const response = await fetch("/pages/api/salary/setSalary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: sessionStorage.getItem("user_id"),
          salary: values.salary,
          payday: `${values.payday}T00:00:00Z`,
        }),
      });

      if (response.ok) {
        formik.resetForm();
        setSalaryFormFeedback(true);
        setSalary(values.salary);
      } else {
        setSalaryFormFeedback(false);
      }
    },
  });

  return (
    <div className="salary-table-wrapper">
      <TableContainer component={Paper} className="table-wrapper my-4">
        <Table aria-label="Salary Table" size="small" id="salary-table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} className="font-bold">
                Summary
              </TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={() => {
                    setDisplaySalaryForm(true);
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold" colSpan={2}>
                Date
              </TableCell>
              {payday ? (
                <TableCell align="right">
                  {payday.toLocaleDateString()}
                </TableCell>
              ) : (
                <TableCell align="right"></TableCell>
              )}
            </TableRow>
            <TableRow>
              <TableCell className="font-bold" colSpan={2}>
                Total Salary
              </TableCell>
              <TableCell align="right">
                {number_formatter.format(salary)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold" colSpan={2}>
                Remaining
              </TableCell>
              <TableCell align="right">$0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {displaySalaryForm ? (
        <Form>
          <Paper elevation={3} className="w-full p-4 md:w-[70vw] lg:w-[50vw]">
            <div className="button-wrapper flex flex-col items-end justify-end">
              <IconButton
                onClick={() => {
                  setSalaryFormFeedback(null);
                  setDisplaySalaryForm(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div>
              <h2 className="text-center">Add or Update Salary</h2>
              <form
                id="salary-form"
                action=""
                method="post"
                onSubmit={formik.handleSubmit}
                className="flex flex-col p-4"
              >
                <TextField
                  type="number"
                  id="salary"
                  name="salary"
                  label="Salary ($)"
                  variant="outlined"
                  className="my-3"
                  required
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.salary}
                />

                <label htmlFor="payday" className="mt-4 font-bold">
                  Payday
                </label>
                <TextField
                  type="date"
                  id="payday"
                  name="payday"
                  variant="outlined"
                  className="mb-3 mt-1"
                  required
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.payday}
                />
                {formatFeedback()}
                <Button
                  type="submit"
                  variant="contained"
                  className="mt-4 bg-primaryBlack font-semibold"
                >
                  Update Salary
                </Button>
              </form>
            </div>
          </Paper>
        </Form>
      ) : (
        <div></div>
      )}
    </div>
  );
}
