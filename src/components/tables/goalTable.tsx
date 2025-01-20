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
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import GoalForm from "../forms/goalForm";

interface GoalItem {
  goal: string;
  goal_target: number;
  goal_contribution: number;
}

export default function GoalTable() {
  const [displayGoalsForm, setDisplayGoalsForm] = useState(false);
  const [goals, setGoals] = useState("");
  const number_formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/pages/api/goal/getGoal", {
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
  }, [displayGoalsForm]);

  return (
    <div className="goals-table-wrapper my-4">
      <TableContainer component={Paper} className="table-wrapper">
        <div className="table-header-wrapper flex flex-row items-center justify-between rounded-t-md bg-gray-300 p-1 px-2">
          <h3>Goals</h3>
          <p>Goal contributions are subtracted from your salary.</p>
          <IconButton
            size="small"
            onClick={() => {
              setDisplayGoalsForm(true);
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </div>
        <Table id="goals-table" aria-label="Goals Table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <p className="font-bold">Goal</p>
              </TableCell>
              <TableCell>
                <p className="font-bold">Target Amount</p>
              </TableCell>
              <TableCell>
                <p className="font-bold">Amount Contributed</p>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <p className="font-bold">Progress</p>
              </TableCell>
              <TableCell></TableCell>
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
                    <TableCell className="capitalize">{item.goal}</TableCell>
                    <TableCell>
                      ${number_formatter.format(item.goal_target)}
                    </TableCell>
                    <TableCell>
                      ${number_formatter.format(item.goal_contribution)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {(
                        (item.goal_contribution / item.goal_target) *
                        100
                      ).toFixed(2)}
                      %
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
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
      {displayGoalsForm ? (
        <div className="background fixed left-0 top-0 z-10 flex h-screen w-full flex-col items-center justify-center bg-primaryGrey/25 p-8">
          <Paper elevation={3} className="w-full p-4 md:w-[70vw] lg:w-[50vw]">
            <div className="button-wrapper flex flex-col items-end justify-end">
              <IconButton
                onClick={() => {
                  setDisplayGoalsForm(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <h2 className="text-center capitalize">Add or update goal</h2>
            <GoalForm />
          </Paper>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
