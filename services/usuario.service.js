import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';
import { JWT_SECRET } from '../config.js';

const crearUsuario = async (id, nombre, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    'INSERT INTO usuario (id, nombre, password) VALUES ($1, $2, $3)',
    [id, nombre, hashedPassword]
  );
};

const login = async (id, password) => {
  const result = await pool.query(
    'SELECT id, nombre, password, rol FROM usuario WHERE id = $1',
    [id]
  );
  if (result.rowCount === 0) return { error: 'Usuario no encontrado' };

  const dbUser = result.rows[0];
  const passOK = await bcrypt.compare(password, dbUser.password);
  if (!passOK) return { error: 'Clave invalida' };

  const payload = { id: dbUser.id, nombre: dbUser.nombre, rol: dbUser.rol };
  const token = jwt.sign(payload, JWT_SECRET);
  return { token };
};

export default { crearUsuario, login };