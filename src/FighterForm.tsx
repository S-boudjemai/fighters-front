import React from "react";
import { Fighter } from "./types/fighter";
import { createFighter, updateFighter } from "./api";

interface FighterFormProps {
  currentFighter?: Fighter;
  onSave: () => void; // Correction de la convention camelCase
}

const FighterForm: React.FC<FighterFormProps> = ({
  currentFighter,
  onSave,
}) => {
  const [fighter, setFighter] = React.useState<Fighter>(
    currentFighter || {
      id: 0, // Add a default value for the id property
      name: "",
      age: 0,
      weight: 0,
      nationality: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFighter((fighter) => ({ ...fighter, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fighter.id) {
      await createFighter(fighter);
    } else {
      await updateFighter(fighter.id, fighter);
    }
    onSave();
  };

  return (
    <div>
      <h2>Create Fighter</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={fighter.name}
              onChange={handleChange}
              placeholder="name"
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              id="age"
              value={fighter.age}
              onChange={handleChange}
              placeholder="Age"
            />
          </div>

          <div>
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              name="weight"
              id="weight"
              value={fighter.weight}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="nationality">Nationality</label>
            <input
              type="text"
              name="nationality"
              id="nationality"
              value={fighter.nationality}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              className="p-2 bg-blue-500 text-white rounded-lg"
              type="submit"
            >
              Add Fighter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FighterForm;
