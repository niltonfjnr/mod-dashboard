const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser);
let x = true;
;
const usedPort = 4400;

const server = app.listen(usedPort, () => {
    console.log(`Started in ${usedPort}`);
});

const io = socket(server);

io.sockets.on('connection', (socket) => {
    console.log(`new connection id: ${socket.id}`);
    sendPersonalData(socket);
    sendAddress(socket);
})

function randomNumber(plus = 1) {
    return Math.floor((Math.random() * (plus + 1)));
}

function sendPersonalData(socket) {
    const randomValue = randomNumber(1);
    const randomAgeValue = randomNumber(100);
    const names = ['John', 'Victor', 'Peter']
    const personalData = {
        name: names[randomValue],
        age: randomAgeValue
    }
    console.log(personalData);
    socket.emit('newPersonalData', personalData);

    setTimeout(() => {
        sendPersonalData(socket);
    }, 3000);
}

function sendAddress(socket) {
    const randomValue = randomNumber(10000);
    const addressData = {
        attr: randomValue
    }
    console.log(addressData);
    socket.emit('newAddress', addressData);


    setTimeout(() => {
        sendAddress(socket);
    }, 1000);
}