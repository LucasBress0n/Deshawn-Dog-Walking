import { getAllDogs } from "./Services/getAllDogs";
import { getGreeting } from "./apiManager";
import { useEffect, useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { deleteDogById } from "./Services/deleteDogById";

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });
  const [allDogs, setAllDogs] = useState([]);

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  useEffect(() => {
    getDogsFunction();
  }, []);

  const navigate = useNavigate();
  const getDogsFunction = () => {
    getAllDogs().then((res) => {
      setAllDogs(res);
    });
  };

  return (
    <div>
      <header>
        {greeting.message}{" "}
        <button
          onClick={() => {
            navigate("/adddog");
          }}
        >
          Add Dog
        </button>
      </header>
      <section className="HomeView-AllDogsContainer">
        {allDogs.map((dogObj) => {
          return (
            <div key={dogObj.id} className="HomeView-DogContainerBox">
              <Link to={`/${dogObj.id}`}>
                <header>{dogObj.name}</header>
              </Link>
              <button
                onClick={() => {
                  deleteDogById(dogObj.id);
                  getDogsFunction();
                }}
              >
                DEL
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
}
