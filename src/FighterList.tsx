import { useEffect, useState } from "react";
import { deleteFighter, getFighters } from "./api";
import { Fighter } from "./types/fighter";

const FighterList = () => {
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

  return (
    <div>
      <h2>Fighters</h2>
      <ul>
        {fighters.length === 0 ? (
          <p>No fighters available</p>
        ) : (
          fighters.map((fighter) => (
            <li key={fighter.id}>
              <div>
                <p>Name: {fighter.name}</p>
                <p>Age: {fighter.age}</p>
                <p>Nationality: {fighter.nationality}</p>
                <p>Weight: {fighter.weight}</p>
              </div>
              <button onClick={() => handleDelete(fighter.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FighterList;
