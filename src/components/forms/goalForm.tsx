import { Alert, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";

export default function GoalForm() {
  const [goalFeedback, setGoalFeedback] = useState<string | null>(null);

  function renderFeedback(feedback: string | null) {
    if (feedback == null) {
      return <div></div>;
    } else if (feedback == "no-salary") {
      return (
        <Alert severity="error">
          Could not add or update goal because there is no salary. Please create
          a salary first.
        </Alert>
      );
    } else if (feedback == "zero-salary") {
      return (
        <Alert severity="error">
          Could not add or update goal because salary is zero. Please update
          salary.
        </Alert>
      );
    } else if (feedback == "error") {
      return (
        <Alert severity="error">
          Add or update goal was unsuccessful. Please try again.
        </Alert>
      );
    } else {
      return (
        <Alert severity="success">
          Add or update goal successful. Remember to refresh the page upon exit.
        </Alert>
      );
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      target: 0,
      contribution: 0,
    },
    onSubmit: async (values) => {
      const response = await fetch("/pages/api/goal/setGoal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("user_id"),
          goal_name: values.name.toLowerCase(),
          goal_target: values.target,
          goal_contribution: values.contribution,
        }),
      });

      if (response.ok) {
        setGoalFeedback("success");
      } else {
        const data = await response.json();
        const response_error = data.message.split("error:")[1];
        setGoalFeedback(response_error);
      }
      formik.resetForm();
    },
  });

  return (
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
        label="Goal Name"
        variant="outlined"
        required
        className="my-2"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.name}
      />

      <TextField
        type="number"
        name="target"
        id="target"
        label="Target Amount"
        variant="outlined"
        required
        className="my-2"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.target}
      />

      <TextField
        type="number"
        name="contribution"
        id="contribution"
        label="Amount Contributed"
        variant="outlined"
        required
        className="my-2"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.contribution}
      />

      {renderFeedback(goalFeedback)}

      <Button
        type="submit"
        variant="contained"
        className="my-4 bg-primaryBlack font-semibold"
      >
        Save
      </Button>
    </form>
  );
}
