const express = require('express');
const app = express();






app.use(express.json({ limit: '50mb', extended: false }));





const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => { console.log('server started on port' + PORT) });


module.exports = server;