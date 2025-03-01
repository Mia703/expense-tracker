export function formatType(category: string) {
  switch (category) {
    case "savings":
      return "Savings Accounts";
    case "expenses":
      return "Fixed Expenses";
    case "other":
      return "Other";
    default:
      return "";
  }
}

export function formatDate(date_string: string) {
  const date = new Date(date_string);
  date.setDate(date.getDate() + 1);
  return date.toLocaleDateString();
}

/**
 *
 * @returns
 */
export async function getTransactions() {
  const response = await fetch("/pages/api/transactions/getTransaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: sessionStorage.getItem("user_id"),
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.message.data;
  }
  return null;
}

export async function setTransaction(
  date: string,
  type: string,
  description: string,
  amount: number,
) {
  const response = await fetch("/pages/api/transactions/setTransaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: sessionStorage.getItem("user_id"),
      date,
      type,
      description,
      amount,
    }),
  });

  if (response.ok) {
    return true;
  }
  return false;
}
