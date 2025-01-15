import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AccountItem {
  acct_name: string;
  acct_type: string;
  current_balance: number;
}

export default function AccountTable() {
  const [accounts, setAccounts] = useState("");
  const number_formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const accountTableRouter = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/pages/api/account/getAccount", {
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
          setAccounts("");
        } else {
          setAccounts(data.message);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div className="account-table-wrapper">
      <h2 className="mb-2">Accounts (Savings & Debit Repayment - 50%)</h2>

      <div className="cash-accounts-table-wrapper my-4">
        <TableContainer component={Paper}>
          <Table id="account-table" aria-label="Accounts Table" size="small">
            <TableHead className="bg-gray-300">
              <TableRow>
                <TableCell className="font-bold">Cash Accounts</TableCell>
                <TableCell align="right" className="font-bold">
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts ? (
                (() => {
                  let accounts_array;
                  try {
                    accounts_array = JSON.parse(accounts);
                  } catch (error) {
                    console.error("Invalid JSON object", error);
                    accounts_array = [];
                  }

                  return accounts_array
                    .filter((item: AccountItem) => item.acct_type == "checking")
                    .map((item: AccountItem, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{item.acct_name}</TableCell>
                        <TableCell align="right">{`$${number_formatter.format(item.current_balance)}`}</TableCell>
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
      </div>

      <div className="credit-account-table-wrapper my-4">
        <TableContainer component={Paper}>
          <Table id="account-table" aria-label="Accounts Table" size="small">
            <TableHead className="bg-gray-300">
              <TableRow>
                <TableCell className="font-bold">Credit Accounts</TableCell>
                <TableCell align="right" className="font-bold">
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts ? (
                (() => {
                  let accounts_array;
                  try {
                    accounts_array = JSON.parse(accounts);
                  } catch (error) {
                    console.error("Invalid JSON object", error);
                    accounts_array = [];
                  }

                  return accounts_array
                    .filter((item: AccountItem) => item.acct_type == "credit")
                    .map((item: AccountItem, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{item.acct_name}</TableCell>
                        <TableCell align="right">{`$${number_formatter.format(item.current_balance)}`}</TableCell>
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
      </div>

      <div className="button-wrapper my-2 flex w-full flex-col items-end justify-end">
        <Button
          variant="contained"
          className="bg-primaryBlack font-semibold"
          onClick={() => {
            accountTableRouter.push("/pages/expense-tracker/account");
          }}
        >
          Add or update account
        </Button>
      </div>
    </div>
  );
}
