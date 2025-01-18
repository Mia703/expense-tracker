"use client";

import { AuthFormWrapper } from "@/components/authFormWrapper";
import { Alert, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [loginFeedback, setLoginFeedback] = useState(false);
  const loginRouter = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
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

      if (response.ok) {
        setLoginFeedback(false);

        const data = await response.json();
        const id = data.message.split("id:")[1].trim();
        localStorage.setItem("user_id", id);

        loginRouter.push("/pages/expense-tracker/dashboard");
      } else {
        setLoginFeedback(true); // display client-side error message
      }
    },
  });

  return (
    <AuthFormWrapper title="login">
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

        {loginFeedback ? (
          <div className="login-feedback-wrapper my-2">
            <Alert severity="error">
              Login was not successful. Email or password is incorrect, please
              try again.
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
    </AuthFormWrapper>
  );
}
