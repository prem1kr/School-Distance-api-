import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    ca: fs.readFileSync(process.env.DB_SSL)
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255),
        latitude DECIMAL(10,6),
        longitude DECIMAL(10,6)
      )
    `);
    console.log("Schools table is ready!");
  } catch (err) {
    console.error("❌ Error creating table:", err.message);
  }
})();

const testConnection = async () => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log(" Database connected! Test result:", rows[0].result);
  } catch (err) {
    console.error(" Database connection failed:", err.message);
  }
};

testConnection();

export default pool;
