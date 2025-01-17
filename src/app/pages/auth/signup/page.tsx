"use client";
import { FormWrapper } from "@/components/formWrapper";
import { Alert, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from "yup";

export default function Signup() {
  const [signupFeedback, setSignupFeedback] = useState(false);
  const signupRouter = useRouter();

  const signup_validation = yup.object().shape({
    password: yup
      .string()
      .required("Password must be between 6 to 12 characters")
      .min(6, "Password is less than 6 characters")
      .max(12, "Password is more than 12 characters."),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: signup_validation,
    onSubmit: async (values) => {
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
        setSignupFeedback(false);

        const data = await response.json();
        const id = data.message.split("id:")[1].trim();
        localStorage.setItem("user_id", id);

        signupRouter.push("/pages/expense-tracker/dashboard");
      } else {
        setSignupFeedback(true);
      }
    },
  });

  return (
    <FormWrapper title="Sign Up">
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

        {formik.errors.password ? (
          <p className="mb-2 ml-4 text-red-500">{formik.errors.password}</p>
        ) : (
          <p className="mb-2 ml-4 text-green-600">
            Password must be between 6 to 12 characters.
          </p>
        )}

        {signupFeedback ? (
          <div className="alert-wrapper">
            <Alert severity="error">
              Email already exists. Please try logging in or forgot password.
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
    </FormWrapper>
  );
}
