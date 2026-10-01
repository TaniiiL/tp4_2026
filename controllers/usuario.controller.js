import UsuarioService from '../services/usuario.service.js';

const crearUsuario = async (req, res) => {
  const { userid, nombre, password } = req.body;
  if (!userid || !nombre || !password) {
    return res.status(400).json({ message: 'Debe completar todos los campos' });
  }
  try {
    await UsuarioService.crearUsuario(userid, nombre, password);
    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { userid, password } = req.body;
  if (!userid || !password) {
    return res.status(400).json({ message: 'Debe completar todos los campos' });
  }
  try {
    const resultado = await UsuarioService.login(userid, password);
    if (resultado.error) return res.status(401).json({ message: resultado.error });
    res.json({ token: resultado.token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { crearUsuario, login };