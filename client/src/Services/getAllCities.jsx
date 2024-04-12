export const getAllCities = async () => {
  return (await fetch("/api/cities")).json();
};
