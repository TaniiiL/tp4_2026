import pkg from 'pg'
import dbconfig from './dbconfig.js'
import express from 'express'

const {Client} = pkg;
const client = new Client(dbconfig)
await client.connect()



app.post('/createuser', async (req, res) => {
  const user = req.body;

  if (!user.nombre || !user.userid || !user.password) {
    return res.status(400).json({
      message: "Debe completar todos los campos"
    });
  }

  try {
    const client = new Client(config);

    await client.connect();

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const result = await client.query(
      'INSERT INTO usuario VALUES ($1, $2, $3) RETURNING *',
      [user.userid, user.nombre, user.password]
    );

    await client.end();

    console.log("Rows creadas:", result.rowCount);

    res.status(201).json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
});


app.post('/login', async (req, res) => {
  const user = req.body;

  if (!user.userid || !user.password) {
    return res.status(400).json({ message: "Debe completar todos los campos" });
  }

  try {
    let result = await client.query(
      "select id,password from usuario where userid=$1",
      [user.userid]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    let dbUser = result.rows[0];

    const passOK = await bcrypt.compare(user.password, dbUser.password);

    if (passOK) {
      const payload = {
        id:dbUser.id,
        username:user.username
      }
      const secret ='dfkjwedfdj'
      const token = jwt.sign....

      res.send( token );
    } else {
      res.send("Clave invalida");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
    });

app.post('/escucha', async (req, res) => {

})

const app = express()
const port = 3000;
app.get('/',(req,res)=>res.send("Welcome " + usuario1 ))
const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
 // console.log(`Local en http://localhost:${PORT}`);
//});
export default app;
