"use client";
import BackBtn from "@/components/backBtn";
import { Alert, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Expenses() {
  const [expensesFeedback, setExpensesFeedback] = useState(false);
	const expenseRouter = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      budgeted: 0,
      actual: 0,
    },
    onSubmit: async (values) => {
      const response = await fetch("/pages/api/expenses/setExpenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("user_id"),
          expense_name: values.name,
          expense_budgeted: values.budgeted,
          expense_actual: values.actual,
        }),
      });

      if (response.ok) {
        setExpensesFeedback(false);
        expenseRouter.push("/pages/expense-tracker/dashboard/");
      }
			else {
				setExpensesFeedback(true);
			}
    },
  });

  return (
    <section
      id="expenses"
      className="col-span-4 flex h-[70vh] flex-col items-center justify-center md:col-span-6 lg:col-span-12"
    >
      <div className="expenses-form-wrapper w-[80vw] rounded-md bg-primaryWhite p-4 shadow-md md:w-[60vw] lg:w-[40vw]">
        <h2 className="text-center">Add or Update Fixed Expenses</h2>
        <form
          action=""
          method="post"
          className="flex flex-col justify-between p-4"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            type="text"
            name="name"
            id="name"
            label="Expense Name"
            variant="outlined"
            required
            className="my-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          <TextField
            type="number"
            name="budgeted"
            id="budgeted"
            label="Budgeted Amount"
            variant="outlined"
            required
            className="my-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.budgeted}
          />

          <TextField
            type="number"
            name="actual"
            id="actual"
            label="Actual Amount"
            variant="outlined"
            required
            className="my-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.actual}
          />

          {expensesFeedback ? (
            <div className="expenses-feedback-wrapper my-2">
              <Alert severity="error">
                Adding or updating fixed expense was unsuccessful. Please try
                again.
              </Alert>
            </div>
          ) : (
            <div></div>
          )}

          <Button
            type="submit"
            variant="contained"
            className="bg-primaryBlack font-semibold"
          >
            Save
          </Button>
        </form>
        <BackBtn />
      </div>
    </section>
  );
}
