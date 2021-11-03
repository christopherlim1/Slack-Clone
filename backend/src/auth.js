const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const secrets = require('./secrets.json');
const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.authenticate = async (req, res) => {
  const {email, password} = req.body;
  const select = `SELECT person, person_id FROM person WHERE person->>'email' = $1`;
  const query = {
    text: select,
    values: [email],
  };
  const {rows} = await pool.query(query);
  const user = rows[0]['person'];
  if (user.email === email && bcrypt.compareSync(password, user.password)) {
    const accessToken = jwt.sign(
      {email: user.email},
      secrets.accessToken, {
        expiresIn: '30m',
        algorithm: 'HS256'
      });
    await pool.query(query);
    res.status(200).json({name: user.name, accessToken: accessToken, id: rows[0].person_id});
  } else {
    res.status(401).send('Username or password incorrect');
  }
};
  
exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secrets.accessToken, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
