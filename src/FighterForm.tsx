import React from "react";
import { Fighter } from "./types/fighter";
import { createFighter, updateFighter } from "./api-fighters";

interface FighterFormProps {
  onSave: () => void;
  isUpdating: boolean;
  fighter: Fighter;
  setFighter: React.Dispatch<React.SetStateAction<Fighter>>;
}

const FighterForm: React.FC<FighterFormProps> = ({
  onSave,
  isUpdating,
  fighter,
  setFighter,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    setFighter({
      id: 0,
      name: "",
      age: 0,
      weight: 0,
      nationality: "",
      category: "",
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      {isUpdating ? (
        <h2 className="text-2xl font-bold mb-4">Update Fighter</h2>
      ) : (
        <h2 className="text-2xl font-bold mb-4">Create Fighter</h2>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={fighter.name}
            onChange={handleChange}
            placeholder="Name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            value={fighter.age}
            onChange={handleChange}
            placeholder="Age"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700"
          >
            Weight
          </label>
          <input
            type="number"
            name="weight"
            id="weight"
            value={fighter.weight}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="nationality"
            className="block text-sm font-medium text-gray-700"
          >
            Nationality
          </label>
          <input
            type="text"
            name="nationality"
            id="nationality"
            value={fighter.nationality}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            value={fighter.category}
            className="mt-1 block w-full px-3 py-2 border border-gray-300  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
          >
            <option value="Flyweight">Flyweight</option>
            <option value="Bantamweight">Bantamweight</option>
            <option value="Featherweight">Featherweight</option>
            <option value="Lightweight">Lightweight</option>
            <option value="Welterweight">Welterweight</option>
            <option value="Middleweight">Middleweight</option>
            <option value="Light Heavyweight">Light Heavyweight</option>
            <option value="Heavyweight">Heavyweight</option>
          </select>
        </div>
        <div>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            type="submit"
          >
            {isUpdating ? "Update Fighter" : "Add Fighter"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FighterForm;
