import { pool } from '../db.js';

const crearCancion = async (nombre) => {
  const result = await pool.query(
    'INSERT INTO cancion (nombre) VALUES ($1) RETURNING *',
    [nombre]
  );
  return result.rows[0];
};

const modificarCancion = async (id, nombre) => {
  const result = await pool.query(
    'UPDATE cancion SET nombre = $1 WHERE id = $2 RETURNING *',
    [nombre, id]
  );
  return result.rows[0];
};

const borrarCancion = async (id) => {
  // Primero sus escuchas (por la FK), después la canción
  await pool.query('DELETE FROM escucha WHERE cancion_id = $1', [id]);
  const result = await pool.query(
    'DELETE FROM cancion WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

export default { crearCancion, modificarCancion, borrarCancion };