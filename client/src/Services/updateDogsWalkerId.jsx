export const updateDogsWalkerId = async (dogId, walkerId) => {
  return await fetch(`/api/dogs/${dogId}/${walkerId}/setwalker`, {
    method: "POST",
  });
};
