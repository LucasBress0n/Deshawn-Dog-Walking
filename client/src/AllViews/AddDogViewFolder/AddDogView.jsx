import { useEffect, useState } from "react";
import { getAllCities } from "../../Services/getAllCities";
import { postCreatedDog } from "../../Services/postCreatedDog";
import { useNavigate } from "react-router-dom";

export const AddDogView = () => {
  const [allCities, setAllCities] = useState([]);
  const [createDog, setCreateDog] = useState({});

  useEffect(() => {
    getAllCities().then((cities) => {
      setAllCities(cities);
    });
  }, []);

  useEffect(() => {
    setCreateDog({
      Name: "",
      CityId: 0,
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <header>
        <h2>Add Dog</h2>
      </header>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (createDog.CityId != 0) {
              postCreatedDog(createDog).then(navigate("/"));
            }
          }}
        >
          <input
            onChange={(evt) => {
              const copy = { ...createDog };
              copy.Name = evt.target.value;
              setCreateDog(copy);
            }}
            required
            placeholder="Dog Name"
          />
          <select
            onChange={(evt) => {
              const copy = { ...createDog };
              copy.CityId = evt.target.value;
              setCreateDog(copy);
            }}
            required
            defaultValue={0}
          >
            <option key={0} value={0} disabled hidden>
              --Pick City--
            </option>
            {allCities.map((cityObj) => {
              return (
                <option key={cityObj.id} value={cityObj.id}>
                  {cityObj.name}
                </option>
              );
            })}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
