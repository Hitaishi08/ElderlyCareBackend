import MedicineForm from "../components/MedicineForm";
import MedicineList from "../components/MedicineList";

const MedicineTracker = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Medicine & Prescription Tracker</h2>
      <div className="flex gap-6">
        <MedicineForm />
        <MedicineList />
      </div>
    </div>
  );
};

export default MedicineTracker;
