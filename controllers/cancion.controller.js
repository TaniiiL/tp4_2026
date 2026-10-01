import CancionService from '../services/cancion.service.js';

const crearCancion = async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ message: 'Se necesita un nombre' });
  try {
    const cancion = await CancionService.crearCancion(nombre);
    res.status(201).json(cancion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const modificarCancion = async (req, res) => {
  const { id, nombre } = req.body;
  if (!id || !nombre) return res.status(400).json({ message: 'Se necesita id y nombre' });
  try {
    const cancion = await CancionService.modificarCancion(id, nombre);
    if (!cancion) return res.status(404).json({ message: 'No existe esa canción' });
    res.json(cancion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const borrarCancion = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: 'Se necesita un ID' });
  try {
    const cancion = await CancionService.borrarCancion(id);
    if (!cancion) return res.status(404).json({ message: 'No existe esa canción' });
    res.json({ message: 'Canción borrada', cancion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { crearCancion, modificarCancion, borrarCancion };