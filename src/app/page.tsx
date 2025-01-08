"use client";

import { Alert, Button, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState(false);
  const loginRouter = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      // console.log(values);

      const response = await fetch("/pages/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      
      // if response.status is between 200-299
      if (response.ok) {
        setMessage(false);

        // save user's id in localstorage for later retrieval
        const data = await response.json();
        const id = data.message.split('id:')[1].trim();
        localStorage.setItem('user_id', id);
        
        // reroute to budget page
        loginRouter.push("/pages/expense-tracker/budget");
      } else {
        setMessage(true); // display client-side error message
        // console.log(data);
      }
    },
  });

  return (
    <section
      id="login"
      className="col-span-4 flex h-[90vh] flex-col items-center justify-center md:col-span-6 lg:col-span-12"
    >
      <div id="login-wrapper" className="w-full p-4 md:w-[50vw] lg:w-[30vw]">
        <h1 className="mb-6 text-center">Expense Tracker</h1>
        <Paper elevation={3} className="p-6">
          <h2 className="mb-4">Login</h2>
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
              className="my-6"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <Link
              href={"/pages/auth/password-reset/"}
              className="text-right text-sm font-bold"
            >
              Forgot Password?
            </Link>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              required
              className="my-2 mb-4"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
            />
            {message ? (
              <div className="login-feedback-wrapper my-2">
                <Alert severity="error">
                  Login was not successful. Please try again.
                </Alert>
              </div>
            ) : (
              <div></div>
            )}
            <Button
              type="submit"
              variant="contained"
              className="my-4 bg-primaryBlack font-semibold"
            >
              Login
            </Button>
          </form>
          <div className="signup-wrapper flex flex-row items-center justify-center">
            <p>Don&apos;t have an account?</p>
            <Link href={"/pages/auth/signup"} className="mx-1 font-bold">
              Sign Up
            </Link>
          </div>
        </Paper>
      </div>
    </section>
  );
}
