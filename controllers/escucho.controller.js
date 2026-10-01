import EscuchoService from '../services/escucho.service.js';

const getEscuchas = async (req, res) => {
  try {
    const canciones = await EscuchoService.getEscuchas(req.user.id);
    res.json({ canciones });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registrarEscucha = async (req, res) => {
  const { id } = req.body; // id de la canción; el usuario sale del token
  if (!id) return res.status(400).json({ message: 'Se necesita un ID' });
  try {
    const resultado = await EscuchoService.registrarEscucha(req.user.id, id);
    if (!resultado) return res.status(404).json({ message: 'No existe esa canción' });
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getEscuchas, registrarEscucha };