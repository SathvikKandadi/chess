"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }
    addUser(user) {
        this.users.push(user);
        console.log(`User ${user.readyState} has been added`);
    }
    removeUser(user) {
        this.users = this.users.filter((u) => u !== user);
        console.log(`User ${user.readyState} has been removed`);
    }
    beginGame(user) {
        if (this.pendingUser) {
            const game = new Game_1.Game(this.pendingUser, user);
            this.games.push(game);
            this.pendingUser = null;
            user.send(JSON.stringify({
                type: "init_game",
                payload: "You have sucessfully joined a game"
            }));
        }
        else {
            this.pendingUser = user;
            this.pendingUser.send(JSON.stringify({
                type: "init_game",
                payload: "Waiting for another user to join"
            }));
        }
    }
    findGame(user) {
        const game = this.games.find((game) => game.player1 === user || game.player2 === user); // Change it based on Game Id
        return game;
    }
}
exports.GameManager = GameManager;
