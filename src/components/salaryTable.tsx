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

interface SalaryTableProps {
  salary: number;
}

export const SalaryTable: React.FC<SalaryTableProps> = ({ salary }) => {
  const number_formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const fifty_percent = salary * 0.5;
  const thirty_percent = salary * 0.3;
  const twenty_percent = salary * 0.2;

  const salaryRouter = useRouter();

  return (
    <div className="salary-table-wrapper">
      <TableContainer component={Paper} className="salary-wrapper my-4">
        <Table aria-label="Salary Table" size="small" id="salary-table">
          <TableHead className="bg-gray-300">
            <TableRow>
              <TableCell className="font-bold">Salary</TableCell>
              <TableCell align="right" className="font-bold">
                ${number_formatter.format(salary)}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="text-gray-500">
                50% for savings and debit repayment
              </TableCell>
              <TableCell align="right" className="text-gray-500">
                ${number_formatter.format(fifty_percent)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-gray-500">30% for needs</TableCell>
              <TableCell align="right" className="text-gray-500">
                ${number_formatter.format(thirty_percent)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-gray-500">20% for wants</TableCell>
              <TableCell align="right" className="text-gray-500">
                ${number_formatter.format(twenty_percent)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className="button-wrapper my-2 flex w-full flex-col items-end justify-end">
        <Button
          variant="contained"
          className="bg-primaryBlack font-semibold"
          onClick={() => {
            salaryRouter.push("/pages/expense-tracker/salary");
          }}
        >
          Update Salary
        </Button>
      </div>
    </div>
  );
};
