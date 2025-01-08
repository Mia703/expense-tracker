import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function SalaryTable() {
  const salary = 567.78;
  const fifty = (salary * 0.5).toFixed(2);
  const thirty = (salary * 0.3).toFixed(2);
  const twenty = (salary * 0.2).toFixed(2);

  return (
    <TableContainer component={Paper} className="salary-wrapper my-4">
      <Table aria-label="Salary Table" size="small" id="salary-table">
        <TableHead className="bg-gray-300">
          <TableRow>
            <TableCell className="font-bold">Salary</TableCell>
            <TableCell className="font-bold">${salary.toFixed(2)}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="text-gray-500">
              50% for savings and debit repayment
            </TableCell>
            <TableCell className="text-gray-500">${fifty}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-gray-500">30% for needs</TableCell>
            <TableCell className="text-gray-500">${thirty}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-gray-500">20% for wants</TableCell>
            <TableCell className="text-gray-500">${twenty}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
