export async function getSalaryData() {
  const response = await fetch("/pages/api/salary/getSalary", {
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
    return data;
  }
	return null;
}

export async function setSalaryData(salary: number, payday: string) {
	const response = await fetch("/pages/api/salary/setSalary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: sessionStorage.getItem('user_id'),
      salary,
      payday,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
	return null;
}