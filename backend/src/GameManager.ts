import { WebSocket } from 'ws';
import { Game } from './Game';


export class GameManager {
    private games: Game[];
    private users: WebSocket[];
    private pendingUser: WebSocket | null;

    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }

    addUser(user: WebSocket) {
        this.users.push(user);
        console.log(`User ${user.readyState} has been added`);
    }

    removeUser(user: WebSocket) {
        this.users = this.users.filter((u) => u !== user);
        console.log(`User ${user.readyState} has been removed`);
    }

    beginGame(user: WebSocket) {
        if (this.pendingUser) {
            const game = new Game(this.pendingUser, user);
            this.games.push(game);
            this.pendingUser = null;
            user.send(JSON.stringify({
                type:"init_game",
                payload:"You have sucessfully joined a game"
            }))
        }
        else {
            this.pendingUser = user;
            this.pendingUser.send(JSON.stringify({
                type:"init_game",
                payload:"Waiting for another user to join"
            }))
        }
    }

    findGame(user: WebSocket) {
        const game = this.games.find((game) => game.player1 === user || game.player2 === user); // Change it based on Game Id
        return game;
    }
}
