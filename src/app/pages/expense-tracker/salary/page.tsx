"use client";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Salary() {
  const [salaryFeedback, setSalaryFeedback] = useState(false);
  const salaryRouter = useRouter();

  const formik = useFormik({
    initialValues: {
      salary: 0,
      frequency: "",
      date: "",
    },
    onSubmit: async (values) => {
      const response = await fetch("/pages/api/salary/addSalary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("user_id"),
          salary: values.salary,
          frequency: values.frequency,
          date: `${values.date}T00:00:00Z`,
        }),
      });

      // if creating salary for user was successful
      // go to dashboard page
      if (response.ok) {
        salaryRouter.push("/pages/expense-tracker/dashboard/");
      } else {
        setSalaryFeedback(true);
      }
    },
  });

  return (
    <section
      id="salary"
      className="col-span-4 flex h-[70vh] flex-col items-center justify-center md:col-span-6 lg:col-span-12"
    >
      <div className="salary-form-wrapper w-[80vw] rounded-md bg-primaryWhite p-4 shadow-md md:w-[60vw] lg:w-[40vw]">
        <div className="message-wrapper my-2 text-center">
          <h2 className="mb-2 capitalize">Set your salary</h2>
          <p>
            Enter your current or expected salary, how often you get paid, and
            the starting date of your payroll.
          </p>
        </div>

        <form
          action=""
          method="post"
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-between p-4"
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
            value={formik.values.salary == 0 ? "" : formik.values.salary}
          />

          <FormControl fullWidth className="my-3">
            <InputLabel id="frequency-label">Payroll Frequency</InputLabel>
            <Select
              labelId="frequency-label"
              id="frequency"
              name="frequency"
              label="Payroll Frequency"
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.frequency}
            >
              <MenuItem value={"weekly"}>Weekly (once every week)</MenuItem>
              <MenuItem value={"bi-weekly"}>
                Bi-Weekly (once every other week)
              </MenuItem>
              <MenuItem value={"semi-monthly"}>
                Semi-Monthly (twice per month)
              </MenuItem>
              <MenuItem value={"monthly"}>Monthly (once per month)</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="date"
            id="date"
            name="date"
            variant="outlined"
            className="my-3"
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.date}
          />

          {salaryFeedback ? (
            <Alert severity="error">
              Salary update was un-successful. Please try again.
            </Alert>
          ) : (
            <div></div>
          )}
          <Button
            type="submit"
            variant="contained"
            className="my-4 bg-primaryBlack font-semibold"
          >
            Save
          </Button>
        </form>
        <div className="back-btn-wrapper">
          <Link
            href={"/pages/expense-tracker/dashboard"}
            className="font-bold text-gray-400"
          >
            {<ArrowBackIcon />} Back to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
