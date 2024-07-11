"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManager = new GameManager_1.GameManager();
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    console.log("Connection established");
    gameManager.addUser(ws);
    ws.on('message', (message) => {
        const messageStr = message.toString();
        const msg = JSON.parse(messageStr);
        console.log('Received message:', messageStr);
        if (msg.type === 'init_game') {
            gameManager.beginGame(ws);
        }
        else if (msg.type === 'move') {
            console.log("A move is being made");
            const game = gameManager.findGame(ws);
            if (game) {
                game.makeMove(msg.payload);
            }
            else {
                console.log("No such game found");
            }
        }
        // else if (msg.type === 'update_move') {
        //     const game = gameManager.findGame(ws);
        //     if (game) {
        //         game.updateMove(msg.payload);
        //         ws.send(JSON.stringify({
        //             type:"update_move",
        //             payload:msg.payload
        //         }))
        //     }
        //     else
        //     {
        //         console.log("No such game found")
        //     }
        // }
        else {
            console.log("Unvalid Message");
        }
    });
    ws.on('close', () => {
        console.log('Connection closed');
        gameManager.removeUser(ws);
    });
});
