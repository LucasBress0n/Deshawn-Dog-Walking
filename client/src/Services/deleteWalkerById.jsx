export const deleteWalkerById = async (Id) => {
  return await fetch(`/api/walkers/${Id}/deleteall`, { method: "DELETE" });
};
