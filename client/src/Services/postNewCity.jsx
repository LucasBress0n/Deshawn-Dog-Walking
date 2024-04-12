export const postNewCity = async (newCity) => {
  return await fetch(`/api/cities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCity),
  });
};
