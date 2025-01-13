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

interface GoalItem {
  goal: string;
  target_amount: number;
  current_amount: number;
}

export default function GoalsTable() {
  const [goals, setGoals] = useState("");
  const number_formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const goalsTableRouter = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/pages/api/goals/getGoals", {
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
          setGoals("");
        } else {
          setGoals(data.message);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div className="goals-wrapper">
      <div className="content-wrapper mb-4 flex flex-row justify-between items-end">
        <h2 className="">Goals</h2>
        <p>Goals are subtracted from your salary.</p>
      </div>
      <TableContainer component={Paper}>
        <Table id="goals-table" aria-label="Goals Table" size="small">
          <TableHead className="bg-gray-300">
            <TableRow>
              <TableCell className="font-bold">Goal</TableCell>
              <TableCell align="center" className="font-bold">
                Target Amount
              </TableCell>
              <TableCell align="center" className="font-bold">
                Current Amount
              </TableCell>
              <TableCell align="right" className="font-bold">
                Progress
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals ? (
              (() => {
                let goals_array;
                try {
                  goals_array = JSON.parse(goals);
                } catch (error) {
                  console.error("Invalid JSON object", error);
                  goals_array = [];
                }

                return goals_array.map((item: GoalItem, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item.goal}</TableCell>
                    <TableCell align="center">
                      ${number_formatter.format(item.target_amount)}
                    </TableCell>
                    <TableCell align="center">
                      ${number_formatter.format(item.current_amount)}
                    </TableCell>
                    <TableCell align="right">
                      {(
                        (item.current_amount / item.target_amount) *
                        100
                      ).toFixed(2)}
                      %
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

      <div className="button-wrapper my-2 flex flex-col items-end justify-end">
        <Button
          variant="contained"
          className="bg-primaryBlack font-semibold"
          onClick={() => {
            goalsTableRouter.push("/pages/expense-tracker/goals");
          }}
        >
          Add or update goal
        </Button>
      </div>
    </div>
  );
}
