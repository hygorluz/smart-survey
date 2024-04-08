const express = require('express');
const { Server } = require("socket.io");
var cors = require('cors');
const app = express();
const porta = process.env.PORT || 3001;
const http = require('http');
const axios = require('axios');
app.use(cors());
const server = http.createServer(app);

app.use(cors())
const io = new Server(server, {
    cors: {
        origins: `http://localhost:4200`,
        methods: ["GET", "POST"],
    },
    pingInterval: 2000,
    pingTimeout: 10000,
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});


io.on("connection", (socket) => {
    const userNumber = Math.floor(Math.random() * 100) + 1;

    axios.get('https://us-central1-serveless-survey-api.cloudfunctions.net/api/survey').then(r =>
        io.emit("surveys status", r.data)
    ).catch(e => console.log(e))

    socket.on("load surveys", (msg) => {
        axios.get('https://us-central1-serveless-survey-api.cloudfunctions.net/api/survey').then(r =>
            io.emit("surveys status", r.data)
        ).catch(e => console.log(e));
    });

    socket.on("disconnect", () => {
        io.emit("connStatus", "user n° " + userNumber + " disconnected !");
    });
});



server.listen(porta, () => {
    const portaStr = porta === 80 ? '' :  ':' + porta
    if (process.env.HEROKU_APP_NAME)
        console.log('Servidor iniciado. Abra o navegador em ')
    else console.log('Servidor iniciado. Abra o navegador em ' + portaStr)
})
