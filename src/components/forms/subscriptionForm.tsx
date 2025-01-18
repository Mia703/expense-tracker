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
import { useFormik } from "formik";
import { useState } from "react";

export default function SubscriptionForm() {
  const [subFeedback, setSubFeedback] = useState<boolean | null>(null);

  function renderFeedback(feedback: boolean | null) {
    if (feedback == null) {
      return <div></div>;
    } else if (feedback) {
      return (
        <Alert severity="error">
          Add or update subscription unsuccessful. Please try again.
        </Alert>
      );
    } else {
      return (
        <Alert severity="success">Add or update subscription successful.</Alert>
      );
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      frequency: "",
      date: "",
      amount: 0,
    },
    onSubmit: async (values) => {
      const response = await fetch("/pages/api/subscription/addSub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("user_id"),
          sub_name: values.name,
          sub_frequency: values.frequency,
          sub_date: `${values.date}T00:00:00Z`,
          sub_amount: values.amount,
        }),
      });

      if (response.ok) {
        setSubFeedback(false);
      } else {
        setSubFeedback(true);
      }
      formik.resetForm();
    },
  });

  return (
    <form
      action=""
      method="post"
      id="subscription-form"
      className="flex flex-col justify-between p-4"
      onSubmit={formik.handleSubmit}
    >
      <TextField
        type="text"
        id="name"
        label="Name"
        variant="outlined"
        className="my-3"
        required
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.name}
      />

      <FormControl fullWidth className="my-3">
        <InputLabel id="frequency-label">Frequency</InputLabel>
        <Select
          labelId="frequency-label"
          id="frequency"
          name="frequency"
          label="Frequency"
          required
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.frequency}
        >
          <MenuItem value={"weekly"}>Weekly</MenuItem>
          <MenuItem value={"bi-weekly"}>Bi-Weekly (every two weeks)</MenuItem>
          <MenuItem value={"monthly"}>Monthly</MenuItem>
          <MenuItem value={"bi-monthly"}>
            Bi-Monthly (every other month)
          </MenuItem>
          <MenuItem value={"year"}>Yearly</MenuItem>
        </Select>
      </FormControl>

      <div className="my-1 mb-3 w-full">
        <InputLabel className="text-sm">Next Pay Date</InputLabel>
        <TextField
          type="date"
          id="date"
          name="date"
          variant="outlined"
          required
          className="w-full"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.date}
        />
      </div>

      <TextField
        type="number"
        variant="outlined"
        id="amount"
        name="amount"
        required
        label="Amount"
        className="my-3"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.amount}
      />

      {renderFeedback(subFeedback)}

      <Button
        type="submit"
        variant="contained"
        className="my-4 bg-primaryBlack font-semibold"
      >
        Add Subscription
      </Button>
    </form>
  );
}
