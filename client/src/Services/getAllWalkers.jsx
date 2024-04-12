export const getAllWalkers = async () => {
  return (await fetch("/api/walkers")).json();
};
