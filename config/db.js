import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "123456",
  database: process.env.DB_NAME || "schoolDB2",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


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
