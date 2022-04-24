import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";

// routing is here because we used to have a separate page at "/mint"
// and maybe we'll want to use other routes again
const App = () => {
  return (
    <Routes>
      <Route path="*" element={<Main />} />
    </Routes>
  );
};

export default App;
