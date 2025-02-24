import {
  Alert,
  Button,
  FormControlLabel,
  FormLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import Form from "../forms/form";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";

export default function BudgetTable() {
  // const [selectedRow, setSelectedRow] = useState<HTMLTableRowElement | null>(
  //   null,
  // );
  const [displayBudgetForm, setDisplayBudgetForm] = useState<boolean>(false);
  const [savingsPercentage, setSavingsPercentage] = useState("");
  const [expensesPercentage, setExpensesPercentage] = useState("");
  const [otherPercentage, setOtherPercentage] = useState("");
  const [budgetFormFeedback, setBudgetFormFeedback] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    async function fetchSavingsPercentages() {
      const response = await fetch("/pages/api/budget/percentages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: sessionStorage.getItem("user_id"),
          type: "savings",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("savings %", data);
        setSavingsPercentage(
          `Savings Accounts (50%) - ${50 - data.message.total}% available`,
        );
      }
    }

    async function fetchExpensesPercentages() {
      const response = await fetch("/pages/api/budget/percentages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: sessionStorage.getItem("user_id"),
          type: "expenses",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setExpensesPercentage(
          `Fixed Expenses (30%) - ${30 - data.message.total}% available`,
        );
      }
    }

    async function fetchOtherPercentages() {
      const response = await fetch("/pages/api/budget/percentages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: sessionStorage.getItem("user_id"),
          type: "other",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOtherPercentage(
          `Other (20%) - ${20 - data.message.total}% available`,
        );
      }
    }
    fetchSavingsPercentages();
    fetchExpensesPercentages();
    fetchOtherPercentages();
  }, [budgetFormFeedback]);


  function formatFeedback() {
    if (budgetFormFeedback === null) {
      return <></>
    }
    else if (budgetFormFeedback) {
      return <Alert severity="success">New budget category saved.</Alert>;
    }
    else {
      return (
        <Alert severity="error">
          Unable to save new budget category, please try again.
        </Alert>
      );
    }
  }

  const formik = useFormik({
    initialValues: {
      type: "savings",
      category: "",
      percentage: 0,
    },
    onSubmit: async (values) => {
      const response = await fetch("/pages/api/budget/setCategory/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: sessionStorage.getItem("user_id"),
          type: values.type,
          category: values.category,
          percentage: values.percentage,
        }),
      });

      if (response.ok) {
        setBudgetFormFeedback(true);
        formik.resetForm();
      } else {
        setBudgetFormFeedback(false);
      }
    },
  });
  return (
    <div className="budget-table-wrapper">
      <TableContainer component={Paper} className="table-wrapper my-4">
        <Table aria-label="Budget Table" size="small" id="budget-table">
          <TableHead>
            <TableRow className="border-b-2 border-gray-300 bg-gray-200">
              <TableCell className="font-bold md:hidden" colSpan={2}>
                Budget Table
              </TableCell>
              <TableCell className="hidden font-bold md:table-cell" colSpan={5}>
                Budget Table
              </TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={() => {
                    setDisplayBudgetForm(true);
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>

            <TableRow className="bg-gray-200">
              <TableCell className="category font-bold">Category</TableCell>
              <TableCell className="percentage hidden font-bold md:table-cell">
                % of Salary
              </TableCell>
              <TableCell className="budgeted hidden font-bold md:table-cell">
                Budgeted
              </TableCell>
              <TableCell className="spent hidden font-bold md:table-cell">
                Spent
              </TableCell>
              <TableCell className="remaining font-bold">Remaining</TableCell>
              <TableCell className="trash"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className="bg-gray-300">
              {/* TODO: should I add a form here instead? */}
              <TableCell className="font-bold md:hidden" colSpan={3}>
                Savings Accounts - 50%
              </TableCell>
              <TableCell className="hidden font-bold md:table-cell" colSpan={6}>
                Savings Accounts - 50%
              </TableCell>
            </TableRow>

            {/* TODO: add map here */}
            <TableRow>
              <TableCell className="category italic">Something</TableCell>
              <TableCell className="percentage hidden md:table-cell">
                %
              </TableCell>
              <TableCell className="budgeted hidden md:table-cell">B</TableCell>
              <TableCell className="spent hidden md:table-cell">S</TableCell>
              <TableCell className="remaining">R</TableCell>
              <TableCell className="trash" align="right">
                <IconButton
                  size="small"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    const target = event.target as HTMLElement;
                    const row = target.closest("tr");
                    console.log(row)
                    // setSelectedRow(row);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>

            <TableRow className="bg-gray-300">
              <TableCell className="font-bold md:hidden" colSpan={3}>
                Fixed Expenses - 30%
              </TableCell>
              <TableCell className="hidden font-bold md:table-cell" colSpan={6}>
                Fixed Expenses - 30%
              </TableCell>
            </TableRow>

            {/* TODO: add map here */}
            <TableRow>
              <TableCell className="category italic">Something</TableCell>
              <TableCell className="percentage hidden md:table-cell">
                %
              </TableCell>
              <TableCell className="budgeted hidden md:table-cell">B</TableCell>
              <TableCell className="spent hidden md:table-cell">S</TableCell>
              <TableCell className="remaining">R</TableCell>
              <TableCell className="trash" align="right">
                <IconButton size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>

            <TableRow className="bg-gray-300">
              <TableCell className="font-bold md:hidden" colSpan={3}>
                Other (Discretionary) - 20%
              </TableCell>
              <TableCell className="hidden font-bold md:table-cell" colSpan={6}>
                Other (Discretionary) - 20%
              </TableCell>
            </TableRow>

            <TableRow className="bg-gray-200">
              <TableCell className="category font-bold">Total</TableCell>
              <TableCell className="percentage hidden font-bold md:table-cell">
                %
              </TableCell>
              <TableCell className="budgeted hidden font-bold md:table-cell">
                B
              </TableCell>
              <TableCell className="spent hidden font-bold md:table-cell">
                S
              </TableCell>
              <TableCell className="remaining font-bold">R</TableCell>
              <TableCell className="trash" align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {displayBudgetForm ? (
        <Form>
          <Paper elevation={3} className="w-full p-4 md:w-[80vw] lg:w-[50vw]">
            <div className="button-wrapper flex flex-col items-end justify-end">
              <IconButton
                onClick={() => {
                  setDisplayBudgetForm(false);
                  setBudgetFormFeedback(null)
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div>
              <h2 className="text-center">Add or Update Category</h2>
              <form
                id="budget-table-form"
                action=""
                method="post"
                className="flex flex-col p-4"
                onSubmit={formik.handleSubmit}
              >
                <FormLabel id="type-label" className="font-bold">
                  Category Type
                </FormLabel>
                <RadioGroup
                  aria-labelledby="type-label"
                  defaultValue={"savings"}
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value={"savings"}
                    control={<Radio />}
                    label={savingsPercentage}
                  />
                  <FormControlLabel
                    value={"expenses"}
                    control={<Radio />}
                    label={expensesPercentage}
                  />
                  <FormControlLabel
                    value={"other"}
                    control={<Radio />}
                    label={otherPercentage}
                  />
                </RadioGroup>

                <TextField
                  type="text"
                  id="category"
                  name="category"
                  label="Category Name"
                  variant="outlined"
                  className="my-3"
                  required
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.category}
                />

                <TextField
                  type="number"
                  id="percentage"
                  name="percentage"
                  label="% of Salary"
                  variant="outlined"
                  className="my-3"
                  required
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.percentage}
                />

                {formatFeedback()}

                <Button
                  type="submit"
                  variant="contained"
                  className="mt-4 bg-primaryBlack font-semibold"
                >
                  Add Category
                </Button>
              </form>
            </div>
          </Paper>
        </Form>
      ) : (
        <></>
      )}
    </div>
  );
}
