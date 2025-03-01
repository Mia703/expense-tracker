/**
 * 
 * @param type defines which category
 * @returns total percentage or null; enable/disable radio button
 */
export async function getPercentage(type: string) {
  const response = await fetch("/pages/api/budget/getPercentages", {
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
    return data.message.total;
  }
	return null;
}

/**
 * 
 * @param type defines which category to search under, 'savings', 'expenses', or 'other'
 * @returns JSON string of list of categories or returns null
 */
export async function getCategories(type: string) {
	const response = await fetch("/pages/api/budget/getCategory", {
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
	return null;
}

export async function setCategory(type: string, category: string, percentage: number) {
	const response = await fetch("/pages/api/budget/setCategory/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: sessionStorage.getItem("user_id"),
      type,
      category,
      percentage,
    }),
  });

  if (response.ok) {
    const data = await response.json();
		return data;
  } 
	return null;
}