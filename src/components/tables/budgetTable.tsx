import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export default function BudgetTable() {
	return (
    <div className="budget-table-wrapper">
      <TableContainer component={Paper} className="table-wrapper my-4">
        <Table aria-label="Budget Table" size="small" id="budget-table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={5} className="font-bold">
                Budget Table
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Category</TableCell>
              <TableCell className="font-bold">% of Salary</TableCell>
              <TableCell className="font-bold">Allotted Amount</TableCell>
              <TableCell className="font-bold">Actual Spent</TableCell>
              <TableCell className="font-bold">Remaining</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="font-bold">
                Accounts - 50%
              </TableCell>
            </TableRow>
            {/* TODO: map */}
            <TableRow>
              <TableCell className="italic">Savings Contributions</TableCell>
              <TableCell>20%</TableCell>
              <TableCell>$calc</TableCell>
              <TableCell>$calc</TableCell>
              <TableCell>$calc</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} className="font-bold">
                Fixed Expenses - 30%
              </TableCell>
            </TableRow>
            {/* TODO: map */}
            <TableRow>
              <TableCell className="italic">Needs</TableCell>
              <TableCell>20%</TableCell>
              <TableCell>$calc</TableCell>
              <TableCell>$calc</TableCell>
              <TableCell>$calc</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} className="font-bold">
                Other (Discretionary) - 20%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="font-bold">100%</TableCell>
              <TableCell className="font-bold">$total</TableCell>
              <TableCell className="font-bold">$total</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}