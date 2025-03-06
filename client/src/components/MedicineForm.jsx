import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MedicineForm = ({ fetchMedicines }) => {
  const [medicineData, setMedicineData] = useState({
    name: "",
    dosage: "",
    frequency: "",
    prescribedBy: "",
    assignedTo: "65f0c7e2a3b5c2e8a0b6f123", // Example user ID
    startDate: "",
    endDate: "",
    timesPerDay: [],
    status: "ongoing",
  });

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch medicine name suggestions from OpenMediAPI
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (medicineData.name.length > 2) {
        try {
          setLoading(true);
          const token = localStorage.getItem("token"); // Ensure token is stored
          const res = await axios.get(`https://api.openmediapi.com/search?query=${medicineData.name}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setSuggestions(res.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          toast.error("Failed to fetch medicine suggestions");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchSuggestions();
  }, [medicineData.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/medicines", medicineData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Medicine Added Successfully!");
      fetchMedicines();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to Add Medicine");
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-96 relative">
      <h3 className="text-lg font-semibold mb-3">Add a New Medicine</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Medicine Name"
          className="border p-2 rounded"
          value={medicineData.name}
          onChange={(e) => setMedicineData({ ...medicineData, name: e.target.value })}
          required
        />
        {/* Auto-suggestions */}
        {suggestions.length > 0 && (
          <ul className="border bg-white shadow-md absolute top-14 left-0 w-full rounded-md z-10">
            {suggestions.map((med, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => setMedicineData({ ...medicineData, name: med })}
              >
                {med}
              </li>
            ))}
          </ul>
        )}
        {loading && <p className="text-gray-500 text-sm">Fetching suggestions...</p>}

        <input
          type="text"
          placeholder="Dosage (e.g., 500mg)"
          className="border p-2 rounded"
          value={medicineData.dosage}
          onChange={(e) => setMedicineData({ ...medicineData, dosage: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Frequency (e.g., Twice a day)"
          className="border p-2 rounded"
          value={medicineData.frequency}
          onChange={(e) => setMedicineData({ ...medicineData, frequency: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Prescribed By (Doctor)"
          className="border p-2 rounded"
          value={medicineData.prescribedBy}
          onChange={(e) => setMedicineData({ ...medicineData, prescribedBy: e.target.value })}
        />
        <input
          type="datetime-local"
          className="border p-2 rounded"
          value={medicineData.startDate}
          onChange={(e) => setMedicineData({ ...medicineData, startDate: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          className="border p-2 rounded"
          value={medicineData.endDate}
          onChange={(e) => setMedicineData({ ...medicineData, endDate: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default MedicineForm;
