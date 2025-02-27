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
import FormTemplate from "../forms/formTemplate";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";

// FIXME: rename budget table; 'type' renamed to 'category' and 'category' renamed to 'name'

interface Item {
  id: string;
  type: string;
  category: string;
  percentage: number;
}

export default function BudgetTable() {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [displayBudgetForm, setDisplayBudgetForm] = useState<boolean>(false);
  const [budgetFormFeedback, setBudgetFormFeedback] = useState<boolean | null>(
    null,
  );

  // tracks the '% of salary' for each category
  const [savingsPercentage, setSavingsPercentage] = useState<number>(0);
  const [expensesPercentage, setExpensesPercentage] = useState<number>(0);
  const [otherPercentage, setOtherPercentage] = useState<number>(0);

  // returns a list of savings, expenses, and other form DB
  const [savingsList, setSavingsList] = useState<string>("");
  const [expensesList, setExpensesList] = useState<string>("");
  const [othersList, setOthersList] = useState<string>("");

  // returns a list of savings, expenses, and other from DB
  async function fetchSavings() {
    const response = await fetch("/pages/api/budget/getCategory", {
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
      setSavingsList(data.message.data);
    }
  }

  async function fetchExpenses() {
    const response = await fetch("/pages/api/budget/getCategory", {
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
      setExpensesList(data.message.data);
    }
  }

  async function fetchOther() {
    const response = await fetch("/pages/api/budget/getCategory", {
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
      setOthersList(data.message.data);
    }
  }

  useEffect(() => {
    async function deleteRow() {
      const response = await fetch("/pages/api/budget/deleteCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedRow,
        }),
      });

      if (response.ok) {
        fetchSavings();
        fetchExpenses();
        fetchOther();
      }
      setSelectedRow(null);
    }
    if (selectedRow) {
      deleteRow();
    }
  }, [selectedRow]);

  useEffect(() => {
    // tracks the '% of salary' for each category
    async function fetchSavingsPercentages() {
      const response = await fetch("/pages/api/budget/getPercentages", {
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
        setSavingsPercentage(data.message.total);
      }
    }

    async function fetchExpensesPercentages() {
      const response = await fetch("/pages/api/budget/getPercentages", {
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
        setExpensesPercentage(data.message.total);
      }
    }

    async function fetchOtherPercentages() {
      const response = await fetch("/pages/api/budget/getPercentages", {
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
        setOtherPercentage(data.message.total);
      }
    }

    fetchSavingsPercentages();
    fetchExpensesPercentages();
    fetchOtherPercentages();

    fetchSavings();
    fetchExpenses();
    fetchOther();
  }, [budgetFormFeedback, displayBudgetForm]);

  function formatFeedback() {
    if (budgetFormFeedback === null) {
      return <></>;
    } else if (budgetFormFeedback) {
      return <Alert severity="success">Budget category saved.</Alert>;
    } else {
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
      setBudgetFormFeedback(null);
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
              <TableCell className="font-bold md:hidden" colSpan={3}>
                Savings Accounts - 50%
              </TableCell>
              <TableCell className="hidden font-bold md:table-cell" colSpan={6}>
                Savings Accounts - 50%
              </TableCell>
            </TableRow>

            {savingsList ? (
              (() => {
                let list;
                try {
                  list = JSON.parse(savingsList);
                } catch (error) {
                  console.error("savings: invalid JSON object", error);
                  list = [];
                }

                return list.map((item: Item, index: number) => (
                  <TableRow key={index} className="savings" id={item.id}>
                    <TableCell className="category italic">
                      {item.category}
                    </TableCell>
                    <TableCell className="percentage hidden md:table-cell">
                      {item.percentage}%
                    </TableCell>
                    {/* TODO: somehow pass the current salary to do calculations? useState? react portal? */}
                    <TableCell className="budgeted hidden md:table-cell">
                      B
                    </TableCell>
                    <TableCell className="spent hidden md:table-cell">
                      S
                    </TableCell>
                    <TableCell className="remaining">R</TableCell>
                    <TableCell className="trash" align="right">
                      <IconButton
                        size="small"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>,
                        ) => {
                          const target = event.target as HTMLElement;
                          const row = target.closest("tr");

                          if (row) {
                            setSelectedRow(row.getAttribute("id"));
                          } else {
                            setSelectedRow(null);
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ));
              })()
            ) : (
              <TableRow>
                <TableCell className="pointer-events-none text-primaryWhite">
                  empty
                </TableCell>
              </TableRow>
            )}

            <TableRow className="bg-gray-300">
              <TableCell className="font-bold md:hidden" colSpan={3}>
                Fixed Expenses - 30%
              </TableCell>
              <TableCell className="hidden font-bold md:table-cell" colSpan={6}>
                Fixed Expenses - 30%
              </TableCell>
            </TableRow>

            {expensesList ? (
              (() => {
                let list;
                try {
                  list = JSON.parse(expensesList);
                } catch (error) {
                  console.error("expenses: invalid JSON object", error);
                  list = [];
                }

                return list.map((item: Item, index: number) => (
                  <TableRow key={index} className="expenses" id={item.id}>
                    <TableCell className="category italic">
                      {item.category}
                    </TableCell>
                    <TableCell className="percentage hidden md:table-cell">
                      {item.percentage}%
                    </TableCell>
                    <TableCell className="budgeted hidden md:table-cell">
                      B
                    </TableCell>
                    <TableCell className="spent hidden md:table-cell">
                      S
                    </TableCell>
                    <TableCell className="remaining">R</TableCell>
                    <TableCell className="trash" align="right">
                      <IconButton
                        size="small"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>,
                        ) => {
                          const target = event.target as HTMLElement;
                          const row = target.closest("tr");

                          if (row) {
                            setSelectedRow(row.getAttribute("id"));
                          } else {
                            setSelectedRow(null);
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ));
              })()
            ) : (
              <TableRow>
                <TableCell className="pointer-events-none text-primaryWhite">
                  empty
                </TableCell>
              </TableRow>
            )}

            <TableRow className="bg-gray-300">
              <TableCell className="font-bold md:hidden" colSpan={3}>
                Other (Discretionary) - 20%
              </TableCell>
              <TableCell className="hidden font-bold md:table-cell" colSpan={6}>
                Other (Discretionary) - 20%
              </TableCell>
            </TableRow>

            {othersList ? (
              (() => {
                let list;
                try {
                  list = JSON.parse(othersList);
                } catch (error) {
                  console.error("other: invalid JSON object", error);
                  list = [];
                }

                return list.map((item: Item, index: number) => (
                  <TableRow key={index} className="other" id={item.id}>
                    <TableCell className="category italic">
                      {item.category}
                    </TableCell>
                    <TableCell className="percentage hidden md:table-cell">
                      {item.percentage}%
                    </TableCell>
                    <TableCell className="budgeted hidden md:table-cell">
                      B
                    </TableCell>
                    <TableCell className="spent hidden md:table-cell">
                      S
                    </TableCell>
                    <TableCell className="remaining">R</TableCell>
                    <TableCell className="trash" align="right">
                      <IconButton
                        size="small"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>,
                        ) => {
                          const target = event.target as HTMLElement;
                          const row = target.closest("tr");

                          if (row) {
                            setSelectedRow(row.getAttribute("id"));
                          } else {
                            setSelectedRow(null);
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ));
              })()
            ) : (
              <TableRow>
                <TableCell className="pointer-events-none text-primaryWhite">
                  empty
                </TableCell>
              </TableRow>
            )}

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
        <FormTemplate>
          <Paper elevation={3} className="w-full p-4 md:w-[80vw] lg:w-[50vw]">
            <div className="button-wrapper flex flex-col items-end justify-end">
              <IconButton
                onClick={() => {
                  setDisplayBudgetForm(false);
                  setBudgetFormFeedback(null);
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
                  {/* TODO: reference chatgpt -- disable radio button so cannot be selected even if disabled */}
                  {savingsPercentage >= 50 ? (
                    <FormControlLabel
                      value={"savings"}
                      control={<Radio />}
                      label={`Savings Accounts (50%) - ${50 - savingsPercentage}% available`}
                      disabled={true}
                    />
                  ) : (
                    <FormControlLabel
                      value={"savings"}
                      control={<Radio />}
                      label={`Savings Accounts (50%) - ${50 - savingsPercentage}% available`}
                    />
                  )}

                  {expensesPercentage >= 30 ? (
                    <FormControlLabel
                      value={"expenses"}
                      control={<Radio />}
                      label={`Fixed Expenses (30%) - ${30 - expensesPercentage}% available`}
                      disabled={true}
                    />
                  ) : (
                    <FormControlLabel
                      value={"expenses"}
                      control={<Radio />}
                      label={`Fixed Expenses (30%) - ${30 - expensesPercentage}% available`}
                    />
                  )}

                  {otherPercentage >= 20 ? (
                    <FormControlLabel
                      value={"other"}
                      control={<Radio />}
                      label={`Other (20%) - ${20 - otherPercentage}% available`}
                      disabled={true}
                    />
                  ) : (
                    <FormControlLabel
                      value={"other"}
                      control={<Radio />}
                      label={`Other (20%) - ${20 - otherPercentage}% available`}
                    />
                  )}
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
        </FormTemplate>
      ) : (
        <></>
      )}
    </div>
  );
}
