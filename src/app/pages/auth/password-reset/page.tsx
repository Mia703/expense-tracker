"use client";
import { FormWrapper } from "@/components/formWrapper";
import { Alert, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";

export default function PasswordReset() {
  const [resetFeedback, setResetFeedback] = useState<boolean | null>(null);

  function renderFeedback(feedback: boolean | null) {
    if (feedback == null) {
      return <div></div>;
    } else if (feedback) {
      return (
        <div className="reset-feedback-wrapper my-2">
          <Alert severity="success">Password reset was successful.</Alert>
        </div>
      );
    } else {
      return (
        <div className="reset-feedback-wrapper my-2">
          <Alert severity="error">
            Password reset was unsuccessful, email does not exist. Please try
            again.
          </Alert>
        </div>
      );
    }
  }

  const passwordResetValidation = yup.object().shape({
    newPassword: yup
      .string()
      .required("New password is required.")
      .min(6, "Password is less than 6 characters.")
      .max(12, "Password is more than 12 characters."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: passwordResetValidation,
    onSubmit: async (values) => {
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
        setResetFeedback(true);
      } else {
        setResetFeedback(false);
      }
    },
  });

  return (
    <FormWrapper title="Password Reset">
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

        {formik.errors.newPassword ? (
          <p className="mb-2 ml-4 text-red-500">{formik.errors.newPassword}</p>
        ) : (
          <p className="mb-2 ml-4 text-green-600">
            Password must be between 6 to 12 characters.
          </p>
        )}

        {renderFeedback(resetFeedback)}

        <Button
          type="submit"
          variant="contained"
          className="my-4 bg-primaryBlack font-semibold"
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
    </FormWrapper>
  );
}
