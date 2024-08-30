import { useEffect, useState } from "react";
import { deleteFight, getFights } from "./api-fights";
import { Fight } from "./types/fight";

const FightsList = () => {
  const [fights, setFights] = useState<Fight[]>([]);

  useEffect(() => {
    loadFights();
  }, []);

  const loadFights = async () => {
    const data = await getFights();
    console.log("fights loaded", data);

    if (data.length === 0) {
      console.log("no fights");
      setFights([]);
    } else {
      const fightsWithDates = data.map(
        (fight: { date: string | number | Date }) => ({
          ...fight,
          date: new Date(fight.date), // Convertit les dates en objets Date, je n'arrivais pas à la modifier directement dans l'input
        })
      );
      setFights(fightsWithDates);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteFight(id);
    loadFights();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Fights</h2>
      <ul className="space-y-4">
        {fights.length === 0 ? (
          <p className="text-gray-500">No fights available</p>
        ) : (
          fights.map((fight) => (
            <li key={fight.id} className="bg-white p-4 rounded-lg shadow">
              <div className="space-y-2">
                <p className="text-lg font-semibold">
                  {fight.firstFighterName} vs {fight.secondFighterName}
                </p>
                <p>Date: {fight.date.toISOString().split("T")[0]}</p>
                <p>Referee: {fight.referee}</p>
                <p>Category : {fight.category}</p>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2"
                onClick={() => handleDelete(fight.id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FightsList;
