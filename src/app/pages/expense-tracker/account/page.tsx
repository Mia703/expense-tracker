"use client";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Account() {
  const [accountFeedback, setAccountFeedback] = useState(false);
  const accountRouter = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      number: 0,
    },
    onSubmit: async (values) => {
      const response = await fetch("/pages/api/account/addAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("user_id"),
          name: values.name,
          type: values.type,
          number: values.number,
        }),
      });

      if (response.ok) {
        accountRouter.push("/pages/expense-tracker/dashboard");
        setAccountFeedback(false);
      } else {
        setAccountFeedback(true);
      }
    },
  });

  return (
    <section
      id="account"
      className="col-span-4 flex h-[70vh] flex-col items-center justify-center md:col-span-6 lg:col-span-12"
    >
      <div className="account-form-wrapper w-[80vw] rounded-md bg-primaryWhite p-4 shadow-md md:w-[60vw] lg:w-[40vw]">
        <div className="message-wrapper my-2 text-center">
          <h2 className="capitalize">Add Account</h2>
        </div>

        <form
          action=""
          method="post"
          className="flex flex-col justify-between p-4"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            type="text"
            id="name"
            name="name"
            label="Account Name"
            variant="outlined"
            className="my-3"
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <FormControl fullWidth className="my-3">
            <InputLabel id="type-label">Account Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              label="Account Type"
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.type}
            >
              <MenuItem value={"checking"}>Checking Account</MenuItem>
              <MenuItem value={"credit"}>Credit Account</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="number"
            id="number"
            name="number"
            label="Current Amount"
            variant="outlined"
            className="my-3"
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.number}
          />

          {accountFeedback ? (
            <Alert severity="error">
              Account add was un-successful. Please try again.
            </Alert>
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
        <div className="back-btn-wrapper">
          <Link
            href={"/pages/expense-tracker/dashboard"}
            className="font-bold text-gray-400"
          >
            {<ArrowBackIcon />} Back to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
