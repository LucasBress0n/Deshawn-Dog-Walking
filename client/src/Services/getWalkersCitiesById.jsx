export const getWalkersCitiesById = async (walkersId) => {
  return (await fetch(`/api/walkercities?Id=${walkersId}`)).json();
};
