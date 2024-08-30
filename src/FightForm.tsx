import React, { useEffect } from "react";
import { Fight } from "./types/fight";
import { createFight, updateFight } from "./api-fights";
import { getFighters } from "./api-fighters";
import { Fighter } from "./types/fighter";

interface FightFormProps {
  onsave: () => void;
  currentFight: Fight;
}

const FightForm: React.FC<FightFormProps> = ({ onsave, currentFight }) => {
  // Initialisation de l'état du combat avec les valeurs de currentFight
  const [fight, setFight] = React.useState<Fight>({
    ...currentFight,
    id: currentFight.id || 0,
    date: currentFight.date ? new Date(currentFight.date) : new Date(),
    referee: currentFight.referee || "",
    category: currentFight.category || "",
    firstFighterName: currentFight.firstFighterName || "",
    secondFighterName: currentFight.secondFighterName || "",
    firstFighterId: currentFight.firstFighterId || 0,
    secondFighterId: currentFight.secondFighterId || 0,
  });

  const [fighters, setFighters] = React.useState<Fighter[]>([]);

  useEffect(() => {
    const loadFighters = async () => {
      const data = await getFighters();
      setFighters(data);
    };

    loadFighters();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "date") {
      setFight((fight) => ({ ...fight, date: new Date(value) }));
    } else if (name === "firstFighterName" || name === "secondFighterName") {
      const selectedFighter = fighters.find(
        (fighter) => fighter.name === value
      );
      if (selectedFighter) {
        setFight((fight) => ({ ...fight, [name]: selectedFighter.name }));
      }
    } else {
      setFight((fight) => ({ ...fight, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fight.id) {
      await createFight(fight);
    } else {
      await updateFight(fight.id, fight);
    }
    onsave();
    setFight({
      id: 0,
      date: new Date(),
      referee: "",
      category: "",
      firstFighterName: "",
      secondFighterName: "",
      firstFighterId: 0,
      secondFighterId: 0,
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {fight.id ? "Update Fight" : "Organize A Fight"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleChange}
            value={fight.date.toISOString().split("T")[0]}
            className="w-full cursor-pointer px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="referee"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Referee
          </label>
          <input
            type="text"
            id="referee"
            name="referee"
            value={fight.referee}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="firstFighterName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First Fighter
          </label>
          <select
            name="firstFighterName"
            id="firstFighterName"
            value={fight.firstFighterName}
            onChange={(e) => {
              const selectedFighter = fighters.find(
                (fighter) => fighter.name === e.target.value
              );
              if (selectedFighter) {
                setFight((prevFight) => ({
                  ...prevFight,
                  firstFighterName: selectedFighter.name,
                  firstFighterId: selectedFighter.id, // Stocke l'ID pour l'envoi
                }));
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select a Fighter
            </option>
            {fighters.map((fighter) => (
              <option key={fighter.id} value={fighter.name}>
                {fighter.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="secondFighterName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Second Fighter
          </label>
          <select
            name="secondFighterName"
            id="secondFighterName"
            value={fight.secondFighterName}
            onChange={(e) => {
              const selectedFighter = fighters.find(
                (fighter) => fighter.name === e.target.value
              );
              if (selectedFighter) {
                setFight((prevFight) => ({
                  ...prevFight,
                  secondFighterName: selectedFighter.name,
                  secondFighterId: selectedFighter.id,
                }));
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select a Fighter
            </option>
            {fighters.map((fighter) => (
              <option key={fighter.id} value={fighter.name}>
                {fighter.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={fight.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
          type="submit"
        >
          {fight.id ? "Update Fight" : "Add Fight"}
        </button>
      </form>
    </div>
  );
};

export default FightForm;
