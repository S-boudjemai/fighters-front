import { useState } from "react";
import "./App.css";
import FighterForm from "./FighterForm";
import FighterList from "./FighterList";

function App() {
  const [refreshList, setRefreshList] = useState(false);

  const handleSave = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div>
      <h1> Fighter Management</h1>
      <div>
        <FighterList key={refreshList.toString()} />
        <FighterForm onSave={handleSave} />
      </div>
    </div>
  );
}

export default App;
