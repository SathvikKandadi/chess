import { Chess } from "chess.js";
import { WebSocket } from "ws";

export class Game {

    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: "init_game",
            payload: {
                color:"white"
            }
        }))
        this.player2.send(JSON.stringify({
            type: "init_game",
            payload: {
                color:"black"
            }
        }))
    }

    makeMove(move: { from: string, to: string }) {
        try {
            this.board.move(move);
        }
        catch (e) {
            return;
        }

        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: "Game Over",
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            this.player2.send(JSON.stringify({
                type: "Game Over",
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            return;
        }

        if (this.board.moves.length % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: "Move",
                payload: move
            }))
        }
        else
        {
            this.player1.send(JSON.stringify({
                type:"Move",
                payload:move
            }))
        }

    }
}