export const getAllDogs = async () => {
  return (await fetch("/api/dogs")).json();
};
