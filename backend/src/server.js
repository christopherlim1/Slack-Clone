require('dotenv').config();
const app = require('./app.js');

const port = process.env.PORT || 3010;

app.listen(3010, () => {
  console.log(`Server Running on port ${port}`);
  console.log(`API Testing UI: http://localhost:${port}/v0/api-docs/`);
});