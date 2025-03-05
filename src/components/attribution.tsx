import Link from "next/link";

export default function Attribution() {
  const date = new Date();
  return (
    <p className="my-3 text-center text-xs text-primaryGrey">
      <span className="text-bold">Expense Tracker</span> © {date.getFullYear()}{" "}
      by{" "}
      <Link
        className="underline"
        href={"https://github.com/Mia703"}
        target="_blank"
      >
        Amya Moore
      </Link>{" "}
      is licensed under{" "}
      <Link
        className="underline"
        href={
          "https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
        }
      >
        CC BY-NC-SA 4.0
      </Link>
      .
    </p>
  );
}
