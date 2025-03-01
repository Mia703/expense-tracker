import {
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
import { useSalary } from "@/app/context/SalaryContext";
import { formatFeedback } from "@/app/utils/feedback";
import { getCategories, getPercentage, setCategory } from "@/app/utils/budget";

interface Item {
  id: string;
  type: string;
  category: string;
  percentage: number;
}

export default function BudgetTable() {
  const { salary } = useSalary();

  const number_formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [displayBudgetForm, setDisplayBudgetForm] = useState<boolean>(false);
  const [budgetFormFeedback, setBudgetFormFeedback] = useState<boolean | null>(
    null,
  );

  // tracks the '% of salary' for each category row
  const [savingsPercentage, setSavingsPercentage] = useState<number>(0);
  const [expensesPercentage, setExpensesPercentage] = useState<number>(0);
  const [otherPercentage, setOtherPercentage] = useState<number>(0);

  // returns the list of categories per category type
  // i.e.: list of 'savings accounts', list of 'fixed expenses', etc.
  const [savingsList, setSavingsList] = useState<string>("");
  const [expensesList, setExpensesList] = useState<string>("");
  const [othersList, setOthersList] = useState<string>("");

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
        let list = await getCategories("savings");
        if (list) {
          setSavingsList(list);
        }

        list = await getCategories("expenses");
        if (list) {
          setExpensesList(list);
        }

        list = await getCategories("other");
        if (list) {
          setOthersList(list);
        }
      }
      setSelectedRow(null);
    }
    // if there is a row selected, delete it, else do nothing
    if (selectedRow) {
      deleteRow();
    }
  }, [selectedRow]);

  useEffect(() => {
    async function fetchPercentages() {
      // tracks the '% of salary' for each category
      let percentage = await getPercentage("savings");
      if (percentage) {
        setSavingsPercentage(percentage);
      } else {
        setSavingsPercentage(0);
      }

      percentage = await getPercentage("expenses");
      if (percentage) {
        setExpensesPercentage(percentage);
      } else {
        setExpensesPercentage(0);
      }

      percentage = await getPercentage("other");
      if (percentage) {
        setOtherPercentage(percentage);
      } else {
        setOtherPercentage(0);
      }
    }

    async function fetchCategories() {
      let list = await getCategories("savings");
      if (list) {
        setSavingsList(list);
      }

      list = await getCategories("expenses");
      if (list) {
        setExpensesList(list);
      }

      list = await getCategories("other");
      if (list) {
        setOthersList(list);
      }
    }

    fetchPercentages();
    fetchCategories();
  }, [budgetFormFeedback, displayBudgetForm]);

  const formik = useFormik({
    initialValues: {
      type: "savings",
      category: "",
      percentage: 0,
    },
    onSubmit: async (values) => {
      setBudgetFormFeedback(null);

      const data = await setCategory(
        values.type,
        values.category,
        values.percentage,
      );

      if (data) {
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
              <TableCell className="font-bold md:hidden" colSpan={2}>
                Savings Accounts - 50%
              </TableCell>
              <TableCell className="hidden font-bold md:table-cell" colSpan={5}>
                Savings Accounts - 50%
              </TableCell>
              <TableCell align="right" className="font-bold">
                {number_formatter.format(salary.salary * (50 / 100))}
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
                    <TableCell className="budgeted hidden md:table-cell">
                      {number_formatter.format(
                        salary.salary * (item.percentage / 100),
                      )}
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
              <TableCell className="font-bold md:hidden" colSpan={2}>
                Fixed Expenses - 30%
              </TableCell>
              <TableCell className="hidden font-bold md:table-cell" colSpan={5}>
                Fixed Expenses - 30%
              </TableCell>
              <TableCell align="right" className="font-bold">
                {number_formatter.format(salary.salary * (30 / 100))}
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
                      {number_formatter.format(
                        salary.salary * (item.percentage / 100),
                      )}
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
              <TableCell className="font-bold md:hidden" colSpan={2}>
                Other (Discretionary) - 20%
              </TableCell>
              <TableCell className="hidden font-bold md:table-cell" colSpan={5}>
                Other (Discretionary) - 20%
              </TableCell>
              <TableCell align="right" className="font-bold">
                {number_formatter.format(salary.salary * (20 / 100))}
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
                      {number_formatter.format(
                        salary.salary * (item.percentage / 100),
                      )}
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

                {formatFeedback(
                  budgetFormFeedback,
                  "Budget category saved.",
                  "Unable to save new budget category, please try again.",
                )}

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
