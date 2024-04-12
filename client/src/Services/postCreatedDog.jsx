export const postCreatedDog = (createdDog) => {
  return fetch("/api/dogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createdDog),
  });
};
