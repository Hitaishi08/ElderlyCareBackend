import { useEffect, useState } from "react";
import axios from "axios";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMedicines = async () => {
    try {
      const token = localStorage.getItem("token");
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

  useEffect(() => {
    fetchMedicines();
  }, []);

  return (
    <div className="medicine-list-card">
      <style>
        {`
          .medicine-list-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 24px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .medicine-list-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
          }
          .medicine-list-card h3 {
            font-size: 24px;
            font-weight: 600;
            color: #2D3748;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .medicine-list {
            max-height: 500px;
            overflow-y: auto;
            padding-right: 8px;
          }
          .medicine-list::-webkit-scrollbar {
            width: 6px;
          }
          .medicine-list::-webkit-scrollbar-thumb {
            background: #A0AEC0;
            border-radius: 3px;
          }
          .medicine-item {
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 12px;
            transition: all 0.3s ease;
          }
          .medicine-item.ongoing {
            background: linear-gradient(135deg, #F0FFF4, #C6F6D5);
          }
          .medicine-item.missed {
            background: linear-gradient(135deg, #FFF5F5, #FED7D7);
          }
          .medicine-item.completed {
            background: linear-gradient(135deg, #EDF2F7, #E2E8F0);
          }
          .medicine-item:hover {
            transform: translateX(5px);
          }
          .medicine-item strong {
            font-size: 18px;
            color: #2D3748;
          }
          .medicine-item p {
            margin: 4px 0;
            color: #718096;
            font-size: 14px;
          }
          .medicine-item .status-ongoing {
            color: #38A169;
            font-weight: 600;
          }
          .medicine-item .status-missed {
            color: #E53E3E;
            font-weight: 600;
          }
          .medicine-item .status-completed {
            color: #718096;
            font-weight: 600;
          }

          .loading {
            color: #48BB78;
            font-size: 16px;
            animation: pulse 1.5s infinite;
          }
          .error {
            color: #E53E3E;
            font-size: 16px;
          }
          .empty {
            color: #A0AEC0;
            font-size: 16px;
            font-style: italic;
          }

          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>

      <h3>
        <span style={{ color: "#38A169" }}>📋</span> Medicine List
      </h3>
      {loading ? (
        <p className="loading">Loading medicines...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : medicines.length === 0 ? (
        <p className="empty">No medicines added yet.</p>
      ) : (
        <ul className="medicine-list">
          {medicines.map((med) => (
            <li
              key={med._id}
              className={`medicine-item ${
                med.status === "ongoing" ? "ongoing" : med.status === "missed" ? "missed" : "completed"
              }`}
            >
              <div>
                <strong>{med.name}</strong>
                <p>Dosage: {med.dosage}</p>
                <p>Frequency: {med.frequency}</p>
                <p>Status: <span className={`status-${med.status}`}>{med.status}</span></p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicineList;