import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SubscriptionForm from "../forms/subscriptionForm";
import DeleteIcon from "@mui/icons-material/Delete";

interface SubscriptionItem {
  subscription_name: string;
  subscription_frequency: string;
  next_payment_date: string;
  subscription_amount: number;
}

export default function SubscriptionTable() {
  const [displaySubsForm, setDisplaySubsForm] = useState(false);
  const [subscriptions, setSubscriptions] = useState("");
  const number_formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  function formatDate(date: string) {
    const payment_date = new Date(date);
    const subscription_date = new Date(
      payment_date.setDate(payment_date.getDate() + 1),
    );

    const month = subscription_date.getMonth();
    const day = subscription_date.getDate();
    const year = subscription_date.getFullYear();

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[month]} ${day}, ${year}`;
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/pages/api/subscription/getSub", {
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
          setSubscriptions("");
        } else {
          setSubscriptions(data.message);
        }
      }
    }
    fetchData();
  }, [displaySubsForm]);

  return (
    <div className="subscription-table-wrapper">
      <TableContainer component={Paper} className="table-wrapper">
        <div className="table-header-wrapper flex flex-row items-center justify-between rounded-t-md bg-gray-200 p-1 px-2">
          <h3>Subscriptions</h3>
          <IconButton
            onClick={() => {
              setDisplaySubsForm(true);
            }}
          >
            <AddIcon />
          </IconButton>
        </div>

        <Table
          aria-label="Subscription table"
          size="small"
          id="subscription-table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <p className="font-bold">Name</p>
              </TableCell>
              <TableCell align="center" className="hidden md:table-cell">
                <p className="font-bold">Frequency</p>
              </TableCell>
              <TableCell align="center">
                <p className="font-bold">Next Date</p>
              </TableCell>
              <TableCell align="center">
                <p className="font-bold">Amount</p>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions ? (
              (() => {
                let subs_array;
                try {
                  subs_array = JSON.parse(subscriptions);
                } catch (error) {
                  console.error("Invalid JSON object", error);
                  subs_array = [];
                }

                return subs_array.map(
                  (item: SubscriptionItem, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="capitalize">
                        {item.subscription_name}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="hidden capitalize md:table-cell"
                      >
                        {item.subscription_frequency}
                      </TableCell>
                      <TableCell align="center">
                        {formatDate(item.next_payment_date)}
                      </TableCell>
                      <TableCell align="center">
                        ${number_formatter.format(item.subscription_amount)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => {
                            // TODO: read the selected row
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
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

      {displaySubsForm ? (
        <div className="background fixed left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center bg-primaryGrey/25 p-8">
          <Paper elevation={3} className="w-full p-4 md:w-[70vw] lg:w-[50vw]">
            <div className="button-wrapper flex flex-col items-end justify-end">
              <IconButton
                onClick={() => {
                  setDisplaySubsForm(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <h2 className="text-center">Add Subscription</h2>
            <SubscriptionForm />
          </Paper>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
