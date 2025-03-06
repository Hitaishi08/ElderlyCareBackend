const Medicine = require("../model/Medicine");
const axios = require("axios");

// Open Medicine API Base URL (Replace with actual API)
const OPEN_MEDICINE_API_URL = "https://api.openmeds.org/v1/medicines";

// 📌 Create a Medicine Entry
exports.createMedicine = async (req, res) => {
  try {
    const { name, dosage, frequency, prescribedBy, assignedTo, startDate, endDate, timesPerDay } = req.body;
    
    const medicine = new Medicine({
      name,
      dosage,
      frequency,
      prescribedBy,
      assignedTo,
      startDate,
      endDate,
      timesPerDay
    });

    await medicine.save();
    res.status(201).json({ message: "Medicine added successfully", medicine });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Fetch All Medicines
exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().populate("assignedTo", "name email");
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Get Medicine by ID
exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id).populate("assignedTo", "name email");
    if (!medicine) return res.status(404).json({ msg: "Medicine not found" });
    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Update Medicine Details
exports.updateMedicine = async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Delete Medicine
exports.deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Get Medicine Details from OpenMediAPI
exports.getMedicineInfo = async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(`${OPEN_MEDICINE_API_URL}/search?q=${name}`);

    if (response.data && response.data.length > 0) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ message: "Medicine not found in external database" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch medicine data" });
  }
};
