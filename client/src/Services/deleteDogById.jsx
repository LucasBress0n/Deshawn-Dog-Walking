export const deleteDogById = async (DogId) => {
  return await fetch(`/api/dogs/${DogId}`, { method: "DELETE" });
};
