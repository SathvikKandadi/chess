import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    console.log("Connection established");
    gameManager.addUser(ws);

    ws.on('message', (message) => {
        const messageStr = message.toString();
        console.log('Received message:', messageStr);
        if (messageStr === 'init_game') {
            gameManager.beginGame(ws);
            ws.send("The game has started");
        }
        else if (messageStr === 'move') {
            gameManager.findGame(ws);
        }
    });

    ws.on('close', () => {
        console.log('Connection closed');
        gameManager.removeUser(ws);
    });
});
