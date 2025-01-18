import { Paper } from "@mui/material";

export default function LeftToBudget() {
	return (
		<Paper elevation={1} className="p-4 text-center">
			<h2 className="mb-4">$amount</h2>
			<p className="text-primaryGrey">Left to Budget</p>
		</Paper>
	)
}