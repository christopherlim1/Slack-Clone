require('dotenv').config();
const app = require('./app.js');

const port = process.env.PORT || 3500;

app.listen(3500, () => {
  console.log(`Server Running on port ${port}`);
  console.log(`API Testing UI: http://localhost:${port}/v0/api-docs/`);
});