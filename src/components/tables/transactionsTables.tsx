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
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import FormTemplate from "../forms/formTemplate";
import { useFormik } from "formik";
import { formatFeedback } from "@/app/utils/feedback";
import {
  formatDate,
  formatType,
  getTransactions,
  setTransaction,
} from "@/app/utils/transactions";

interface Transaction {
  id: string;
  date: string;
  type: string;
  description: string;
  amount: number;
}

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<string>("");
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [displayTransactionForm, setDisplayTransactionForm] = useState(false);
  const [transactionFormFeedback, setTransactionFormFeedback] = useState<
    boolean | null
  >(null);

  const number_formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    async function deleteRow() {
      const response = await fetch(
        "/pages/api/transactions/deleteTransaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: selectedRow,
          }),
        },
      );

      if (response.ok) {
        setSelectedRow(null);
      }
    }

    if (selectedRow) {
      deleteRow();
    }
  }, [selectedRow]);

  useEffect(() => {
    async function fetchTransactions() {
      const data = await getTransactions();
      if (data) {
        setTransactions(data);
      }
    }
    fetchTransactions();
  }, [displayTransactionForm, transactionFormFeedback, selectedRow]);

  const formik = useFormik({
    initialValues: {
      type: "savings",
      date: "",
      description: "",
      amount: 0,
    },
    onSubmit: async (values) => {
      setTransactionFormFeedback(null);

      const data = await setTransaction(
        `${values.date}T00:00:00Z`,
        values.type,
        values.description,
        values.amount,
      );

      if (data) {
        setTransactionFormFeedback(true);
      } else {
        setTransactionFormFeedback(false);
      }
    },
  });

  return (
    <div className="transactions-table-wrapper">
      <TableContainer component={Paper} className="table-wrapper my-4">
        <Table
          aria-label="Transactions Table"
          size="small"
          id="transactions-table"
        >
          <TableHead>
            <TableRow className="border-b-2 border-gray-300 bg-gray-200">
              <TableCell colSpan={2} className="font-bold md:hidden">
                Transactions
              </TableCell>
              <TableCell colSpan={4} className="hidden font-bold md:table-cell">
                Transactions
              </TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={() => {
                    setDisplayTransactionForm(true);
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow className="bg-gray-200">
              <TableCell className="date hidden font-bold md:table-cell">
                Date
              </TableCell>
              <TableCell className="category hidden font-bold md:table-cell">
                Category
              </TableCell>
              <TableCell className="description font-bold">
                Description
              </TableCell>
              <TableCell className="amount font-bold">Amount</TableCell>
              <TableCell className="trash"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions ? (
              (() => {
                let list;
                try {
                  list = JSON.parse(transactions);
                } catch (error) {
                  console.error("transactions: invalid JSON object", error);
                  list = [];
                }

                return list.map((item: Transaction, index: number) => (
                  <TableRow key={index} className="transaction" id={item.id}>
                    <TableCell className="date hidden md:table-cell">
                      {formatDate(item.date)}
                    </TableCell>
                    <TableCell className="category hidden md:table-cell">
                      {formatType(item.type)}
                    </TableCell>
                    <TableCell className="description">
                      {item.description}
                    </TableCell>
                    <TableCell className="amount">
                      {number_formatter.format(item.amount)}
                    </TableCell>
                    <TableCell align="right" className="trash">
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
          </TableBody>
        </Table>
      </TableContainer>

      {displayTransactionForm ? (
        <FormTemplate>
          <Paper elevation={3} className="w-full p-4 md:w-[70vw] lg:w-[50vw]">
            <div className="button-wrapper flex flex-col items-end justify-end">
              <IconButton
                onClick={() => {
                  setTransactionFormFeedback(null);
                  setDisplayTransactionForm(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div>
              <h2 className="text-center">Add or Update Transaction</h2>
              <form
                id="transaction-form"
                action=""
                method="post"
                className="flex flex-col p-4"
                onSubmit={formik.handleSubmit}
              >
                <FormLabel id="type-label" className="font-bold">
                  Transaction Type
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
                    label="Savings Accounts - 50%"
                  />
                  <FormControlLabel
                    value={"expenses"}
                    control={<Radio />}
                    label="Fixed Expenses - 30%"
                  />
                  <FormControlLabel
                    value={"other"}
                    control={<Radio />}
                    label="Other - 20%"
                  />
                </RadioGroup>

                <FormLabel htmlFor="date" className="mt-4 font-bold">
                  Date
                </FormLabel>
                <TextField
                  type="date"
                  id="date"
                  name="date"
                  variant="outlined"
                  className="my-3"
                  required
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.date}
                />

                <TextField
                  type="text"
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  className="my-3"
                  required
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />

                <TextField
                  type="number"
                  id="amount"
                  name="amount"
                  label="Amount"
                  variant="outlined"
                  className="my-3"
                  required
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.amount}
                />

                {formatFeedback(
                  transactionFormFeedback,
                  "Transaction saved",
                  "Unable to save transaction, please try again.",
                )}

                <Button
                  type="submit"
                  variant="contained"
                  className="front-semibold mt-4 bg-primaryBlack"
                >
                  Add Transaction
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
