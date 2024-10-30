import { useState } from "react";
import Home from "./components/Home"
import Navbar from "./components/Navbar"


function App() {
  const [songs, setSongs] = useState([]);
  const [selected, setSelected] = useState(0);
  function select(sele) {
    setSelected(sele)
  }

  return (
    <>
      <Navbar songs={songs} select={select} />
      <Home songs={songs} selected={selected} select={select} setSongs={setSongs} />
    </>
  )
}

export default App