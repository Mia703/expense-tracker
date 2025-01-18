"use client";
import { Alert, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";

export default function SalaryForm() {
  const [salaryFeedback, setSalaryFeedback] = useState<boolean | null>(null);

  function renderFeedback(feedback: boolean | null) {
    if (feedback == null) {
      return <div></div>;
    } else if (feedback) {
      return (
        <Alert severity="error">
          Salary update unsuccessful. Please try again.
        </Alert>
      );
    } else {
      return <Alert severity="success">Salary update successful.</Alert>;
    }
  }

  const formik = useFormik({
    initialValues: {
      salary: 0,
      payday: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const response = await fetch("/pages/api/salary/addSalary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("user_id"),
          salary: values.salary,
          payday: `${values.payday}T00:00:00Z`,
        }),
      });

      if (response.ok) {
        setSalaryFeedback(false);
      } else {
        setSalaryFeedback(true);
      }
    },
  });

  return (
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

      <label htmlFor="payday">Payday</label>
      <TextField
        type="date"
        id="payday"
        name="payday"
        variant="outlined"
        className="my-3"
        required
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.payday}
      />

      {renderFeedback(salaryFeedback)}

      <Button
        type="submit"
        variant="contained"
        className="my-4 bg-primaryBlack font-semibold"
      >
        Update Salary
      </Button>
    </form>
  );
}
