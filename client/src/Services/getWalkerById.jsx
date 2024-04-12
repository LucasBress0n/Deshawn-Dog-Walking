export const getWalkerById = async (WalkerId) => {
  return (await fetch(`/api/walkers?Id=${WalkerId}`)).json();
};
