// configure environment variables
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../config/.env') });

const app = require('./app');

/** Start her up, boys */
app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
