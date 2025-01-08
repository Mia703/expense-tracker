"use client";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

interface WelcomeProps {
  displayWelcome: boolean;
}

export const Welcome: React.FC<WelcomeProps> = ({ displayWelcome }) => {
  const refreshDashboard = useRouter();

  const formik = useFormik({
    initialValues: {
      salary: 0,
      frequency: "",
      date: "",
    },
    onSubmit: async (values) => {
      const response = await fetch("/pages/api/welcome", {
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
      // refresh dashboard page to hide welcome form
      if (response.ok) {
        refreshDashboard.push("/pages/expense-tracker/dashboard");
      }
    },
  });

  return !displayWelcome ? (
    <div className="welcome-wrapper pointer-events-none fixed left-0 top-0 flex h-dvh w-full flex-col items-center justify-center bg-gray-900/45">
      <div className="welcome-form-wrapper pointer-events-auto w-[80vw] rounded-md bg-primaryWhite p-4 md:w-[60vw] lg:w-[40vw]">
        <div className="message-wrapper my-2 text-center">
          <h2 className="mb-2">Welcome to Expense Tracker!</h2>
          <p>
            Expense tracker is an easy-to-use, table-based expense tracker for
            dummies. To get started, simply{" "}
            <span className="font-semibold">
              enter your current or expected salary, how often you get paid, and
              the starting date of your payroll
            </span>
            .
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
            value={formik.values.salary}
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

          <Button
            type="submit"
            variant="contained"
            className="my-4 bg-primaryBlack font-semibold"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
