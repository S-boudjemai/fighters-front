import { useState } from "react";
import "./App.css";
import FighterForm from "./FighterForm";
import FighterList from "./FighterList";
import React from "react";
import { Fighter } from "./types/fighter";
import FightsList from "./FightsList";
import FightForm from "./FightForm";
import { Fight } from "./types/fight";

function App() {
  const [refreshList, setRefreshList] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const currentFighter: Fighter | undefined = undefined;

  const defaultFight: Fight = {
    id: 0,
    date: new Date(),
    referee: "",
    category: "",
    firstFighterName: "",
    secondFighterName: "",
    firstFighterId: 0,
    secondFighterId: 0,
  };

  const [fighter, setFighter] = React.useState<Fighter>(
    currentFighter || {
      id: 0, // Add a default value for the id property
      name: "",
      age: 0,
      weight: 0,
      nationality: "",
      category: "",
    }
  );

  const handleSave = () => {
    setRefreshList(!refreshList);
    setIsUpdating(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Fighter Management
      </h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <FighterList
          fighter={fighter}
          key={refreshList.toString()}
          setFighter={setFighter}
          setIsUpdating={setIsUpdating}
        />
        <FighterForm
          onSave={handleSave}
          isUpdating={isUpdating}
          fighter={fighter}
          setFighter={setFighter}
        />
        <FightsList />
        <FightForm onsave={handleSave} currentFight={defaultFight} />
      </div>
    </div>
  );
}

export default App;
