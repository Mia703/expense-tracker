"use client";
import AccountTable from "@/components/accountTable";
import ExpensesTable from "@/components/expensesTable";
import GoalsTable from "@/components/goalsTable";
import { SalaryTable } from "@/components/salaryTable";
import TotalAssets from "@/components/totalAssets";
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [salary, setSalary] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [payrollAlert, setPayrollAlert] = useState(false);

  /**
   * Formats a given date and calculates an end date based on the specified frequency.
   * The function takes an input date and formats it in the "MMM DD, YYYY" format
   * (e.g., Dec 29, 2024). It then calculates an end date by adding the appropriate
   * number of days to the input date based on the specified frequency:
   * - weekly: adds 7 days
   * - bi-weekly: adds 14 days
   * - semi-monthly: adds 15 or 16 days
   * - monthly: adds 30 or 31 days
   *
   * Finally the function returns a string that represents the date range in the format:
   * "MMM DD, YYYY - MMM DD, YYYY" (e.g., Dec 29, 2024 - Jan 12, 2024)
   * @param {Date} date - The starting date to format and calculate from.
   * @param {string} frequency - Determines the number of days to add.
   * @returns A string representing the formatted date range.
   * @throws {string} If frequency is not one of the listed, the following string is returned:
   * "MMM DD, YYYY - ????" (e.g., Dec 29, 2024 - ????)
   */
  function formatDate(date: Date, frequency: string) {
    date = new Date(date.setDate(date.getDate() + 1));
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let end_date;
    frequency = frequency.toLocaleLowerCase();

    switch (frequency) {
      case "weekly":
        end_date = new Date(date.setDate(date.getDate() + 7));
        break;
      case "bi-weekly":
        end_date = new Date(date.setDate(date.getDate() + 14));
        break;
      case "semi-monthly":
        if (
          months[month] == "January" ||
          months[month] == "March" ||
          months[month] == "May" ||
          months[month] == "July" ||
          months[month] == "August" ||
          months[month] == "October" ||
          months[month] == "December"
        ) {
          end_date = new Date(date.setDate(date.getDate() + 16));
        } else {
          end_date = new Date(date.setDate(date.getDate() + 15));
        }
        break;
      case "monthly":
        if (
          months[month] == "January" ||
          months[month] == "March" ||
          months[month] == "May" ||
          months[month] == "July" ||
          months[month] == "August" ||
          months[month] == "October" ||
          months[month] == "December"
        ) {
          end_date = new Date(date.setDate(date.getDate() + 31));
        } else {
          end_date = new Date(date.setDate(date.getDate() + 30));
        }
        break;
      default:
        setEndDate(null);
        return `${months[month]} ${day}, ${year} - ????`;
    }

    setEndDate(end_date.toDateString());
    return `${months[month]} ${day}, ${year} - ${months[end_date.getMonth()]} ${end_date.getDate()}, ${end_date.getFullYear()}`;
  }

  // check if user has a salary and is used to format the date
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/pages/api/salary/getSalary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.getItem("user_id"),
        }),
      });

      // if user has a salary, get salary
      // and do not display welcome form
      if (response.ok) {
        const data = await response.json();

        const parts = data.message.split(",");
        const parts_salary = Number(parts[0].split("salary:")[1].trim());
        const parts_frequency = parts[1].split("frequency:")[1].trim();
        const parts_date = parts[2].split("date:")[1];

        setSalary(parts_salary);
        setDate(formatDate(new Date(parts_date), parts_frequency));
      }
    }

    fetchData();

    // check today is not the end date.
    const today = new Date();
    if (today.toDateString() == endDate) {
      setPayrollAlert(true);
    } else {
      setPayrollAlert(false);
    }
  }, [endDate]);
  // TODO: do I need to add setPayrollAlert as a dependency?

  return (
    <section
      id="dashboard"
      className="col-span-4 grid grid-cols-4 gap-4 md:col-span-6 md:grid-cols-6 lg:col-span-12 lg:grid-cols-12"
    >
      <div className="navigation col-span-4 bg-green-300 md:col-span-6 lg:col-span-2">
        navigation
      </div>

      <main className="col-span-4 md:col-span-4 lg:col-span-8">
        <div className="date-wrapper font-bold">{date}</div>
        
        {salary ? <SalaryTable salary={salary} /> : <SalaryTable salary={0} />}
        {payrollAlert ? (
          <div className="alert-wrapper my-4">
            <Alert severity="error" className="shadow-md">
              It is the end of pay period. Please update salary with new pay
              period information.
            </Alert>
          </div>
        ) : (
          <div className="alert-wrapper"></div>
        )}

        <GoalsTable />
        <AccountTable />
        <ExpensesTable />
      </main>

      <div className="col-span-4 md:col-span-2 ">
        <TotalAssets />
      </div>
    </section>
  );
}
