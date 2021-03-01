require('dotenv').config()
const express = require('express');
const router = require('./routes');
const app = express();
const PORT = 3000;

//testing awal
// app.get('/', (req, res) => {
//     res.send('Hallo di app js')
// })

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(router)

app.listen(PORT, () => console.log(`This app is running on http://localhost:${PORT}`))