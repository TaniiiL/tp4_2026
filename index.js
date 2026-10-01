import express from 'express';
import usuarioRoutes from './routes/usuario.routes.js';
import cancionRoutes from './routes/cancion.routes.js';
import escuchoRoutes from './routes/escucho.routes.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('SpoTICfy API funcionando'));

app.use('/', usuarioRoutes);
app.use('/cancion', cancionRoutes);
app.use('/escucho', escuchoRoutes);

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Local en http://localhost:${PORT}`));
}

export default app;