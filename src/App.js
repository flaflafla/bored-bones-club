import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import Mint from "./Mint";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="mint" element={<Mint />} />
    </Routes>
  );
};

export default App;
