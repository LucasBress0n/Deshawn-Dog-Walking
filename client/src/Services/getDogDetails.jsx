export const getDogDetails = async (dogId) => {
  return (await fetch(`/api/dogs?Id=${parseInt(dogId)}`)).json();
};
