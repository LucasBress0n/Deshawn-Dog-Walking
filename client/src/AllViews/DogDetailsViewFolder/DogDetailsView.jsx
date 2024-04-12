import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDogDetails } from "../../Services/getDogDetails";

export const DogDetailsView = () => {
  const [dogDetails, setDogDetails] = useState();
  const { DogId } = useParams();

  useEffect(() => {
    getDogDetails(parseInt(DogId)).then((data) => {
      setDogDetails(data[0]);
    });
  }, []);
  return (
    <div>
      <header>{dogDetails?.name}</header>
      {dogDetails?.walkers != null && <h3>{dogDetails.walkers.name}</h3>}
    </div>
  );
};
