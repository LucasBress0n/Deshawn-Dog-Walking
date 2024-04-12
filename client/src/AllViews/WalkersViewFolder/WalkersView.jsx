import { useEffect, useState } from "react";
import { getAllCities } from "../../Services/getAllCities";
import { getAllWalkers } from "../../Services/getAllWalkers";
import { useNavigate, Link } from "react-router-dom";
import "./WalkersView.css";
import { getDogByCityId } from "../../Services/getDogByCityId";
import { updateDogsWalkerId } from "../../Services/updateDogsWalkerId";
import { deleteWalkerById } from "../../Services/deleteWalkerById";

export const WalkersView = () => {
  const [allWalkers, setAllWalkers] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [filteredChoice, setFilteredChoice] = useState(0);
  const [filteredWalkers, setFilteredWalkers] = useState([]);
  const [selectedWalker, setSelectedWalker] = useState(0);
  const [allSelectedDogs, setAllSelectedDogs] = useState([]);

  useEffect(() => {
    getWalkersFunction();
  }, []);
  useEffect(() => {
    getAllCities().then((allCitiesObj) => {
      setAllCities(allCitiesObj);
    });
  }, []);

  useEffect(() => {
    if (filteredChoice == 0) {
      setFilteredWalkers(allWalkers);
    } else {
      setFilteredWalkers(
        allWalkers.filter(
          (filtObj) => filtObj?.walkerCities?.cityId === filteredChoice
        )
      );
    }
  }, [filteredChoice, allWalkers]);

  useEffect(() => {
    const walkerCity = allWalkers.filter(
      (walkerObj) => walkerObj.id === selectedWalker
    );

    if (walkerCity[0]?.walkerCities != null) {
      getDogByCityId(walkerCity[0].walkerCities.cityId).then((data) => {
        setAllSelectedDogs(data);
      });
    }
  }, [selectedWalker]);

  const getWalkersFunction = () => {
    getAllWalkers().then((allWalkersObj) => {
      setAllWalkers(allWalkersObj);
    });
  };

  const navigate = useNavigate();

  return (
    <div>
      <header>All Walkers</header>
      <div>
        <select
          onChange={(event) => {
            setFilteredChoice(parseInt(event.target.value));
          }}
          defaultValue={0}
        >
          <option key={0} value={0}>
            All Cities
          </option>
          {allCities.map((cityObj) => {
            return (
              <option key={cityObj.id} value={cityObj.id}>
                {cityObj.name}
              </option>
            );
          })}
        </select>
        <select
          defaultValue={0}
          onChange={(evt) => {
            updateDogsWalkerId(parseInt(evt.target.value), selectedWalker).then(
              navigate(`/${evt.target.value}`)
            );
          }}
        >
          <option hidden disabled value={0}>
            Dogs
          </option>
          {allSelectedDogs.map((dogObject) => {
            if (dogObject.walkerId != selectedWalker) {
              return (
                <option key={dogObject.id} value={dogObject.id}>
                  {dogObject.name}
                </option>
              );
            }
          })}
        </select>
      </div>
      <div className="WalkersView-walkercontainer">
        {filteredWalkers.map((walkerObj) => {
          return (
            <div className="WalkerView-walkerInfo" key={walkerObj.id}>
              <div className="WalkerView-linkandbtn">
                <Link to={`/walkers/${walkerObj.id}`}>
                  <p>{walkerObj.name}</p>
                </Link>
                <button
                  onClick={() => {
                    setSelectedWalker(walkerObj.id);
                  }}
                >
                  Add Dog
                </button>
                <button
                  onClick={() => {
                    deleteWalkerById(walkerObj.id);
                    getWalkersFunction();
                  }}
                >
                  Delete Self
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
