import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const std_rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function TableLayout() {
  return (
    <Table aria-label="a dense table">
      <TableHead className="bg-gray-300">
        <TableRow>
          <TableCell>Hello Serving</TableCell>
          <TableCell align="center">Calories</TableCell>
          <TableCell align="center">Fat&nbsp;(g)</TableCell>
          <TableCell align="center">Carbs&nbsp;(g)</TableCell>
          <TableCell align="center">Protein&nbsp;(g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {std_rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="center">{row.calories}</TableCell>
            <TableCell align="center">{row.fat}</TableCell>
            <TableCell align="center">{row.carbs}</TableCell>
            <TableCell align="center">{row.protein}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
