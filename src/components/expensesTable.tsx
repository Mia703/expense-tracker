import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ExpenseItem {
  expense_name: string;
  expense_budgeted: number;
  expense_actual: number;
}

export default function ExpensesTable() {
  const [expenses, setExpenses] = useState("");
  const number_formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const expensesTableRouter = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/pages/api/expenses/getExpenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("user_id"),
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.message == "[]") {
          setExpenses("");
        } else {
          setExpenses(data.message);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div className="goals-wrapper">
      <div className="content-wrapper mb-4 flex flex-row items-end justify-between">
        <h2 className="">Fixed Expenses (Needs 30%)</h2>
        <p>Fixed expenses are subtracted from your salary.</p>
      </div>
      <TableContainer component={Paper}>
        <Table id="goals-table" aria-label="Goals Table" size="small">
          <TableHead className="bg-gray-300">
            <TableRow>
              <TableCell className="font-bold">Expense</TableCell>
              <TableCell align="center" className="font-bold">
                Budgeted
              </TableCell>
              <TableCell align="center" className="font-bold">
                Actual
              </TableCell>
              <TableCell align="right" className="font-bold">
                Left
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses ? (
              (() => {
                let expenses_array;
                try {
                  expenses_array = JSON.parse(expenses);
                } catch (error) {
                  console.error("Invalid JSON object", error);
                  expenses_array = [];
                }
                return expenses_array.map(
                  (item: ExpenseItem, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{item.expense_name}</TableCell>
                      <TableCell align="center">
                        ${number_formatter.format(item.expense_budgeted)}
                      </TableCell>
                      <TableCell align="center">
                        ${number_formatter.format(item.expense_actual)}
                      </TableCell>
                      {item.expense_budgeted - item.expense_actual < 0 ? (
                        <TableCell align="right" className="text-red-500">
                          -$
                          {number_formatter.format(
                            (item.expense_budgeted - item.expense_actual) * -1,
                          )}
                        </TableCell>
                      ) : (
                        <TableCell align="right">
                          $
                          {number_formatter.format(
                            item.expense_budgeted - item.expense_actual,
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ),
                );
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

      <div className="button-wrapper my-2 flex flex-col items-end justify-end">
        <Button
          variant="contained"
          className="bg-primaryBlack font-semibold"
          onClick={() => {
            expensesTableRouter.push("/pages/expense-tracker/expenses");
          }}
        >
          Add or update expense
        </Button>
      </div>
    </div>
  );
}
