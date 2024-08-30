import { useEffect, useState } from "react";
import { deleteFighter, getFighters } from "./api-fighters";
import { Fighter } from "./types/fighter";

import React from "react";

const FighterList = ({
  setIsUpdating,

  setFighter,
}: {
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  fighter: Fighter;
  setFighter: React.Dispatch<React.SetStateAction<Fighter>>;
}) => {
  const [fighters, setFighters] = useState<Fighter[]>([]);

  useEffect(() => {
    loadFighters();
  }, []);

  const loadFighters = async () => {
    const data = await getFighters();
    console.log("fighters loaded", data);
    if (data.length === 0) {
      console.log("no fighters");
      setFighters([]);
    } else {
      setFighters(data);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteFighter(id);
    loadFighters();
  };

  const handleUpdate = async (fighter: Fighter) => {
    setIsUpdating(true);
    setFighter(fighter);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Fighters</h2>
      <ul className="space-y-4">
        {fighters.length === 0 ? (
          <p className="text-gray-500">No fighters available</p>
        ) : (
          fighters.map((fighter) => (
            <li key={fighter.id} className="bg-white p-4 rounded-lg shadow">
              <div className="space-y-2">
                <p className="text-lg font-semibold">{fighter.name}</p>
                <p>Age: {fighter.age}</p>
                <p>Nationality: {fighter.nationality}</p>
                <p>Weight: {fighter.weight} kg</p>
                <p>Category : {fighter.category}</p>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2"
                onClick={() => handleDelete(fighter.id)}
              >
                Delete
              </button>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={() => handleUpdate(fighter)}
              >
                Update
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FighterList;
