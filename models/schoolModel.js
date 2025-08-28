import pool from "../config/db.js";

export const addSchool = async (schoolData) => {
  const { name, address, latitude, longitude } = schoolData;
  const [result] = await pool.query(
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
    [name, address, latitude, longitude]
  );
  return result.insertId;
};

export const getAllSchools = async () => {
  const [rows] = await pool.query("SELECT * FROM schools");
  return rows;
};
