import postgres from "postgres";

const sql = postgres({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  database: process.env.DB_DATABASE
});

export default sql;
