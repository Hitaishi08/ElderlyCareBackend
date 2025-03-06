import { useEffect, useState } from "react";
import axios from "axios";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const token = localStorage.getItem("token"); // Ensure token is stored
      const res = await axios.get("http://localhost:5000/api/medicines", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedicines(res.data);
    } catch (error) {
      console.error("Failed to fetch medicines", error);
      setError("Failed to fetch medicines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-3/4 bg-white p-4 rounded-lg shadow mt-6">
      <h3 className="text-lg font-semibold mb-3">Medicine List</h3>

      {loading ? (
        <p className="text-blue-600">Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : medicines.length === 0 ? (
        <p className="text-gray-500">No medicines found.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {medicines.map((med) => (
            <li
              key={med._id}
              className={`p-3 rounded-md shadow-md mb-2 ${
                med.status === "ongoing"
                  ? "bg-green-100 text-green-700"
                  : med.status === "missed"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <strong>{med.name}</strong> - {med.dosage} - {med.frequency} -{" "}
              <span className="font-semibold">{med.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicineList;
