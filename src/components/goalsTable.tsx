import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function GoalsTable() {
  return (
    <div className="goals-wrapper py-4">
      <h2 className="mb-2">Goals</h2>
      <TableContainer component={Paper}>
        <Table id="goals-table" aria-label="Goals Table" size="small">
          <TableHead className="bg-gray-300">
            <TableRow>
              <TableCell className="font-bold">Goal</TableCell>
              <TableCell className="font-bold">Target Amount</TableCell>
              <TableCell className="font-bold">Current Amount</TableCell>
              <TableCell className="font-bold">Remaining</TableCell>
              <TableCell className="font-bold">Progress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* map here */}
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
