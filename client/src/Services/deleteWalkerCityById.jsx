export const deleteWalkerCityById = async (WalkCityId) => {
  return await fetch(`/api/walkercities/${WalkCityId}`, { method: "DELETE" });
};
