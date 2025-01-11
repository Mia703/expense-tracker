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
  const [accounts, setAccounts] = useState();
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
        // const accounts_array = JSON.parse(data.message);
        setAccounts(data.message);
      }
    }
    fetchData();
  },[]);

  return (
    <section className="account-table-wrapper">
      <h2 className="mb-2">Accounts</h2>

      <div className="cash-accounts-wrapper my-2 mb-6">
        <h3 className="mb-2">Cash Accounts</h3>
        <TableContainer component={Paper}>
          <Table id="account-table" aria-label="Accounts Table">
            <TableHead className="bg-gray-300">
              <TableRow>
                <TableCell className="font-bold">Accounts</TableCell>
                <TableCell className="text-right font-bold">Amount</TableCell>
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
                        <TableCell className="text-right">{`$${number_formatter.format(item.current_balance)}`}</TableCell>
                      </TableRow>
                    ));
                })()
              ) : (
                <TableRow></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="credit-account-wrapper my-2">
        <h3 className="mb-2">Credit Accounts</h3>
        <TableContainer component={Paper}>
          <Table id="account-table" aria-label="Accounts Table">
            <TableHead className="bg-gray-300">
              <TableRow>
                <TableCell className="font-bold">Accounts</TableCell>
                <TableCell className="text-right font-bold">Amount</TableCell>
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
                        <TableCell className="text-right">{`$${number_formatter.format(item.current_balance)}`}</TableCell>
                      </TableRow>
                    ));
                })()
              ) : (
                <TableRow></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="button-wrapper flex w-full flex-col items-end justify-end">
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
    </section>
  );
}
