// src/App.js
import React from "react";
import Weather from "./Weather";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Weather />
      <Footer />
    </div>
  );
}

export default App;
