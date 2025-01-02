"use client";
import { Alert, Button, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";

export default function PasswordReset() {
  const [message, setMessage] = useState("");

  function renderPasswordResetFeedback(feedback: string) {
    if (feedback == "") {
      return <div></div>;
    } else if (feedback == "good") {
      return (
        <div className="reset-feedback-wrapper my-2">
          <Alert severity="success">Password reset was successful.</Alert>
        </div>
      );
    } else {
      return (
        <div className="reset-feedback-wrapper my-2">
          <Alert severity="error">
            Password reset was unsuccessful, email does not exist. Please try again.
          </Alert>
        </div>
      );
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: async (values) => {
      // console.log(values);

      const response = await fetch("/pages/api/passwordReset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          newPassword: values.newPassword,
        }),
      });

      if (response.ok) {
        setMessage("good");
      } else {
        setMessage("bad");
      }
    },
  });

  return (
    <section
      id="password-reset"
      className="col-span-4 flex h-[90vh] flex-col items-center justify-center md:col-span-6 lg:col-span-12"
    >
      <div
        id="password-reset-wrapper"
        className="w-full p-4 md:w-[50vw] lg:w-[30vw]"
      >
        <h1 className="mb-6 text-center">Expense Tracker</h1>
        <Paper elevation={3} className="p-6">
          <h2 className="mb-4">Password Reset</h2>
          <form
            action=""
            method="post"
            className="flex flex-col justify-between"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              type="email"
              id="email"
              label="Email Address"
              variant="outlined"
              required
              className="my-2"
              onBlur={formik.handleChange}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <TextField
              type="password"
              id="newPassword"
              label="New Password"
              variant="outlined"
              required
              className="my-2"
              onBlur={formik.handleChange}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
            />

            {renderPasswordResetFeedback(message)}

            <Button
              type="submit"
              variant="contained"
              className="my-4 bg-primaryBlack"
            >
              Reset Password
            </Button>
          </form>
          <div className="signup-wrapper flex flex-row items-center justify-center">
            <p>Don&apos;t have an account?</p>
            <Link href={"/pages/auth/signup"} className="mx-1 font-bold">
              Sign Up
            </Link>
          </div>
          <div className="login-wrapper text-center">
            <Link href={"/"} className="font-bold">
              Back to Login
            </Link>
          </div>
        </Paper>
      </div>
    </section>
  );
}
