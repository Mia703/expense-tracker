"use client";
import { CategoryTotalProvider } from "@/app/context/CategoryTotalContext";
import { SalaryProvider } from "@/app/context/SalaryContext";
import Attribution from "@/components/attribution";
import BudgetTable from "@/components/tables/budgetTable";
import SalaryTable from "@/components/tables/salaryTable";
import TransactionsTable from "@/components/tables/transactionsTables";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<string | null>(null);
  const dashboardRouter = useRouter();

  useEffect(() => {
    const id = sessionStorage.getItem("user_id");
    setUser(id);
  }, [user]);

  return (
    <SalaryProvider>
      <CategoryTotalProvider>
        <section
          id="dashboard"
          className="col-span-4 md:col-span-6 lg:col-span-8 lg:col-start-3"
        >
          {user ? (
            <div className="content">
              <div className="menu-wrapper flex-cols flex items-center justify-end">
                <IconButton
                  size="small"
                  aria-label="log out"
                  onClick={() => {
                    sessionStorage.removeItem("user_id");
                    dashboardRouter.push("/");
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </div>
              <SalaryTable />
              <BudgetTable />
              <TransactionsTable />
            </div>
          ) : (
            <div>
              <p>Hahah, you&apos;re not logged in. Try again!</p>
              <Button
                variant="contained"
                onClick={() => {
                  dashboardRouter.push("/");
                }}
              >
                Back to Login
              </Button>
            </div>
          )}
          <Attribution />
        </section>
      </CategoryTotalProvider>
    </SalaryProvider>
  );
}
