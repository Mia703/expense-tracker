"use client";
import BackBtn from "@/components/backBtn";
import { Alert, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Goals() {
  // TODO: add Yup to avoid adding negative numbers

  const [goalFeedback, setGoalFeedback] = useState("");
  const goalRouter = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      target: 0,
      current: 0,
    },
    onSubmit: async (values) => {
      const response = await fetch("/pages/api/goals/setGoals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("user_id"),
          goal_name: values.name,
          goal_target: values.target,
          goal_current: values.current,
        }),
      });

      if (response.ok) {
        setGoalFeedback("");
        goalRouter.push("/pages/expense-tracker/dashboard");
      } else {
        const data = await response.json();
        const message = data.message.split("client:")[1];
        // message return `undefined` if there is no 'client:' from data.message
        if (message) {
          setGoalFeedback(
            "Cannot create goal because salary is zero. Please update salary first.",
          );
        } else {
          setGoalFeedback(
            "Create or update goal was unsuccessful. Pleas try again.",
          );
        }
      }
    },
  });

  return (
    <section
      id="goals"
      className="col-span-4 flex h-[70vh] flex-col items-center justify-center md:col-span-6 lg:col-span-12"
    >
      <div className="goal-form-wrapper w-[80vw] rounded-md bg-primaryWhite p-4 shadow-md md:w-[60vw] lg:w-[40vw]">
        <h2 className="text-center">Add or Update Goal</h2>

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
            name="current"
            id="current"
            label="Current Amount"
            variant="outlined"
            required
            className="my-2"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.current}
          />

          {goalFeedback != "" ? (
            <div className="goal-feedback-wrapper my-2">
              <Alert severity="error">{goalFeedback}</Alert>
            </div>
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
        <BackBtn />
      </div>
    </section>
  );
}
