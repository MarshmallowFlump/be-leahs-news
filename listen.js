const { PORT = 9090 } = process.env;
const app = require('./app');

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server listening on port ${PORT}...`);
});