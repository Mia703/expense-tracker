import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function TransactionsTable() {
	return (
		<div className="transactions-table-wrapper">
			<TableContainer component={Paper} className="table-wrapper my-4">
				<Table aria-label="Transactions Table" size="small" id="transactions-table">
					<TableHead>
						<TableRow>
							<TableCell colSpan={4} className="font-bold">Transactions</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-bold">Date</TableCell>
							<TableCell className="font-bold">Category</TableCell>
							<TableCell className="font-bold">Description</TableCell>
							<TableCell className="font-bold">Amount</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>9/12/2025</TableCell>
							<TableCell>Savings Contributions</TableCell>
							<TableCell>Savings Acct</TableCell>
							<TableCell>$50</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}