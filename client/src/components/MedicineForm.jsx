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

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (medicineData.name.length > 2) {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          // Mock API call (replace with real endpoint if available)
          const res = await axios.get(`https://api.openmediapi.com/search?query=${medicineData.name}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setSuggestions(res.data.slice(0, 5));
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          toast.error("Failed to fetch medicine suggestions");
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
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
      toast.success("Medicine Added Successfully!", { position: "top-center" });
      setMedicineData({
        name: "", dosage: "", frequency: "", prescribedBy: "", assignedTo: "65f0c7e2a3b5c2e8a0b6f123",
        startDate: "", endDate: "", timesPerDay: [], status: "ongoing",
      });
      fetchMedicines();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to Add Medicine", { position: "top-center" });
    }
  };

  return (
    <div className="medicine-form-card">
      <style>
        {`
          .medicine-form-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 24px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
          }
          .medicine-form-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
          }
          .medicine-form-card h3 {
            font-size: 24px;
            font-weight: 600;
            color: #2D3748;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .form-input {
            width: 100%;
            padding: 14px;
            margin-bottom: 16px;
            border: 2px solid #E2E8F0;
            border-radius: 10px;
            font-size: 16px;
            background: #F7FAFC;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
          }
          .form-input:focus {
            outline: none;
            border-color: #48BB78;
            box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.3);
          }
          .form-button {
            width: 100%;
            padding: 14px;
            background: linear-gradient(90deg, #48BB78, #4299E1);
            color: white;
            font-size: 16px;
            font-weight: 600;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: transform 0.2s ease, opacity 0.2s ease;
          }
          .form-button:hover {
            transform: scale(1.02);
            opacity: 0.95;
          }

          .suggestions-list {
            position: absolute;
            top: 70px;
            left: 24px;
            right: 24px;
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 10;
            max-height: 200px;
            overflow-y: auto;
          }
          .suggestions-list li {
            padding: 10px 14px;
            font-size: 14px;
            color: #2D3748;
            cursor: pointer;
            transition: background 0.2s ease;
          }
          .suggestions-list li:hover {
            background: #EBF8FF;
          }
          .suggestion-loading {
            font-size: 12px;
            color: #718096;
            margin-bottom: 16px;
          }
        `}
      </style>

      <h3>
        <span style={{ color: "#4299E1" }}>💊</span> Add New Medicine
      </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Medicine Name (e.g., Paracetamol)"
          value={medicineData.name}
          onChange={(e) => setMedicineData({ ...medicineData, name: e.target.value })}
          className="form-input"
          required
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((med, index) => (
              <li
                key={index}
                onClick={() => setMedicineData({ ...medicineData, name: med })}
              >
                {med}
              </li>
            ))}
          </ul>
        )}
        {loading && <p className="suggestion-loading">Fetching suggestions...</p>}
        <input
          type="text"
          placeholder="Dosage (e.g., 500mg)"
          value={medicineData.dosage}
          onChange={(e) => setMedicineData({ ...medicineData, dosage: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Frequency (e.g., Twice a day)"
          value={medicineData.frequency}
          onChange={(e) => setMedicineData({ ...medicineData, frequency: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Prescribed By (e.g., Dr. Smith)"
          value={medicineData.prescribedBy}
          onChange={(e) => setMedicineData({ ...medicineData, prescribedBy: e.target.value })}
          className="form-input"
        />
        <input
          type="datetime-local"
          value={medicineData.startDate}
          onChange={(e) => setMedicineData({ ...medicineData, startDate: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="datetime-local"
          value={medicineData.endDate}
          onChange={(e) => setMedicineData({ ...medicineData, endDate: e.target.value })}
          className="form-input"
        />
        <button type="submit" className="form-button">
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default MedicineForm;