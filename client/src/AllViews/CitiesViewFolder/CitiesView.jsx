import { useEffect, useState } from "react";
import { getAllCities } from "../../Services/getAllCities";
import "./CitiesView.css";
import { postNewCity } from "../../Services/postNewCity";

export const CitiesView = () => {
  const [allCities, setAllCities] = useState([]);
  const [newCity, setNewCity] = useState({});

  const getCities = () => {
    getAllCities().then((data) => {
      setAllCities(data);
    });
  };

  useEffect(() => {
    getCities();
  }, []);
  return (
    <main>
      <input
        onChange={(e) => {
          const copy = { ...newCity };
          copy.Name = e.target.value;
          setNewCity(copy);
        }}
        defaultValue={newCity?.Name}
        placeholder="Add A City"
      />
      <button
        onClick={() => {
          if (newCity?.Name != "") {
            postNewCity(newCity);
            getCities();
            setNewCity({});
          }
        }}
      >
        Add City
      </button>
      <div className="CitiesView-MainContainer">
        {allCities.map((cityObj) => {
          return <article key={cityObj.id}>{cityObj.name}</article>;
        })}
      </div>
    </main>
  );
};
