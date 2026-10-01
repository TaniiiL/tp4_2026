import { pool } from '../db.js';

const getEscuchas = async (usuarioId) => {
  const result = await pool.query(
    `select c.nombre, e.reproducciones
     from cancion c join escucha e on c.id = e.cancion_id
     where e.usuario_id = $1`,
    [usuarioId]
  );
  return result.rows;
};

const registrarEscucha = async (usuarioId, cancionId) => {
  const cancion = await pool.query('SELECT id FROM cancion WHERE id = $1', [cancionId]);
  if (cancion.rowCount === 0) return null;

  // Si ya la escuchó suma una reproducción, si no crea el registro
  let result = await pool.query(
    `UPDATE escucha SET reproducciones = reproducciones + 1
     WHERE usuario_id = $1 AND cancion_id = $2 RETURNING *`,
    [usuarioId, cancionId]
  );
  if (result.rowCount === 0) {
    result = await pool.query(
      `INSERT INTO escucha (usuario_id, cancion_id, reproducciones)
       VALUES ($1, $2, 1) RETURNING *`,
      [usuarioId, cancionId]
    );
  }

  // Ejercicio 6: más de 10 canciones => fan
  const conteo = await pool.query(
    'SELECT COUNT(*) AS cantidad FROM escucha WHERE usuario_id = $1',
    [usuarioId]
  );
  const cantidad = parseInt(conteo.rows[0].cantidad);

  let fan = false;
  if (cantidad > 10) {
    await pool.query('UPDATE usuario SET fan = true WHERE id = $1', [usuarioId]);
    fan = true;
  }

  return { escucha: result.rows[0], cancionesEscuchadas: cantidad, fan };
};

export default { getEscuchas, registrarEscucha };