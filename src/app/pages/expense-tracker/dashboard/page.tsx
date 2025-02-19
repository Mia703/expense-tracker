"use client";
import GoalTable from "@/components/tables/goalTable";
import LeftToBudget from "@/components/leftToBudget";
import SubscriptionTable from "@/components/tables/subscriptionTable";
import TotalAssets from "@/components/totalAssets";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import SalaryTable from "@/components/tables/salaryTable";
import AccountTable from "@/components/tables/savingsTable";
import ExpensesNeedsTable from "@/components/tables/expensesNeedsTable";
import ExpensesWantsTable from "@/components/tables/expensesWantsTable";

export default function Dashboard() {
  const dashboardRouter = useRouter();

  return (
    <section id="dashboard" className="col-span-4 md:col-span-6 lg:col-start-4">
      <div className="menu-wrapper flex-cols flex items-center justify-between">
        <p className="text-lg font-bold">Jan 17, 2025 - Jan 17th 2025</p>
        <IconButton
          size="small"
          aria-label="log out"
          onClick={() => {
            localStorage.removeItem("user_id");
            dashboardRouter.push("/");
          }}
        >
          <LogoutIcon />
        </IconButton>
      </div>

      <div className="widget-wrapper my-4 grid grid-cols-2 gap-4">
        <LeftToBudget />
        <TotalAssets />
      </div>

      <SalaryTable />
      <SubscriptionTable />
      <GoalTable />
      <AccountTable />
      <ExpensesNeedsTable />
      <ExpensesWantsTable />
    </section>
  );
}
