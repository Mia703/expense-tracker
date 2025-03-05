/**
 *
 * @param type the type of transaction
 * @returns returns the full name for the type
 */
export function formatType(type: string) {
  switch (type) {
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

/**
 *
 * @param date_string the date as a string
 * @returns the date as a string, in the format  MM/DD/YYYY
 */
export function formatDate(date_string: string) {
  const date = new Date(date_string);
  date.setDate(date.getDate() + 1);
  return date.toLocaleDateString();
}

/**
 *
 * @returns a list of transactions
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

/**
 *
 * @param date the transaction occurred
 * @param type "savings", "expenses", or "other"
 * @param category one of the categories listed in the budget table
 * @param description a description of the transaction
 * @param amount the amount spent
 * @returns true if the transaction was saved, false otherwise
 */
export async function setTransaction(
  date: string,
  type: string,
  category: string,
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
      category,
      description,
      amount,
    }),
  });

  if (response.ok) {
    return true;
  }
  return false;
}

/**
 *
 * @param rowId the id of the row to be deleted
 * @returns true if row is deleted, else false
 */
export async function deleteTransaction(rowId: string) {
  const response = await fetch("/pages/api/transactions/deleteTransaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: rowId,
    }),
  });

  if (response.ok) {
    return true;
  }
  return false;
}

/**
 *
 * @param type "savings", "expenses", or "other"
 * @returns the total spent under tha type
 */
export async function totalTransactions(type: string) {
  const response = await fetch("/pages/api/transactions/totalTransactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: sessionStorage.getItem("user_id"),
      type,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.message.data;
  }
  return 0;
}

export async function totalByCategory(category: string) {
  const response = await fetch("/pages/api/transactions/totalByCategory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: sessionStorage.getItem("user_id"),
      category,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.message.data;
  }
  return 0;
}
