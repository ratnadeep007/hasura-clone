const express = require('express');
const router = require('./routes/index');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.get('/health', (req, res) => res.send({ msg: 'ok!!!' }));

app.listen("8000", () => console.log("Server started"));