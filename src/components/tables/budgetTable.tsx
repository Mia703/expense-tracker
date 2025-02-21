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

export default function BudgetTable() {
  return (
    <div className="budget-table-wrapper">
      <TableContainer component={Paper} className="table-wrapper my-4">
        <Table aria-label="Budget Table" size="small" id="budget-table">
          <TableHead>
            <TableRow className="border-b-2 border-gray-300 bg-gray-200">
              <TableCell className="font-bold md:hidden" colSpan={2}>
                Budget Table
              </TableCell>
              <TableCell className="hidden font-bold md:table-cell" colSpan={5}>
                Budget Table
              </TableCell>
              <TableCell align="right">
                <IconButton size="small">
                  <AddIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>

            <TableRow className="bg-gray-200">
              <TableCell className="category font-bold">Category</TableCell>
              <TableCell className="percentage hidden font-bold md:table-cell">
                % of Salary
              </TableCell>
              <TableCell className="budgeted hidden font-bold md:table-cell">
                Budgeted
              </TableCell>
              <TableCell className="spent hidden font-bold md:table-cell">
                Spent
              </TableCell>
              <TableCell className="remaining font-bold">Remaining</TableCell>
              <TableCell className="trash"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className="bg-gray-300">
              <TableCell className="font-bold md:hidden" colSpan={3}>
                Accounts - 50%
              </TableCell>
              <TableCell className="hidden font-bold md:table-cell" colSpan={6}>
                Accounts - 50%
              </TableCell>
            </TableRow>

            {/* TODO: add map here */}
            <TableRow>
              <TableCell className="category italic">Something</TableCell>
              <TableCell className="percentage hidden md:table-cell">
                %
              </TableCell>
              <TableCell className="budgeted hidden md:table-cell">B</TableCell>
              <TableCell className="spent hidden md:table-cell">S</TableCell>
              <TableCell className="remaining">R</TableCell>
              <TableCell className="trash" align="right">
                <IconButton size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>

            <TableRow className="bg-gray-300">
              <TableCell className="font-bold md:hidden" colSpan={3}>
                Fixed Expenses - 30%
              </TableCell>
              <TableCell className="hidden font-bold md:table-cell" colSpan={6}>
                Fixed Expenses - 30%
              </TableCell>
            </TableRow>

            {/* TODO: add map here */}
            <TableRow>
              <TableCell className="category italic">Something</TableCell>
              <TableCell className="percentage hidden md:table-cell">
                %
              </TableCell>
              <TableCell className="budgeted hidden md:table-cell">B</TableCell>
              <TableCell className="spent hidden md:table-cell">S</TableCell>
              <TableCell className="remaining">R</TableCell>
              <TableCell className="trash" align="right">
                <IconButton size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>

            <TableRow className="bg-gray-300">
              <TableCell className="font-bold md:hidden" colSpan={3}>
                Other (Discretionary) - 20%
              </TableCell>
              <TableCell className="hidden font-bold md:table-cell" colSpan={6}>
                Other (Discretionary) - 20%
              </TableCell>
            </TableRow>

            <TableRow className="bg-gray-200">
              <TableCell className="category font-bold">Total</TableCell>
              <TableCell className="percentage hidden font-bold md:table-cell">
                %
              </TableCell>
              <TableCell className="budgeted hidden font-bold md:table-cell">
                B
              </TableCell>
              <TableCell className="spent hidden font-bold md:table-cell">
                S
              </TableCell>
              <TableCell className="remaining font-bold">R</TableCell>
              <TableCell className="trash" align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
