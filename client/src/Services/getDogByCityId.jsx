export const getDogByCityId = async (cityId) => {
  return (await fetch(`/api/dogs?cityId=${cityId}`)).json();
};
