import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackBtn() {
	return (
    <div className="back-btn-wrapper">
      <Link
        href={"/pages/expense-tracker/dashboard"}
        className="font-bold text-gray-400"
      >
        {<ArrowBackIcon />} Back to Dashboard
      </Link>
    </div>
  );
}