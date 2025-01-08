"use client";
import GoalsTable from "@/components/goals";
import SalaryTable from "@/components/salary";
import SavingsTable from "@/components/savings";
import { Welcome } from "@/components/welcome";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [salary, setSalary] = useState(null);
  const [welcome, setWelcome] = useState(false);

  // check if user has a salary
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/pages/api/dashboard", {
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
        const salary = data.message.split("salary:")[1].trim();
        setSalary(salary);
        setWelcome(true);
      }
      // user does not have a salary
      // display welcome form
      else {
        setSalary(null);
        setWelcome(false);
      }
    }

    fetchData();
  });

  return (
    <section
      id="budget"
      className="col-span-4 grid grid-cols-4 gap-4 md:col-span-6 md:grid-cols-6 lg:col-span-12 lg:grid-cols-12"
    >
      <Welcome displayWelcome={welcome} />
      
      <div className="navigation col-span-4 bg-green-300 md:col-span-6 lg:col-span-2">
        navigation {salary}
      </div>

      <main className="col-span-4 md:col-span-4 lg:col-span-8">
        center content
        <div className="date-wrapper">date</div>
        <SalaryTable />
        <GoalsTable />
        <SavingsTable />
      </main>
      <div className="col-span-4 bg-blue-300 md:col-span-2 lg:col-span-2">
        right side content
      </div>
    </section>
  );
}
