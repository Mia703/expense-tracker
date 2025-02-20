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

export default function SalaryTable() {
  return (
    <div className="salary-table-wrapper">
      <TableContainer component={Paper} className="table-wrapper my-4">
        <Table aria-label="Salary Table" size="small" id="salary-table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} className="font-bold">
                Summary
              </TableCell>
              <TableCell align="right">
                <IconButton size="small">
                  <AddIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold" colSpan={2}>Date</TableCell>
              <TableCell align="right">09/01/2025</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold" colSpan={2}>Total Salary</TableCell>
              <TableCell align="right">$45</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold" colSpan={2}>Remaining</TableCell>
              <TableCell align="right">$0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
