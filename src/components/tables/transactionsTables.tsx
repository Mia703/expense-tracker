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

export default function TransactionsTable() {
  return (
    <div className="transactions-table-wrapper">
      <TableContainer component={Paper} className="table-wrapper my-4">
        <Table
          aria-label="Transactions Table"
          size="small"
          id="transactions-table"
        >
          <TableHead>
            <TableRow className="bg-gray-200 border-b-2 border-gray-300">
              <TableCell colSpan={2} className="font-bold md:hidden">
                Transactions
              </TableCell>
              <TableCell colSpan={4} className="hidden font-bold md:table-cell">
                Transactions
              </TableCell>
              <TableCell align="right">
                <IconButton size="small">
                  <AddIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow className="bg-gray-200">
              <TableCell className="date hidden font-bold md:table-cell">
                Date
              </TableCell>
              <TableCell className="category hidden font-bold md:table-cell">
                Category
              </TableCell>
              <TableCell className="description font-bold">
                Description
              </TableCell>
              <TableCell className="amount font-bold">Amount</TableCell>
              <TableCell className="trash"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>


            {/* TODO: map here */}
            <TableRow>
              <TableCell className="date hidden md:table-cell">
                9/12/2025
              </TableCell>
              <TableCell className="category hidden md:table-cell">
                Savings Contributions
              </TableCell>
              <TableCell className="description">Savings Acct</TableCell>
              <TableCell className="amount">$50</TableCell>
              <TableCell align="right" className="trash">
                <IconButton size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>


          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
