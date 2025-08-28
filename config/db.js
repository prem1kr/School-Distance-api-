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

const testConnection = async () => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("✅ Database connected! Test result:", rows[0].result);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
};

testConnection();

export default pool;
