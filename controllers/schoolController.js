import { addSchool, getAllSchools } from "../models/schoolModel.js";
import { calculateDistance } from "../utils/distance.js";

export const createSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const id = await addSchool({ name, address, latitude, longitude });
    res.status(201).json({ message: "School added successfully", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and longitude required" });
    }

    const schools = await getAllSchools();
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const sorted = schools
      .map((s) => ({
        ...s,
        distance: calculateDistance(userLat, userLon, s.latitude, s.longitude),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
