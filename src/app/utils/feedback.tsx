import { Alert } from "@mui/material";

export function formatFeedback(
  feedback: boolean | null,
  success_message: string,
  error_message: string,
) {
  if (feedback === null) {
    return <></>;
  } else if (feedback) {
    return <Alert severity="success">{success_message}</Alert>;
  } else {
    return <Alert severity="error">{error_message}</Alert>;
  }
}
