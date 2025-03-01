import {
  Button,
  FormLabel,
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
import FormTemplate from "../forms/formTemplate";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useSalary } from "@/app/context/SalaryContext";
import { getSalaryData, setSalaryData } from "@/app/utils/salary";
import { formatFeedback } from "@/app/utils/feedback";

export default function SalaryTable() {
  const { salary, setSalary } = useSalary(); // global salary context

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
    async function fetchSalary() {
      const data = await getSalaryData();

      if (data) {
        const payday = new Date(data.message.payday);
        payday.setDate(payday.getDate() + 1);

        setSalary({
          id: data.message.id,
          salary: data.message.salary,
          payday,
        });
      }
    }
    fetchSalary();
  }, [displaySalaryForm, setSalary]);

  const formik = useFormik({
    initialValues: {
      salary: 0,
      payday: "",
    },
    onSubmit: async (values) => {
      const data = await setSalaryData(
        values.salary,
        `${values.payday}T00:00:00Z`,
      );

      if (data) {
        const payday = new Date(data.message.payday);
        payday.setDate(payday.getDate() + 1); // increase the day by +1

        setSalary({
          id: data.message.id,
          salary: values.salary,
          payday,
        });

        formik.resetForm();
        setSalaryFormFeedback(true);
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

              {salary ? (
                <TableCell align="right">
                  {salary.payday instanceof Date
                    ? salary.payday.toLocaleDateString()
                    : salary.payday}
                </TableCell>
              ) : (
                <TableCell align="right"></TableCell>
              )}
            </TableRow>
            <TableRow>
              <TableCell className="font-bold" colSpan={2}>
                Total Salary
              </TableCell>

              {salary ? (
                <TableCell align="right">
                  {number_formatter.format(salary.salary)}
                </TableCell>
              ) : (
                <TableCell align="right"></TableCell>
              )}
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
        <FormTemplate>
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

                <FormLabel htmlFor="payday" className="mt-4 font-bold">
                  Payday
                </FormLabel>
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

                {formatFeedback(
                  salaryFormFeedback,
                  "Set salary successful!",
                  "Set salary un-successful, please try again.",
                )}

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
        </FormTemplate>
      ) : (
        <div></div>
      )}
    </div>
  );
}
