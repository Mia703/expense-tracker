"use client";
import { Alert, Button, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [message, setMessage] = useState(false);
  const signupRouter = useRouter();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      // console.log(values);

      const response = await fetch("/pages/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        setMessage(false);

        const data = await response.json();
        const id = data.message.split('id:')[1].trim();
        localStorage.setItem('user_id', id);
        
        signupRouter.push("/pages/expense-tracker/dashboard");
      } else {
        setMessage(true);
      }
    },
  });

  return (
    <section
      id="signup"
      className="col-span-4 flex h-[90vh] flex-col items-center justify-center md:col-span-6 lg:col-span-12"
    >
      <div id="signup-wrapper" className="w-full p-4 md:w-[50vw] lg:w-[30vw]">
        <h1 className="mb-6 text-center">Expense Tracker</h1>
        <Paper elevation={3} className="p-6">
          <h2 className="mb-4">Sign Up</h2>
          <form
            action=""
            method="post"
            className="flex flex-col justify-between"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              type="text"
              id="fullName"
              label="Full Name"
              variant="outlined"
              required
              className="my-2 mt-6"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
            <TextField
              type="email"
              id="email"
              label="Email Address"
              variant="outlined"
              required
              className="my-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <TextField
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              required
              className="my-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {message ? (
              <div className="alert-wrapper">
                <Alert severity="error">
                  Email already exists. Please try logging in or forgot
                  password.
                </Alert>
              </div>
            ) : (
              <div className="alert-wrapper"></div>
            )}
            <Button
              type="submit"
              variant="contained"
              className="my-4 bg-primaryBlack font-semibold"
            >
              Sign Up
            </Button>
          </form>
          <div className="login-wrapper flex flex-row items-center justify-center">
            <p>Already have an account?</p>
            <Link href={"/"} className="mx-1 font-bold">
              Login
            </Link>
          </div>
          <div className="forgot-password-wrapper text-center">
            <Link href={"/pages/auth/password-reset"} className="font-bold">
              Forgot Password?
            </Link>
          </div>
        </Paper>
      </div>
    </section>
  );
}
