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
            console.log('A new game has been created');
        }
        else {
            this.pendingUser = user;
        }
    }

    findGame(user: WebSocket) {
        const game = this.games.find((game) => game.player1 === user || game.player2 === user); // Change it based on Game Id
        if (game) {
            game.makeMove({from:"e4",to:"e5"});
        }
    }
}
