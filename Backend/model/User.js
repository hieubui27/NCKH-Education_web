import pool from "../config/db.js";

const User = {
  findByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  },

  findById: async (id) => {
    const query = `SELECT id, fullname, email, school, role FROM users WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  create: async ({ fullname, email, password, school, address, role }) => {
    const query = `
      INSERT INTO users (fullname, email, password, school, address, role, created_at)
      VALUES ( $1, $2, $3, $4, $5, $6, NOW())
      RETURNING id, fullname, email, school, role;
    `;
    const values = [fullname, email, password, school, address, role || 'student'];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
};

export default User;
