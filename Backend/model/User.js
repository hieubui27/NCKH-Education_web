import pool from "../config/db.js";

export const User = {
  findByUsername: async (username) => {
    const query = `SELECT * FROM users WHERE username = $1`;
    const { rows } = await pool.query(query, [username]);
    return rows[0];
  },

  findById: async (id) => {
    const query = `SELECT * FROM users WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  create: async ({ fullname, username, password, phonenumber, dob, school, address, role }) => {
    const query = `
      INSERT INTO users (fullname, username, password, phonenumber, dob, school, address, role, created_at)
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, NOW())
      RETURNING id, fullname, username, phonenumber, dob, school, address, role;
    `;
    const values = [fullname, username, password, phonenumber, dob, school, address, role || 'student'];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  updateInfo: async ({id, fullname, dob}) =>{
    const query = `
      UPDATE users
      SET fullname = $1, dob = $2
      WHERE id = $3
      RETURNING id, fullname, dob;
    `;
    const values = [fullname, dob, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
};

