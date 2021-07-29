const http = require('http');
const app = require('./routes');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const socket = require('socket.io');
const mongoose = require('mongoose');
const express = require('express');
server.listen(port);
   mongoose.connect('mongodb://localhost:27017/LMS', function (err, db) {
    if (err) throw err;
    console.log('Successfully connected Running on 3000');
    const io = socket.listen(server);
    io.sockets.on('connection', (socket) => {
        socket.on('message', (data) => {
            let chat1 = db.collection(data.sender + " Chat");
            let chat2 = db.collection(data.receiver + " Chat");
            chat1.insert({ message: data.message, sender: data.sender, receiver: data.receiver });
            chat2.insert({ message: data.message, sender: data.sender, receiver: data.receiver});
            chat1.find({ $or: [{ 'sender': data.receiver }, { 'receiver': data.receiver }] }).limit(100).sort({ _id: -1 }).toArray(function (err, res) {
                if (err) {
                    throw err;
                }
                io.emit('new message', { message: res });
            });
        });
    });
});

