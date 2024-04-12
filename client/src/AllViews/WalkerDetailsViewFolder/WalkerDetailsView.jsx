import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWalkerById } from "../../Services/getWalkerById";
import { getDogByCityId } from "../../Services/getDogByCityId";
import { updateDogsWalkerId } from "../../Services/updateDogsWalkerId";
import { getWalkersCitiesById } from "../../Services/getWalkersCitiesById";
import { deleteWalkerCityById } from "../../Services/deleteWalkerCityById";

export const WalkerDetailsView = () => {
  const [walker, setWalker] = useState({});
  const [allWalkerCities, setAllWalkerCities] = useState([]);
  const [allToBeDeletedCities, setAllToBeDeletedCities] = useState([]);
  const { WalkerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getWalkerById(WalkerId).then((data) => {
      setWalker(data[0]);
    });
  }, []);

  useEffect(() => {
    getWalkersCitiesById(WalkerId).then((data) => {
      setAllWalkerCities(data);
    });
  }, []);

  return (
    <div>
      <input placeholder={walker?.name} />
      <div className="WalkerDetailsView-allCities">
        {allWalkerCities.map((walkerCities) => {
          return (
            <section key={walkerCities.id}>
              <input
                type="checkbox"
                defaultChecked
                id={walkerCities.id + walkerCities.cities.name}
                onChange={() => {
                  if (allToBeDeletedCities.includes(walkerCities)) {
                    const copy = allToBeDeletedCities.filter(
                      (walkCityObj) => walkCityObj.id !== walkerCities.id
                    );
                    setAllToBeDeletedCities(copy);
                  } else {
                    const copy = [...allToBeDeletedCities];
                    copy.push(walkerCities);
                    setAllToBeDeletedCities(copy);
                  }
                }}
              />
              <label htmlFor={walkerCities.id + walkerCities.cities.name}>
                {walkerCities.cities.name}
              </label>
            </section>
          );
        })}
      </div>
      <button
        onClick={() => {
          allToBeDeletedCities.forEach((cityObj) => {
            deleteWalkerCityById(cityObj.id);
          });
        }}
      >
        Update
      </button>
    </div>
  );
};
