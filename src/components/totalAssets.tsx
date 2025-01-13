import { Paper } from "@mui/material";
import { ProgressBar } from "./progressBar";
import { useEffect, useState } from "react";

interface AccountItem {
  acct_name: string;
  acct_type: string;
  current_balance: number;
}

export default function TotalAssets() {
  const number_formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const [totalCredit, setTotalCredit] = useState<number | null>(null);
  const [totalCash, setTotalCash] = useState<number | null>(null);

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

        if (data.message != "[]") {
          const accounts_array = JSON.parse(data.message);

          let totalCash = 0;
          let totalCredit = 0;

          accounts_array.forEach((account: AccountItem) => {
            if (account.acct_type == "checking") {
              totalCash += account.current_balance;
            } else {
              totalCredit += account.current_balance;
            }
          });

          setTotalCash(totalCash);
          setTotalCredit(totalCredit);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <Paper elevation={1} className="bg-primaryWhite p-4 my-4">
      <h2 className="mb-4">Total Assets</h2>
      {totalCash != null && totalCredit != null ? (
        <ProgressBar credit={totalCredit} cash={totalCash} />
      ) : (
        <ProgressBar credit={0} cash={0} />
      )}
      {totalCash != null && totalCredit != null ? (
        <div className="flex flex-row items-center justify-between border-t-2 border-t-gray-300 p-2">
          <p className="text-gray-400">=</p>
          <p className="font-bold">
            {totalCash - totalCredit < 0
              ? `-$${number_formatter.format((totalCash - totalCredit)*-1)}`
              : `$${number_formatter.format(totalCash - totalCredit)}`}
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </Paper>
  );
}
