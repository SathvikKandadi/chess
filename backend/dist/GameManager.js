"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
class GameManager {
    constructor() {
        this.games = [];
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
        console.log(`User ${user.readyState} has been added`);
    }
    removeUser(user) {
        this.users = this.users.filter((u) => u !== user);
        console.log(`User ${user.readyState} has been removed`);
    }
    beginGame() {
        console.log('A new game has been created');
    }
}
exports.GameManager = GameManager;
