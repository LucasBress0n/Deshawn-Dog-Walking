import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import { DogDetailsView } from "./AllViews/DogDetailsViewFolder/DogDetailsView";
import { AddDogView } from "./AllViews/AddDogViewFolder/AddDogView";
import { WalkersView } from "./AllViews/WalkersViewFolder/WalkersView";
import { WalkerDetailsView } from "./AllViews/WalkerDetailsViewFolder/WalkerDetailsView";
import { CitiesView } from "./AllViews/CitiesViewFolder/CitiesView";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/:DogId" element={<DogDetailsView />} />
        <Route path="/adddog" element={<AddDogView />} />
        <Route path="/walkers">
          <Route index element={<WalkersView />} />
          <Route path="/walkers/:WalkerId" element={<WalkerDetailsView />} />
        </Route>
        <Route path="cities">
          <Route index element={<CitiesView />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
