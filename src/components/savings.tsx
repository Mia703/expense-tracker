import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function SavingsTable() {
  return (
    <div className="savings-table-wrapper py-4">
      <h2 className="mb-4">
        Account Contribution (Savings & Debit Repayment - 50%)
      </h2>
      <TableContainer component={Paper}>
        <Table id="savings-table" aria-label="Account Contribution Table">
          <TableHead className="bg-gray-300">
            <TableRow>
              <TableCell className="font-bold">Account</TableCell>
              <TableCell className="font-bold">Contribution</TableCell>
              <TableCell className="font-bold">
                Balance after Contribution
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* add mapping here */}
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
