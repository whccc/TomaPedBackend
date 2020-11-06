require('dotenv').config({ path: '../.env' });
const app = require('./app');
async function Main() {
    await app.listen(app.get('port'));
    console.log('server puerto 3000');
}
Main();